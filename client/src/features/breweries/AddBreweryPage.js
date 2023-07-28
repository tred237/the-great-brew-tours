import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import AddBreweryForm from './AddBreweryForm';

export default function AddBrewery() {
    const isAdmin = useSelector(state => state.session.user.is_admin)
    const sessionStatus = useSelector(state => state.session.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        if((sessionStatus === 'succeeded' || sessionStatus === 'failed') && !isAdmin) navigate("/home")
    }, [dispatch, isAdmin, navigate, sessionStatus]); //brewerStatus

    const submissionSuccess = () => {
        return (
            <>
                <h4>Success!</h4>
                <Button onClick={() => setShowSuccess(false)}>Add Another Brewery</Button>
            </>
        )
    }

    return (
        <Container>
            <h3>Add Brewery</h3>
            {showSuccess ? submissionSuccess() : <AddBreweryForm setShowSuccess={setShowSuccess} />}
        </Container>
    )
}