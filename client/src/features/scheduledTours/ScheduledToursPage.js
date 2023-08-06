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

    console.log("is log " + isLoggedIn)
    if(isLoggedIn && scheduledToursStatus === 'succeeded') console.log("is sched " + scheduledTours.length === 0)
    if(!isLoggedIn) {
        return (
            <Container className="pt-5 text-center">
                <h2>You must be logged in to see this content.</h2>
                <LoginSignupModal showModal={showModal} onCloseModal={handleCloseModal} />
            </Container>
        )
    }
    else if(isLoggedIn && scheduledTours.length === 0) {
        return (
            <Container className="pt-5 text-center">
                <h2>Schedule a tour from the "Tours" tab!</h2>
            </Container>
        )
    }
    else return (
        <Container className="pt-5">
            <h2 className="text-center pb-3">Scheduled Tours</h2>
            {scheduledToursStatus === 'loading' || scheduledToursStatus === 'idle' ? <Spinner animation="border" /> :
                <Accordion className="scheduled-tour-accordion" defaultActiveKey="0">
                    {scheduledTours ? scheduledTours.slice().sort((a,b) => sortAscending(a.tour.tour_date, b.tour.tour_date)).map(t => <ScheduledTour key={t.id} scheduledTour={t} />) : null}
                </Accordion>}
        </Container>
    )
}