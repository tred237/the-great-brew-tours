import { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from "react-bootstrap/Accordion";

import ScheduledTour from './ScheduledTour';
import { fetchScheduledTours } from './scheduledToursSlice';

export default function ScheduledTours() {
    const scheduledTours = useSelector(state => state.scheduledTours.scheduledTours)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchScheduledTours())
        .unwrap()
        .then(() => console.log("Scheduled tours loaded"))
        .catch(() => console.log("Scheduled tours failed"))
    },[dispatch])

    return (
        <Container>
            <h2>Scheduled Tours</h2>
            <Accordion defaultActiveKey="0">
                {scheduledTours ? scheduledTours.map(t => <ScheduledTour key={t.id} scheduledTour={t} />) : null}
            </Accordion>
        </Container>
    )
}