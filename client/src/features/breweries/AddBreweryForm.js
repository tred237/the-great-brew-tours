import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/esm/Spinner';

import { fetchAddBrewery, fetchBreweries } from './breweriesSlice';

export default function AddBreweryForm({ setShowSuccess }) {
    const breweriesStatus = useSelector(state => state.breweries.status)
    const breweryErrors = useSelector(state => state.breweries.addBreweryErrors)
    const addBreweryStatus = useSelector(state => state.breweries.status)
    const dispatch = useDispatch()

    const defaultFormData = {
        breweryName: '',
        website: '',
        address: '',
        city: '',
        postalCode: '',
        image: ''
    }

    useEffect(() => {
        if(breweriesStatus === 'idle') dispatch(fetchBreweries())
    },[dispatch, breweriesStatus])

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

    const breweries = useSelector(state => state.breweries.breweries)
    console.log(breweries)

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Brewery Name *</Form.Label>
                <Form.Control required name="breweryName" value={formData.breweryName} onChange={handleChange} />
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
                <Form.Control required as="select" name="city" value={formData.city} onChange={handleChange}>
                    <option value=''>Choose a city</option>
                    {['Colorado Springs', 'Denver', 'Fort Collins'].map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                {breweryErrors && breweryErrors.city ? breweryErrors.city.map(e => <p key={e}>{`City ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control name="postalCode" value={formData.postalCode} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Image *</Form.Label>
                <Form.Control name="image" value={formData.image} onChange={handleChange} />
                {breweryErrors && breweryErrors.image ? breweryErrors.image.map(e => <p key={e}>{`Image ${e}`}</p>) : null}
            </Form.Group>
            {addBreweryStatus === 'loading' ? <Spinner animation="border" /> : <Button type="submit">Save</Button>}
        </Form>
    )
}