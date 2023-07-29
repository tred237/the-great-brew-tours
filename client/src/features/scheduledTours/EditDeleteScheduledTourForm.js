import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteScheduleTour, fetchEditScheduleTour } from "./scheduledToursSlice";
import Spinner from "react-bootstrap/esm/Spinner";

export default function EditDeleteScheduledTourForm({ scheduledTourId, availableSlots, reservedSlots, onChange }) {
    const defaultFormData = {
        numberOfPeople: reservedSlots,
        scheduledTourId: scheduledTourId,
    }

    const editScheduledTourErrors = useSelector(state => state.scheduledTours.editScheduledTourErrors)
    const scheduledTourStatus = useSelector(state => state.scheduledTours.status)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({...defaultFormData})

    const handleChange = (e) => setFormData({...formData, numberOfPeople: e.target.value})

    const handleEditSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchEditScheduleTour(formData))
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchDeleteScheduleTour(formData))
    }

    const canEditScheduledTour = () => {
        if(availableSlots + reservedSlots === 1) return (
            <Form onSubmit={handleDeleteSubmit}>
                <Button name="delete" type="submit">Delete</Button>
            </Form>
        ) 
        else return (
            <>
                <Form onSubmit={handleEditSubmit}>
                    <Form.Select name="numberOfPeople" defaultValue={formData.numberOfPeople} onChange={handleChange}>
                        {Array(availableSlots + reservedSlots).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
                    </Form.Select>
                    {editScheduledTourErrors ? editScheduledTourErrors.map(e => <p key={e}>{e}</p>) : null}
                    {scheduledTourStatus === 'loading' ? <Spinner animation="border" /> : <Button type="submit">Save</Button>}
                </Form>
                <Form onSubmit={handleDeleteSubmit}>
                    <Button type="submit">Delete</Button>
                </Form>
            </>
        )
    }
    
    return (
        <>
            {canEditScheduledTour()}
            {scheduledTourStatus === 'loading' ? <Spinner animation="border" /> : <Button onClick={onChange}>Cancel</Button>}
        </>
    )
}