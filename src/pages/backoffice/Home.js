import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackOffice from "../../components/BackOffice";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return (
        <BackOffice>
     
        </BackOffice>
    );
}

export default Home;
