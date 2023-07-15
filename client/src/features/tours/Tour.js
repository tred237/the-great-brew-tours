import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import Container from "react-bootstrap/esm/Container";

export default function Tour({ tour }){
    const durationBreakdown = () => {
        const splitDuration = tour.duration.toString().split('.')
        if(splitDuration[1] === '25') return `${splitDuration[0]} hr 15 min`
        else if(splitDuration[1] === '5') return `${splitDuration[0]} hr 30 min`
        else if(splitDuration[1] === '75') return `${splitDuration[0]} hr 45 min`
        else return `${splitDuration[0]} hr`
    }

    return (
        <AccordionItem eventKey={tour.id}>
            <AccordionHeader>
                {`${tour.breweries[0].brewery_name}, ${tour.breweries[1].brewery_name}, ${tour.breweries[2].brewery_name}...`}
            </AccordionHeader>
            <AccordionBody>
                <Container>
                    <p>{`Date of Tour: ${tour.tour_date.split('T')[0]}`}</p>
                    <p>{`Duration: ${durationBreakdown()}`}</p>
                    <p>{`Meeting Location: ${tour.meeting_location}`}</p>
                    <p>{`Available Spots: ${tour.available_slots - tour.taken_slots}`}</p>
                    <p>{'Breweries to Visit:'}</p>
                    <ul>
                        {tour.breweries.map(b => <li key={b.id}>{b.brewery_name}</li>)}
                    </ul>
                </Container>
            </AccordionBody>
        </AccordionItem>
    )
}