import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import Container from "react-bootstrap/esm/Container";

import ScheduleTourForm from "../scheduledTours/ScheduleTourForm";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteTour } from "./toursSlice";

import { formatTime, durationBreakdown } from "../../helpers/time";

export default function Tour({ tour, selectedDate }){
    const isAdmin = useSelector(state => state.session.user.is_admin)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchDeleteTour(tour.id))
    }

    const adminDeleteButton = () => {
        if(isAdmin) return (
            <Form onSubmit={handleSubmit}>
                <Button type="submit">Delete Tour</Button>
            </Form>
        )
    }

    return (
        <AccordionItem eventKey={tour.id}>
            <AccordionHeader>
                {`${tour.breweries[0] ? tour.breweries[0].brewery_name : null}, ${tour.breweries[1] ? tour.breweries[1].brewery_name : null}, ${tour.breweries[2] ? tour.breweries[2].brewery_name : null}...`}
            </AccordionHeader>
            <AccordionBody>
                <Container>
                    <p>{`Date of Tour: ${tour.tour_date.split('T')[0]}`}</p>
                    <p>{`Time of Tour: ${formatTime(tour.tour_date.split('T')[1])}`}</p>
                    <p>{`Duration: ${durationBreakdown(tour.duration)}`}</p>
                    <p>{`Meeting Location: ${tour.meeting_location}`}</p>
                    <p>{`Available Spots: ${tour.available_slots - tour.taken_slots}`}</p>
                    <p>{'Breweries to Visit:'}</p>
                    <ul>
                        {tour.breweries.map(b => <li key={b.brewery_id}>{b.brewery_name}</li>)}
                    </ul>
                    <ScheduleTourForm tour_id={tour.id} available_slots={tour.available_slots - tour.taken_slots} selectedDate={selectedDate} />
                    {adminDeleteButton()}
                </Container>
            </AccordionBody>
        </AccordionItem>
    )
}