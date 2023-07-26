import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { fetchBreweries } from '../breweries/breweriesSlice';
// import { fetchAddTour } from './toursSlice';
import { useNavigate } from 'react-router-dom';
import AddTourForm from './AddTourForm';

export default function AddTour() {
    const isAdmin = useSelector(state => state.session.user.is_admin)
    const sessionStatus = useSelector(state => state.session.status)
    const breweryStatus = useSelector(state => state.breweries.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        if((sessionStatus === 'succeeded' || sessionStatus === 'failed') && !isAdmin) navigate("/home")
        if(breweryStatus === 'idle') dispatch(fetchBreweries())
    }, [dispatch, breweryStatus, isAdmin, navigate, sessionStatus]);

    const submissionSuccess = () => {
        return (
            <>
                <h4>Success!</h4>
                <Button onClick={() => setShowSuccess(false)}>Add Another Tour</Button>
            </>
        )
    }

    return (
        <Container>
            <h3>Add Tour</h3>
            {showSuccess ? submissionSuccess() : <AddTourForm setShowSuccess={setShowSuccess} />}
        </Container>
    )
}