import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    type Product
} from '../services/ProductService'
import PageLayout from './PageLayout';

interface ProductFormData {
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
}


const initialFormState: ProductFormData = {
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
};

const ManageProducts: React.FC = () => {
    const [products, setProducts] = useState<(Product & { id: string })[]>([]);
    const [formData, setFormData] = useState<ProductFormData>(initialFormState);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const loadProducts = async () => {
        const data = await fetchProducts();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateProduct(editingId, {
                    ...formData,
                    price: parseFloat(formData.price as unknown as string)
                });
                setMessage('Product updated!')
            } else {
                await createProduct({
                    ...formData,
                    price: parseFloat(formData.price as unknown as string)
                });
                setMessage('Product created!')
            }
            setFormData(initialFormState);
            setEditingId(null);
            loadProducts();
        } catch (err) {
            setMessage('Failed to save product');
            console.error(err);
        }
    };

    const handleEdit = (product: Product & { id: string }) => {
        setFormData({
            title: product.title,
            price: product.price.toString(),
            description: product.description,
            category: product.category,
            image: product.image
            });
        setEditingId(product.id);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            console.log('Deleting product with ID:', id)
            await deleteProduct(id.toString());
            setMessage('Product deleted!');
            loadProducts();
        }
    };

    return (
        <PageLayout>
            <Container className="mt-4">
                <h2>Manage Products</h2>
                {message && <Alert variant="info" onClose={() => setMessage(null)} dismissible>{message}</Alert>}

                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Form onSubmit={handleSubmit}>



                            <Form.Group className="mb-2">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                <option value="">Select a category</option>
                                <option value="men's clothing">Men's Clothing</option>
                                <option value="women's clothing">Women's Clothing</option>
                                <option value="jewelry">Jewelry</option>
                                <option value="electronics">Electronics</option>
                                </Form.Select>
                            </Form.Group>


                            <Form.Group className="mb-2">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </Form.Group>

                            <Button type="submit" className="mt-2">
                                {editingId ? 'Update Product' : 'Add Product'}
                            </Button>


                        </Form>
                    </Col>
                </Row>

                <hr />

                <Row>
                    {products.map((product) => (
                        <Col key={product.id} md={4} className="mb-3">
                            <Card>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Subtitle>${product.price}</Card.Subtitle>
                                    <Card.Text>{product.category}</Card.Text>
                                    <Card.Text>{product.description}</Card.Text>

                                    <div className="d-flex flex-column gap-2">
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </PageLayout>
    )
}

export default ManageProducts;