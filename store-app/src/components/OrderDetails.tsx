import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrderById } from '../services/OrderService';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import { Timestamp } from 'firebase/firestore';
import PageLayout from './PageLayout';


type CartItem = {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
};

type Order = {
    id: string;
    userId: string;
    createdAt: Timestamp;
    totalPrice: number;
    items: CartItem[];
};

const OrderDetails: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const result = await fetchOrderById(id!);
                setOrder(result as Order);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };

        loadOrder();
    }, [id]);

    if (loading) return <Spinner animation="border" className="m-4" />;

    if (!order) return <p>Order not found.</p>

    return (
        <PageLayout>
        <Container className="mt-4">
            <h3>Items: {order.items.map(item => item.title).join(', ')}</h3>
            <p><strong>Date:</strong> {order.createdAt.toDate().toLocaleString()}</p>
            <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>

            <ListGroup className="mt-3">
                {order.items.map(item => (
                    <ListGroup.Item key={item.id}>
                        <strong>{item.title}</strong> - ${item.price.toFixed(2)} x {item.quantity}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
        </PageLayout>
    );
};

export default OrderDetails;