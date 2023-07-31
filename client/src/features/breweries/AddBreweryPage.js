import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import AddBreweryForm from './AddBreweryForm';
import { submitButtonStyle } from '../../helpers/customStyles';
import { clearAddBreweryErrors } from './breweriesSlice';

export default function AddBrewery() {
    const isAdmin = useSelector(state => state.session.user.is_admin)
    const sessionStatus = useSelector(state => state.session.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showSuccess, setShowSuccess] = useState(false)
    const [hover, setHover] = useState(false)

    useEffect(() => {
        dispatch(clearAddBreweryErrors())
        if((sessionStatus === 'succeeded' || sessionStatus === 'failed') && !isAdmin) navigate("/home")
    }, [dispatch, isAdmin, navigate, sessionStatus]);

    return (
        <Container className='form-page-container'>
            <h3 className="text-center pb-3">{showSuccess ? "Success!" : "Add Brewery"}</h3>
            {showSuccess ? <Button className="form-success-button" 
                                style={submitButtonStyle(hover)} 
                                onMouseOver={() => setHover(true)}
                                onMouseOut={() => setHover(false)} 
                                onClick={() => setShowSuccess(false)}>Add Another Brewery</Button> 
                        : <AddBreweryForm setShowSuccess={setShowSuccess} />}
        </Container>
    )
}