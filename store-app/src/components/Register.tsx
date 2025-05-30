import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import PageLayout from './PageLayout';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


  const Register = () => {
    const [data, setData] = useState({ email: '', password: ''})
    const [submitted, setSubmitted] = useState(false)
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setError(null);
        setSuccess(null);
      }; 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    
    if (!data.email || !data.password) return;

    setLoading(true);
    const auth = getAuth();
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            email: data.email,
            });

        setSuccess('User added successfully!');
        setData({ email: '', password: '' });
        setSubmitted(false); 

        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } catch (err: any) {
        console.error(err);
        setError(err.message)
      } finally {
        setLoading(false);
      }
    };
  

      return (
        <PageLayout>
        <Container className="mt-4" style={{ maxWidth: '400px' }}>
        <h2 className="mb-3">Register User</h2>
  
        {submitted && (!data.email || !data.password) && (
          <Alert variant="danger">Both email and password are required.</Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
  
        {success && (
          <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        
  
    
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    isInvalid={submitted && !data.email}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    isInvalid={submitted && !data.password}
                    />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Register'}
            </Button>

        </Form>
        <div className="mt-3 text-center">
          <span>Already have an account? </span>
          <Link to="/login">Login here</Link>
        </div>
    </Container>
    </PageLayout>
      );
};

export default Register;