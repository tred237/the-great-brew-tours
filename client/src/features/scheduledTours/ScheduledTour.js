import { useState } from "react";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

import EditDeleteScheduledTourForm from "./EditDeleteScheduledTourForm";
import { formatTime, durationBreakdown } from "../../helpers/time";
import { submitButtonStyle } from "../../helpers/customStyles";

export default function ScheduledTour({ scheduledTour }){
    const [change, setChange] = useState(false)
    const [hoverCancel, setHoverCancel] = useState(false)
    const [hoverChange, setHoverChange] = useState(false)

    const handleChange = () => {
        setChange(!change)
        setHoverChange(false)
        setHoverCancel(false)
    }

    const scheduledTourForms = () => {
        if(change) {
            return (
                <>
                    <EditDeleteScheduledTourForm scheduledTourId={scheduledTour.id} 
                                                availableSlots={scheduledTour.tour.available_slots - scheduledTour.taken_slots} 
                                                reservedSlots={scheduledTour.number_of_people} 
                                                onChange={handleChange} />
                    <Button style={submitButtonStyle(hoverCancel)} onMouseOver={() => setHoverCancel(true)} onMouseOut={() => setHoverCancel(false)} onClick={handleChange}>Cancel</Button>
                </>
            )
        } else return <Button style={submitButtonStyle(hoverChange)} onMouseOver={() => setHoverChange(true)} onMouseOut={() => setHoverChange(false)} onClick={handleChange}>Change</Button>
    }

    return (
        <AccordionItem eventKey={scheduledTour.id}>
            <AccordionHeader>
                {`${scheduledTour.tour.tour_date.split('T')[0]}`}
            </AccordionHeader>
            <AccordionBody>
                <Container>
                    <p>{`Date of Tour: ${scheduledTour.tour.tour_date.split('T')[0]}`}</p>
                    <p>{`Time of Tour: ${formatTime(scheduledTour.tour.tour_date.split('T')[1])}`}</p>
                    <p>{`Duration: ${durationBreakdown(scheduledTour.tour.duration)}`}</p>
                    <p>{`Meeting Location: ${scheduledTour.tour.meeting_location}`}</p>
                    <p>{`Available Spots: ${scheduledTour.tour.available_slots - scheduledTour.taken_slots}`}</p>
                    <p>{`Spots Reserved: ${scheduledTour.number_of_people}`}</p>
                    <p>{'Breweries to Visit:'}</p>
                    <ul>
                        {scheduledTour.tour_breweries.map(b => <li key={b}>{b}</li>)}
                    </ul>
                    {scheduledTourForms()}
                </Container>
            </AccordionBody>
        </AccordionItem>
    )
}