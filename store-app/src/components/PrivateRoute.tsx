import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import type { JSX } from 'react';

const PrivateRoute = ({children} : {children: JSX.Element}) => {
    const [user, setUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div style={{padding: "2rem", textAlign: "center" }}>Loading...</div>
    }

    return user ? children: <Navigate to="/login" replace />;
};

export default PrivateRoute;