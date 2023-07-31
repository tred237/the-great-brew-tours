import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Spinner from "react-bootstrap/esm/Spinner";

import { fetchDeleteScheduleTour, fetchEditScheduleTour } from "./scheduledToursSlice";
import { deleteButtonStyle, submitButtonStyle } from "../../helpers/customStyles";

export default function EditDeleteScheduledTourForm({ scheduledTourId, availableSlots, reservedSlots, onChange }) {
    const editScheduledTourErrors = useSelector(state => state.scheduledTours.editScheduledTourErrors)
    const scheduledTourStatus = useSelector(state => state.scheduledTours.status)
    const dispatch = useDispatch()
    const [hoverSubmit, setHoverSubmit] = useState(false)
    const [hoverDelete, setHoverDelete] = useState(false)

    const defaultFormData = {
        numberOfPeople: reservedSlots,
        scheduledTourId: scheduledTourId,
    }

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

    if(availableSlots + reservedSlots === 1) return (
        <Form onSubmit={handleDeleteSubmit}>
            <Button style={deleteButtonStyle(hoverDelete)} onMouseOver={() => setHoverDelete(true)} onMouseOut={() => setHoverDelete(false)} type="submit">Delete</Button>
        </Form>
    ) 
    else return (
        <>
            <Form onSubmit={handleEditSubmit}>
                <Form.Select name="numberOfPeople" defaultValue={formData.numberOfPeople} onChange={handleChange}>
                    {Array(availableSlots + reservedSlots).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Select>
                {editScheduledTourErrors ? editScheduledTourErrors.map(e => <p key={e}>{e}</p>) : null}
                <div className="pt-1">
                    {scheduledTourStatus === 'loading' ? <Spinner animation="border" /> : <Button style={submitButtonStyle(hoverSubmit)} onMouseOver={() => setHoverSubmit(true)} onMouseOut={() => setHoverSubmit(false)} name="save" type="submit">Save</Button>}
                </div>
            </Form>
            <Form className="pt-1 pb-1" onSubmit={handleDeleteSubmit}>
                <Button style={deleteButtonStyle(hoverDelete)} onMouseOver={() => setHoverDelete(true)} onMouseOut={() => setHoverDelete(false)} type="submit">Delete</Button>
            </Form>
        </>
    )
}