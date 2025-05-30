import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../redux/cartSelectors';
import { type AppDispatch } from '../redux/store';
import { decrementFromCart, clearCart} from '../redux/CartSlice';
import PageLayout from "./PageLayout";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import { getAuth } from 'firebase/auth';
import { placeOrder } from '../services/OrderService'


const ShoppingCart: React.FC = () => {
    const [orderSuccess, setOrderSuccess] = useState(false);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch<AppDispatch>()
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <PageLayout>
            <Container>
                {orderSuccess && (
                    <Alert 
                    variant="success"
                    onClose={() => setOrderSuccess(false)}
                    className="my-3"
                    >
                        Thank you for your order!
                    </Alert>
                )}
                <h2>Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p>No items in Shopping Cart</p>
                ) : (
                    <>
                        <Row>
                            {cartItems.map(item => (
                                <Col key={item.id} md={4}>
                                    <Card>
                                        <Card.Img variant="top" src={item.image} />
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Text>Quantity: {item.quantity}</Card.Text>
                                                <Card.Text>Price: ${(item.price * item.quantity).toFixed(2)}</Card.Text>
                                                <div className="d-flex flex-column gap-2">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => dispatch(decrementFromCart(item.id))}
                                                    >
                                                        Remove Item 
                                                </Button>
                                                </div>
                                                
                                            </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <h4>Total: ${total.toFixed(2)}</h4>
                        <Button 
                        variant ="success" 
                        onClick={async () => {
                            const auth = getAuth();
                            const user = auth.currentUser;

                            if (!user) {
                                alert('You must be logged in to place an order.')
                                return;
                            }

                            try {
                                await placeOrder(user.uid, cartItems);
                                dispatch(clearCart());
                                sessionStorage.removeItem('cart');
                                setOrderSuccess(true);
                                setTimeout(() => setOrderSuccess(false), 3000);
                            } catch (error) {
                                console.error('Failed to place order:', error);
                                alert('Failed to place order.')
                            }
                        }}
                        >
                            Checkout
                        </Button>
                    </>
                )}
            
            </Container>
        </PageLayout>
    );
};

export default ShoppingCart;