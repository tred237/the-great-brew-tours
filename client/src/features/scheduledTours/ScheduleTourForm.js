import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

import { fetchScheduleTour } from "./scheduledToursSlice";

export default function ScheduleTourForm({ tour_id, available_slots }) {
    const defaultFormData = {
        numberOfPeople: 1,
        tour_id: tour_id
    }

    const scheduledTours = useSelector(state => state.scheduledTours.scheduledTours)
    const [formData, setFormData] = useState({...defaultFormData})
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, numberOfPeople: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchScheduleTour(formData))
    }

    if(scheduledTours.find(t => t.tour_id === tour_id)) return (
        <p>You are scheduled for this tour</p>
    ) 
    else return (
        <Form onSubmit={handleSubmit}>
            <Form.Select onChange={handleChange}>
                {Array(available_slots).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
            </Form.Select>
            <Button type="submit">Schedule</Button>
        </Form>
    )
}