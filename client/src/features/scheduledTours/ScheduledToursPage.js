import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import Accordion from "react-bootstrap/Accordion";
import Spinner from 'react-bootstrap/Spinner';

import { fetchScheduledTours } from './scheduledToursSlice';
import ScheduledTour from './ScheduledTour';
import LoginSignupModal from '../../modals/LoginSignupModal';
import { sortAscending } from '../../helpers/sort';

export default function ScheduledTours() {
    const scheduledTours = useSelector(state => state.scheduledTours.scheduledTours)
    const scheduledToursStatus = useSelector(state => state.scheduledTours.status)
    const isLoggedIn = useSelector((state) => state.session.loggedIn)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(fetchScheduledTours())
            .unwrap()
            .then(() => console.log("Scheduled tours loaded"))
            .catch(() => console.log("Scheduled tours failed"))
        } else handleShowModal()
    },[dispatch, isLoggedIn])

    if(!isLoggedIn) return (
        <Container>
            <h2>You must be logged in to see this content</h2>
            <LoginSignupModal showModal={showModal} onCloseModal={handleCloseModal} />
        </Container>
    )
    else return (
        <Container>
            <h2>Scheduled Tours</h2>
            {scheduledToursStatus === 'loading' || scheduledToursStatus === 'idle' ? <Spinner animation="border" /> :
                <Accordion defaultActiveKey="0">
                    {scheduledTours ? scheduledTours.slice().sort((a,b) => sortAscending(a.tour.tour_date, b.tour.tour_date)).map(t => <ScheduledTour key={t.id} scheduledTour={t} />) : null}
                </Accordion>}
        </Container>
    )
}