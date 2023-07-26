import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { fetchAddTour } from './toursSlice';

export default function AddTourForm({ setShowSuccess }) {
    const breweries = useSelector(state => state.breweries.breweries)
    const tourErrors = useSelector(state => state.tours.addTourErrors)
    const dispatch = useDispatch()

    const defaultFormData = {
        tourDate: '',
        meetingTimeHours: '0',
        meetingTimeMinutes: '0',
        durationHours: '1',
        durationMinutes: '0',
        meetingLocation: '',
        availableSlots: '1',
        breweries: [],
    }

    const [formData, setFormData] = useState({...defaultFormData})

    const handleChange = (e) => {
        if(e.target.name === 'breweries') {
            if(e.target.checked) setFormData({...formData, 'breweries': [...formData.breweries, e.target.value] })
            else {
                const filteredBreweries = formData.breweries.filter(b => b !== e.target.value)
                setFormData({...formData, 'breweries': filteredBreweries })
            }
        } else setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchAddTour(formData))
        .unwrap()
        .then(data => {
            fetchAddTourBreweries(data.id, formData.breweries)
            setShowSuccess(true)
            setFormData({...defaultFormData})
        })
        .catch(err => console.log(err.errors))
    }

    const fetchAddTourBreweries = async (tourId, breweries) => {
        const response = await fetch('/tour_breweries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                tour_id: tourId,
                breweries: breweries
            })
        })
        if(response.ok) console.log('Tour breweries added')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Date of Tour *</Form.Label>
                <Form.Control 
                            type="date"
                            name="tourDate"
                            value={formData.tourDate}
                            onChange={handleChange} />
                <Form.Label>Meeting Time (Hours) *</Form.Label>
                <Form.Control required as="select" name="meetingTimeHours" value={formData.meetingTimeHours} onChange={handleChange}>
                    {Array(24).fill(0).map((_,i) => i).map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                <Form.Label>Meeting Time (Minutes) *</Form.Label>
                <Form.Control required as="select" name="meetingTimeMinutes" value={formData.meetingTimeMinutes} onChange={handleChange}>
                    {[0, 15, 30, 45].map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                {tourErrors && tourErrors.tour_date ? tourErrors.tour_date.map(e => <p key={e}>{`Tour date ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Duration (Hours) *</Form.Label>
                <Form.Control required as="select" name="durationHours" value={formData.durationHours} onChange={handleChange}>
                    {Array(23).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                <Form.Label>Duration (Minutes) *</Form.Label>
                <Form.Control required as="select" name="durationMinutes" value={formData.durationMinutes} onChange={handleChange}>
                    {[0, 15, 30, 45].map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                {tourErrors && tourErrors.duration ? tourErrors.duration.map(e => <p key={e}>{`Tour duration ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Meeting Location *</Form.Label>
                <Form.Control name="meetingLocation" value={formData.meetingLocation} onChange={handleChange} />
                {tourErrors && tourErrors.meeting_location ? tourErrors.meeting_location.map(e => <p key={e}>{`Meeting location ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Available Slots *</Form.Label>
                <Form.Control required as="select" name="availableSlots" value={formData.availableSlots} onChange={handleChange}>
                    {Array(20).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                {tourErrors && tourErrors.available_slots ? tourErrors.available_slots.map(e => <p key={e}>{`Available slots ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Breweries *</Form.Label>
                {breweries.map(b => {
                    return (<Form.Check key={b.id}
                    type='checkbox'
                    name='breweries'
                    value={b.id}
                    label={b.name}
                    onChange={handleChange} />)
                })}
                {tourErrors && tourErrors.tour_breweries ? tourErrors.tour_breweries.map(e => <p key={e}>{e}</p>) : null}
            </Form.Group>
            <Button type="submit">Save</Button>
        </Form>
    )
}