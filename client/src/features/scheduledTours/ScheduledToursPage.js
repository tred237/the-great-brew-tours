import Container from 'react-bootstrap/esm/Container';
import { useSelector } from 'react-redux';
import Accordion from "react-bootstrap/Accordion";

import Tour from '../tours/Tour';

export default function ScheduledTours() {
    const scheduledTours = useSelector(state => state.scheduledTours.scheduledTours)

    console.log(scheduledTours)
    return (
        <Container>
            <h2>Scheduled Tours</h2>
            <Accordion defaultActiveKey="0">
                {/* {scheduledTours ? scheduledTours.map(t => <Tour key={t.id} tour={t.tour} toursPage={false} />) : null} */}
            </Accordion>
        </Container>
    )
}