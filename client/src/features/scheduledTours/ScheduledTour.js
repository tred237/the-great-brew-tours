import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import Container from "react-bootstrap/esm/Container";

export default function ScheduledTour({ scheduledTour }){
    const durationBreakdown = () => {
        const splitDuration = scheduledTour.tour.duration.toString().split('.')
        if(splitDuration[1] === '25') return `${splitDuration[0]} hr 15 min`
        else if(splitDuration[1] === '5') return `${splitDuration[0]} hr 30 min`
        else if(splitDuration[1] === '75') return `${splitDuration[0]} hr 45 min`
        else return `${splitDuration[0]} hr`
    }

    console.log(scheduledTour)
    return (
        <AccordionItem eventKey={scheduledTour.id}>
            <AccordionHeader>
                {`${scheduledTour.tour.tour_date.split('T')[0]}`}
            </AccordionHeader>
            <AccordionBody>
                <Container>
                    <p>{`Date of Tour: ${scheduledTour.tour.tour_date.split('T')[0]}`}</p>
                    <p>{`Duration: ${durationBreakdown()}`}</p>
                    <p>{`Meeting Location: ${scheduledTour.tour.meeting_location}`}</p>
                    <p>{`Available Spots: ${scheduledTour.tour.available_slots - scheduledTour.taken_slots}`}</p>
                    <p>{'Breweries to Visit:'}</p>
                    <ul>
                        {scheduledTour.tour_breweries.map(b => <li key={b}>{b}</li>)}
                    </ul>
                </Container>
            </AccordionBody>
        </AccordionItem>
    )
}