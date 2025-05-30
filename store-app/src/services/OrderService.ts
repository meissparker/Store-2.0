import { db } from '../firebaseConfig';
import { 
    collection, 
    query, 
    where, 
    orderBy, 
    addDoc, 
    getDocs, 
    Timestamp, 
    doc, 
    getDoc 
} from 'firebase/firestore';


interface CartItem {
    title: string;
    image: string;
    price: number;
    quantity: number;
}

interface Order {
    userId: string;
    items: CartItem[];
    createdAt: Timestamp;
    totalPrice: number;
}

export const fetchOrderById = async (orderId: string) => {
    const docRef = doc(db, 'orders', orderId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        throw new Error('Order not found');
    }

    return {id: snapshot.id, ...snapshot.data()}
}

export const placeOrder = async (userId: string, items: CartItem[]) => {
    const ordersRef = collection(db, 'orders');


    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order: Order = {
        userId,
        items,
        createdAt: Timestamp.now(),
        totalPrice
    };

    return await addDoc(ordersRef, order)
};


export const fetchOrdersByUser = async (userId: string) => {
    const ordersRef = collection(db, 'orders');
    const q = query(
        ordersRef, 
        where('userId', '==', userId), 
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {id: doc.id,
        createdAt: data.createdAt,
        totalPrice: data.totalPrice,
        items: data.items
        }
    })
}

