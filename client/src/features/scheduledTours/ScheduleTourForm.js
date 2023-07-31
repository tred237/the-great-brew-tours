import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/esm/Spinner";

import { fetchAddScheduleTour } from "./scheduledToursSlice";
import { scheduledTourAdded } from "../tours/toursSlice";
import { submitButtonStyle } from '../../helpers/customStyles';

export default function ScheduleTourForm({ tour_id, available_slots, selectedDate }) {
    const defaultFormData = {
        numberOfPeople: '',
        tour_id: tour_id
    }

    const scheduledTours = useSelector(state => state.scheduledTours.scheduledTours)
    const scheduleTourErrors = useSelector(state => state.scheduledTours.scheduleTourErrors)
    const scheduleTourStatus = useSelector(state => state.scheduledTours.status)
    const [formData, setFormData] = useState({...defaultFormData})
    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)

    const handleChange = (e) => setFormData({...formData, numberOfPeople: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchAddScheduleTour(formData))
        .unwrap()
        .then(data => dispatch(scheduledTourAdded(data)))
    }

    if(scheduledTours.find(t => t.tour_id === tour_id)) return (
        <p>You are scheduled for this tour</p>
    ) 
    else if(scheduledTours.find(t => dayjs(t.tour.tour_date).format('YYYYMMDD') === selectedDate)) return (
        <p>You have another tour scheduled on this date</p>
    )
    else return (
        <Form onSubmit={handleSubmit}>
            <Form.Control required as="select" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange}>
                <option value="">How many people are coming?</option>
                {Array(available_slots).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
            </Form.Control>
            <Container className="pt-2">
                {scheduleTourErrors ? scheduleTourErrors.map(e => <p key={e}>{e}</p>) : null}
            </Container>
            {scheduleTourStatus === 'loading' ? <Spinner animation="border" /> : <Button style={submitButtonStyle(hover)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} type="submit">Schedule</Button>}
        </Form>
    )
}