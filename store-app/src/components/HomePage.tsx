import PageLayout from "./PageLayout";
import {Col} from "react-bootstrap";
import {useState, useEffect} from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';




const HomePage: React.FC = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <PageLayout>

            <Col>
                <h1>This is the HomePage</h1>
            </Col>

            
        </PageLayout>
    );
};

export default HomePage;