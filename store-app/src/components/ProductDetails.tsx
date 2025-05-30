import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import PageLayout from './PageLayout';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartSlice';
import type { AppDispatch } from '../redux/store';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert'



type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const fetchProductById = async (id: string): Promise<Product> => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data
};

const ProductDetails: React.FC = () => {
    const [successProductId, setSuccessProductId] = useState<number | null>(null);
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const { data, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <PageLayout>
                <Spinner animation="border" role="status" />
                <p>Loading product details...</p>
            </PageLayout>
        );
    }

    if (error || !data) {
        return (
            <PageLayout>
                <p>Error loading product details</p>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Container className="my-4">
                <Row className="justify-content-center">
                    <Col md={10} lg={6}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={data.image}
                                className="img-fluid"
                                style={{ maxHeight: '300px', objectFit: 'contain' }}
                                alt={data.title} />
                            <Card.Body>
                                <Card.Title>{data.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{data.category}</Card.Subtitle>
                                <Card.Text>{data.description}</Card.Text>
                                <Card.Text>
                                    <strong>Price:</strong>${data.price.toFixed(2)}
                                </Card.Text>

                                <Button
                                    className="mt-2"
                                    onClick={() => {
                                        dispatch(addToCart({
                                        id: data.id.toString(),
                                        title: data.title,
                                        image: data.image,
                                        price: data.price,
                                    }));
                                    setSuccessProductId(data.id);
                                    setTimeout(() =>  setSuccessProductId(null), 3000);
                                    }}
                                    >
                                    Add to Cart
                                </Button>


                                {successProductId === data.id && (
                                        <div className="mt-3 d-flex justify-content-center">
                                            <Alert variant="success" 
                                            onClose={() => setSuccessProductId(null)}
                                            className="text-center mt-3 px-2 py-1 shadow-sm"
                                            style={{fontSize: '0.875rem', whiteSpace: 'nowrap'}}
                                            
                                            >
                                                Added to Cart!
                                            </Alert>
                                        </div>
                                    )}




                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </PageLayout>
    );
};

export default ProductDetails;

