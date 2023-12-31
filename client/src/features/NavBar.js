import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/esm/Navbar';
import Nav from 'react-bootstrap/esm/Nav';
import Container from 'react-bootstrap/esm/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { fetchLogout } from './session/sessionSlice';
import { resetReviewedBreweries } from './reviewedBreweries/reviewedBreweriesSlice';
import { resetTours } from './tours/toursSlice';
import { resetScheduledTours } from './scheduledTours/scheduledToursSlice';
import LoginSignupModal from '../modals/LoginSignupModal';
import gbtlogo1 from "../assets/gbtlogo1.png";


export default function NavBar() {
    const loggedIn = useSelector(state => state.session.loggedIn)
    const isAdmin = useSelector(state => state.session.user.is_admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    const handleLogoutClick = () => {
        dispatch(fetchLogout())
        dispatch(resetReviewedBreweries())
        dispatch(resetTours())
        dispatch(resetScheduledTours())
        navigate('/home')
    }

    return (
        <>
            <Navbar className="nav-bar" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/home">
                        <img src={gbtlogo1} alt='GBT' width="80" height="50" className="d-inline-block align-top"/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/tours">Tours</Nav.Link>
                        <Nav.Link as={Link} to="/scheduled-tours">Scheduled Tours</Nav.Link>
                        <Nav.Link as={Link} to="/reviewed-breweries">Reviewed Breweries</Nav.Link>
                        {isAdmin ? 
                            <NavDropdown title="Admin Tools">
                                <NavDropdown.Item as={Link} to="/add-tour">Add Tour</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/add-brewery">Add Brewery</NavDropdown.Item>
                            </NavDropdown>
                            : null}
                        {loggedIn ? <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link> : <Nav.Link onClick={handleShowModal}>Login</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
            <LoginSignupModal showModal={showModal} onCloseModal={handleCloseModal} />
        </>
    )
}