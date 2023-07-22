import { useState } from "react";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

import EditDeleteScheduledTourForm from "./EditDeleteScheduledTourForm";
import formatTime from "../../helpers/time";

export default function ScheduledTour({ scheduledTour }){
    const [change, setChange] = useState(false)

    const handleChange = () => setChange(!change)

    const durationBreakdown = () => {
        const splitDuration = scheduledTour.tour.duration.toString().split('.')
        if(splitDuration[1] !== '00') return `${splitDuration[0]} hr ${splitDuration[1]} min`
        else return `${splitDuration[0]} hr`
    }

    console.log(scheduledTour.tour.tour_date.split('T')[1])
    return (
        <AccordionItem eventKey={scheduledTour.id}>
            <AccordionHeader>
                {`${scheduledTour.tour.tour_date.split('T')[0]}`}
            </AccordionHeader>
            <AccordionBody>
                <Container>
                    <p>{`Date of Tour: ${scheduledTour.tour.tour_date.split('T')[0]}`}</p>
                    <p>{`Time of Tour: ${formatTime(scheduledTour.tour.tour_date.split('T')[1])}`}</p>
                    <p>{`Duration: ${durationBreakdown()}`}</p>
                    <p>{`Meeting Location: ${scheduledTour.tour.meeting_location}`}</p>
                    <p>{`Available Spots: ${scheduledTour.tour.available_slots - scheduledTour.taken_slots}`}</p>
                    <p>{`Spots Reserved: ${scheduledTour.number_of_people}`}</p>
                    <p>{'Breweries to Visit:'}</p>
                    <ul>
                        {scheduledTour.tour_breweries.map(b => <li key={b}>{b}</li>)}
                    </ul>
                    {change ? <EditDeleteScheduledTourForm scheduledTourId={scheduledTour.id} availableSlots={scheduledTour.tour.available_slots - scheduledTour.taken_slots} reservedSlots={scheduledTour.number_of_people} onChange={handleChange} /> : <Button onClick={handleChange}>Change</Button>}
                </Container>
            </AccordionBody>
        </AccordionItem>
    )
}