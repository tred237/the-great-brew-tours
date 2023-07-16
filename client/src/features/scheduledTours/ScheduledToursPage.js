import Container from 'react-bootstrap/esm/Container';
import { useSelector } from 'react-redux';
import Accordion from "react-bootstrap/Accordion";

import ScheduledTour from './ScheduledTour';

export default function ScheduledTours() {
    const scheduledTours = useSelector(state => state.scheduledTours.scheduledTours)

    return (
        <Container>
            <h2>Scheduled Tours</h2>
            <Accordion defaultActiveKey="0">
                {scheduledTours ? scheduledTours.map(t => <ScheduledTour key={t.id} scheduledTour={t} />) : null}
            </Accordion>
        </Container>
    )
}