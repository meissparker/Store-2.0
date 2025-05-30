import { Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const LogoutButton = () => {
    const handleLogout = async () => {
        await signOut(auth);
    };

    return <Button onClick={handleLogout} variant="secondary">Logout</Button>
};

export default LogoutButton;