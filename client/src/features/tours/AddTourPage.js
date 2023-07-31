import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

import { fetchBreweries } from '../breweries/breweriesSlice';
import AddTourForm from './AddTourForm';
import { submitButtonStyle } from '../../helpers/customStyles';
import { clearAddTourErrors } from './toursSlice';

export default function AddTour() {
    const isAdmin = useSelector(state => state.session.user.is_admin)
    const sessionStatus = useSelector(state => state.session.status)
    const breweryStatus = useSelector(state => state.breweries.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showSuccess, setShowSuccess] = useState(false)
    const [hover, setHover] = useState(false)

    useEffect(() => {
        dispatch(clearAddTourErrors())
        if((sessionStatus === 'succeeded' || sessionStatus === 'failed') && !isAdmin) navigate("/home")
        if(breweryStatus === 'idle') dispatch(fetchBreweries())
    }, [dispatch, breweryStatus, isAdmin, navigate, sessionStatus]);

    return (
        <Container className='form-page-container'>
            <h3 className="text-center pb-3">{showSuccess ? "Success!" : "Add Tour"}</h3>
            {showSuccess ? <Button className="form-success-button" 
                                style={submitButtonStyle(hover)} 
                                onMouseOver={() => setHover(true)}
                                onMouseOut={() => setHover(false)} 
                                onClick={() => setShowSuccess(false)}>Add Another Tour</Button> 
                        : <AddTourForm setShowSuccess={setShowSuccess} />}
        </Container>
    )
}