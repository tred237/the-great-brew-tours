import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import { fetchAddTour } from './toursSlice';
import AddTourInputs from './AddTourInputs';
import AddTourCheckbox from './AddTourCheckbox';
import { buttonStyle } from '../../helpers/customStyles';

export default function AddTourForm({ setShowSuccess }) {
    const addTourStatus = useSelector(state => state.tours.status)
    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)

    const defaultFormData = {
        tourDate: '',
        meetingTimeHours: '',
        meetingTimeMinutes: '',
        durationHours: '',
        durationMinutes: '',
        meetingLocation: '',
        availableSlots: '',
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
        <Form className="form-container" onSubmit={handleSubmit}>
            <Row>
                <Col>
                <AddTourInputs formData={formData} handleChange={handleChange}/>
                {addTourStatus === 'loading' ? <Spinner animation="border" /> : <Button type="submit" style={buttonStyle(hover)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} >Save</Button>}
                </Col>
                <Col className="check-box-column" sm={8}>
                    <AddTourCheckbox handleChange={handleChange} />
                </Col>
            </Row>
        </Form>
    )
}