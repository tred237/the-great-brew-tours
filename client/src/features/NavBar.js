import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/esm/Navbar';
import Nav from 'react-bootstrap/esm/Nav';
import Container from 'react-bootstrap/esm/Container';

import { fetchLogout } from './session/sessionSlice';
import { resetReviewedBreweries } from './reviewedBreweries/reviewedBreweriesSlice';
import { resetTours } from './tours/toursSlice';
import { resetScheduledTours } from './scheduledTours/scheduledToursSlice';


export default function NavBar() {
    const loggedIn = useSelector(state => state.session.loggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogoutClick = () => {
        dispatch(fetchLogout())
        dispatch(resetReviewedBreweries())
        dispatch(resetTours())
        dispatch(resetScheduledTours())
        navigate('/home')
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/home">GBT</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/tours">Tours</Nav.Link>
                    <Nav.Link as={Link} to="/scheduled-tours">Scheduled Tours</Nav.Link>
                    <Nav.Link as={Link} to="/reviewed-breweries">Reviewed Breweries</Nav.Link>
                    {loggedIn ? <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link> : <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    )
}