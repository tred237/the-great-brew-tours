import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from "react-bootstrap/Accordion";

import { fetchScheduledTours } from './scheduledToursSlice';
import ScheduledTour from './ScheduledTour';
import LoginSignupModal from '../../modals/LoginSignupModal';

export default function ScheduledTours() {
    const scheduledTours = useSelector(state => state.scheduledTours.scheduledTours)
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
    else  return (
        <Container>
            <h2>Scheduled Tours</h2>
            <Accordion defaultActiveKey="0">
                {scheduledTours ? scheduledTours.map(t => <ScheduledTour key={t.id} scheduledTour={t} />) : null}
            </Accordion>
        </Container>
    )
}