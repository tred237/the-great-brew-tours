import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { fetchAddBrewery } from './breweriesSlice';
import Spinner from 'react-bootstrap/esm/Spinner';

export default function AddBreweryForm({ setShowSuccess }) {
    const breweryErrors = useSelector(state => state.breweries.addBreweryErrors)
    const addBreweryStatus = useSelector(state => state.breweries.status)
    const dispatch = useDispatch()

    const defaultFormData = {
        breweryName: '',
        website: '',
        address: '',
        city: '',
        postalCode: '',
    }

    const [formData, setFormData] = useState({...defaultFormData})

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchAddBrewery(formData))
        .unwrap()
        .then(() => {
            setShowSuccess(true)
            setFormData({...defaultFormData})
        })
        .catch(err => console.log(err.errors))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Brewery Name *</Form.Label>
                <Form.Control name="breweryName" value={formData.breweryName} onChange={handleChange} />
                {breweryErrors && breweryErrors.name ? breweryErrors.name.map(e => <p key={e}>{`Brewery name ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Website</Form.Label>
                <Form.Control name="website" value={formData.website} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>City *</Form.Label>
                <Form.Control name="city" value={formData.city} onChange={handleChange} />
                {breweryErrors && breweryErrors.city ? breweryErrors.city.map(e => <p key={e}>{`City ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control name="postalCode" value={formData.postalCode} onChange={handleChange} />
            </Form.Group>
            {addBreweryStatus === 'loading' ? <Spinner animation="border" /> : <Button type="submit">Save</Button>}
        </Form>
    )
}