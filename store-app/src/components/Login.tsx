import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import PageLayout from './PageLayout';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [data, setData] = useState({ email: '', password: ''});
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({...data, [name]: value});
        setError(null);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/')
        } catch (err: any) {
            if (
                err.code === 'auth/user-not-found' ||
                err.code === 'auth/wrong-password' ||
                err.code === 'auth/invalid-credential'
            ) {
                setError('Incorrect email and password combination.')
            } else {
                setError('Something went wrong. Please try again.')
            }
        }
    };

    return (
        <PageLayout>
            <Container style={{maxWidth: '400px'}} className="mt-4">
                <h2>Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email" 
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Button type="submit">Login</Button>
                </Form>
                <div className="mt-3 text-center">
                    <span>Don't have an account?</span>
                    <Link to="/register"> Create one!</Link>
                </div>
            </Container>
        </PageLayout>
    );
};

export default Login;