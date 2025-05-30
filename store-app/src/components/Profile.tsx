import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { auth, db } from '../firebaseConfig';
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    deleteDoc
} from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import PageLayout from './PageLayout';
import { updateEmail, updatePassword } from 'firebase/auth'
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [docId, setDocId] = useState<string>('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('');


    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const q = query(collection(db, 'users'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const data = doc.data();
                    setUserData(data);
                    setEmail(user.email || '')
                    setDocId(doc.id);
                    setName(data.name || '');
                    setAddress(data.address || '')
                }
            } catch (err: any) {
                setError('Failed to load user data');
                console.error(err);
            }
        };
        
        fetchUserData();
    }, []);

    const handleUpdate = async () => {
        if (!docId || !auth.currentUser) return;
        setLoading(true);

        try {
            const user = auth.currentUser;

            if ((email && email !== user.email) || password) {
                if (!currentPassword) {
                    setError('Current password is required to change email or password.')
                    setLoading(false);
                    return;
                }
                const credential = EmailAuthProvider.credential(user.email!, currentPassword);
                await reauthenticateWithCredential(user, credential);
            }

            const userRef = doc(db, 'users', docId);

            if (email && email !== user.email) {
                await updateEmail(user, email);
            }

            if (password) {
                await updatePassword(user, password);
                setPassword('');
            }

            await updateDoc(userRef, {name, address, email});

            setMessage('Profile updated successfully.')
            setCurrentPassword('');
            setTimeout(() => setMessage(null), 1500);
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Failed to update profile')
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;
        if (!docId || !auth.currentUser) return;
        try {
            await deleteDoc(doc(db, 'users', docId));
            await deleteUser(auth.currentUser);
            setMessage('Account deleted successfully.');

            setTimeout(() => {
                navigate('/login');
            }, 1500)
        } catch (err: any) {
            setError('Failed to delete account')
            console.error(err)
        }
    };

    return (
        <PageLayout>
        <Container style={{maxWidth: '500px'}} className="mt-4">
            <h2>User Profile</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Form>

                <Form.Group className="mb-3">
                    <Form.Label>Current Password (required to change email or password)</Form.Label>
                    <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={(e) => {
                        setCurrentPassword(e.target.value);
                        setMessage(null)
                        setError(null);
                    }}
                    placeholder="Enter current password"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setMessage(null)
                        setError(null);
                    }}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Change Password</Form.Label>
                    <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setMessage(null)
                        setError(null);
                    }}
                    placeholder="Leave blank to keep current password"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="text"
                    value={name} 
                    onChange={(e) => {
                        setName(e.target.value);
                        setMessage(null);
                        setError(null);
                    }}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    type="text"
                    value={address} 
                    onChange={(e) => {
                        setAddress(e.target.value);
                        setMessage(null);
                        setError(null);
                    }}
                    />
                </Form.Group>

                <Button onClick={handleUpdate} variant="primary" className="me-2">
                    Update Profile
                </Button>

                <Button onClick={handleDelete} variant="danger">
                    Delete Account
                </Button>
            </Form>
        </Container>
        </PageLayout>
    );
};

export default Profile