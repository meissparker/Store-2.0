import {
    collection, 
    getDocs,
    query,
    where,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    Query,
    type DocumentData
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export type Product = {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const productsRef = collection(db, 'products');

export const fetchProducts = async (category?: string): Promise<(Product & {id: string})[]> => {
    let q: Query<DocumentData> = collection(db, 'products')

    if (category && category !== 'all') {
        q= query(q, where ('category', '==', category));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...(doc.data() as Product)
    }));
};

export const fetchCategories = async (): Promise<string[]> => {
    const snapshot = await getDocs(collection(db, 'products'));
    const categories = new Set<string>();
    snapshot.forEach(doc => {
        const data = doc.data();
        if (data.category) categories.add(data.category);
    });
    return Array.from(categories)
}

export const createProduct = async (product: Product) => {
    return await addDoc(productsRef, product);
};

export const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    const productDoc = doc(db, 'products', id);
    return await updateDoc(productDoc, updatedProduct);
};

export const deleteProduct = async (id: string) => {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
};