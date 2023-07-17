import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useDispatch } from "react-redux";
import { fetchEditScheduleTour } from "./scheduledToursSlice";

export default function EditDeleteScheduledTourForm({ scheduledTourId, availableSlots, reservedSlots, onChange }) {
    const defaultFormData = {
        numberOfPeople: reservedSlots,
        scheduledTourId: scheduledTourId,
    }

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({...defaultFormData})

    const handleChange = (e) => setFormData({...formData, numberOfPeople: e.target.value})

    const handleEditSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchEditScheduleTour(formData))
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault()
        console.log('delete')
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
                    <Button type="submit">Edit</Button>
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
            <Button onClick={onChange}>Cancel</Button>
        </>
    )
}