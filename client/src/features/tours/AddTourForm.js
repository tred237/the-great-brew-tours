import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { fetchBreweries } from '../breweries/breweriesSlice';

export default function AddTourForm() {
    const breweries = useSelector(state => state.breweries.breweries)
    const breweryStatus = useSelector((state) => state.breweries.status);
    const dispatch = useDispatch()

    useEffect(() => {
        if(breweryStatus === 'idle') dispatch(fetchBreweries())
    }, [dispatch, breweryStatus]);

    const defaultFormData = {
        tourDate: '',
        durationHours: 1,
        durationMinutes: 0,
        meetingLocation: '',
        availableSlots: 1,
        breweries: [],
    }

    const [formData, setFormData] = useState({...defaultFormData})

    const handleChange = (e) => {
        if(e.target.name === 'breweries') {
            if(e.target.checked) setFormData({...formData, 'breweries': [...formData.breweries, e.target.value] })
            else {
                const filteredBreweries = formData.breweries.filter(b => b != e.target.value)
                setFormData({...formData, 'breweries': filteredBreweries })
            }
        } else setFormData({...formData, [e.target.name]: e.target.value})
    }

    console.log(formData)
    return (
        <Form onSubmit={null}>
            <Form.Group>
                <Form.Label>Date of Tour *</Form.Label>
                <Form.Control type="date"
                            name="tourDate"
                            value={formData.tourDate}
                            onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                    <Form.Label>Duration *</Form.Label>
                    <Form.Label>Duration Hours *</Form.Label>
                    <Form.Select name="durationHours" defaultValue={formData.durationHours} onChange={handleChange}>
                        {Array(23).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
                    </Form.Select>
                    <Form.Label>Duration Minutes *</Form.Label>
                    <Form.Select name="durationMinutes" defaultValue={formData.durationMinutes} onChange={handleChange}>
                        {[0, 15, 30, 45].map(s => <option key={s} value={s}>{s}</option>)}
                    </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Meeting Location *</Form.Label>
                <Form.Control name="meetingLocation" value={formData.meetingLocation} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Available Slots *</Form.Label>
                <Form.Select name="availableSlots" defaultValue={formData.availableSlots} onChange={handleChange}>
                    {Array(20).fill(1).map((_,i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Select>
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
            </Form.Group>
            <Container>
                {/* {addReviewErrors ? addReviewErrors.map(e => <p key={e}>{e}</p>) : null} */}
            </Container>
            <Button variant="success" type="submit">Add</Button>
        </Form>
    )
}