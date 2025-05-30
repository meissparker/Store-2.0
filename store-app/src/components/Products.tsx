import PageLayout from "./PageLayout";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/CartSlice';
import { type AppDispatch } from '../redux/store';
import { fetchProducts } from '../services/ProductService'
import { fetchCategories } from "../services/ProductService";

type Product = {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};


const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [successProductId, setSuccessProductId] = useState<string | null>(null)
    const [category, setCategory] = useState<string>('all');

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });

    const {data: products, isLoading, error} = useQuery({
        queryKey: ['items', category],
        queryFn: () => fetchProducts(category)
    })

    if (isLoading) return <p>Loading products...</p>
    if (error) return <p>Error loading products</p>


    return (
        <PageLayout>
            <Container>

                <Form.Group controlId="categorySelect" className="mb-3">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="all">All</option>
                        {categories?.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {isLoading && <p>Loading products...</p>}
                {error && <p>Error loading products</p>}
                <Row>
                    {products?.map((product: Product & {id: string}) => (
                        <Col key={product.id} md={4} className="mb-3">
                            <Card>
                                <Card.Img variant="top" src={product.image} alt={product.title} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Subtitle>{product.category}</Card.Subtitle>
                                    <Card.Text>${product.price.toFixed(2)}</Card.Text>

                                    <div className="d-flex flex-column gap-2">
                                        <Link to={`/products/${product.id}`}>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="mt-2"
                                            >
                                                View Product Description
                                            </Button>
                                        </Link>

                                        <Button
                                        className="mt-2"
                                         onClick={() => {
                                            dispatch(addToCart({
                                            id: product.id,
                                            title: product.title,
                                            image: product.image,
                                            price: product.price,
                                        }));
                                        setSuccessProductId(product.id)
                                        setTimeout(() => setSuccessProductId(null), 3000)
                                        }}>
                                            Add to Cart
                                        </Button>
                                    </div>

                                    {successProductId === product.id && (
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
                    ))}
                </Row>

            </Container>

        </PageLayout>
    )

}

export default Products;