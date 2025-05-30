import React, {useEffect, useState} from 'react';
import { fetchOrdersByUser } from '../services/OrderService'; // Adjust path if needed
import { Card, Container, Button, Spinner } from 'react-bootstrap';
import { Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import PageLayout from './PageLayout';

type CartItem = {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

type OrderSummary = {
    id: string;
    createdAt: Timestamp;
    totalPrice: number;
    items: CartItem[];
};


const Orders: React.FC = () => {
    const [orders, setOrders] = useState<OrderSummary[]>([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const loadOrders = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;

            const result = await fetchOrdersByUser(user.uid);
            setOrders(result);
            setLoading(false);
        };

        loadOrders();
    }, []);

    if (loading) return <Spinner animation="border" className="m-4" />;

    return (
        <PageLayout>
        <Container className="mt-4">
            <h3>Your Order History</h3>
            {orders.length === 0 ? (
                <p>No past orders found.</p>
            ) : (
                orders.map((order) => (
                    <Card key={order.id} className="mb-3">
                        <Card.Body>
                            <Card.Title>
                                {order.items.map(item => item.title).join(', ')}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Date: {order.createdAt.toDate().toLocaleString()}
                            </Card.Subtitle>
                            <Card.Text>Total: ${order.totalPrice.toFixed(2)}</Card.Text>
                            <Link to={`/orders/${order.id}`}>
                                <Button variant="primary">View Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
        </PageLayout>
    )
}

export default Orders;