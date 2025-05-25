import PageLayout from "./PageLayout"
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { increment, decrement } from '../redux/CartSlice';

const ShoppingCart: React.FC = () => {
    const quantity = useSelector((state: RootState) => state.cart.quantity);
    const dispatch = useDispatch<AppDispatch>();

    
    return (
        <PageLayout>
            <h1>Quantity: {quantity}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </PageLayout>
    )
}

export default ShoppingCart