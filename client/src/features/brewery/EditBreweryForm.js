import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { fetchEditBrewery } from './brewerySlice';
import { breweryEdited } from '../breweries/breweriesSlice';
import Spinner from 'react-bootstrap/esm/Spinner';

export default function EditBreweryForm({ onCloseModal }) {
    const brewery = useSelector(state => state.brewery.brewery)
    const editBreweryErrors = useSelector(state => state.brewery.editBreweryErrors)
    const editBreweryStatus = useSelector(state => state.brewery.status)
    const dispatch = useDispatch()

    const defaultFormData = {
        breweryName: brewery.name,
        website: brewery.website ? brewery.website : '',
        address: brewery.address ? brewery.address : '',
        city: brewery.city,
        postalCode: brewery.postal_code ? brewery.postal_code : '',
        breweryId: brewery.id
    }

    const [formData, setFormData] = useState({...defaultFormData})

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchEditBrewery(formData))
        .unwrap()
        .then((data) => {
            dispatch(breweryEdited(data))
            setFormData({...defaultFormData})
            onCloseModal()
        })
        .catch(err => console.log(err.errors))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Brewery Name *</Form.Label>
                <Form.Control name="breweryName" value={formData.breweryName} onChange={handleChange} />
                {editBreweryErrors && editBreweryErrors.name ? editBreweryErrors.name.map(e => <p key={e}>{`Brewery name ${e}`}</p>) : null}
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
                {editBreweryErrors && editBreweryErrors.city ? editBreweryErrors.city.map(e => <p key={e}>{`City ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control name="postalCode" value={formData.postalCode} onChange={handleChange} />
            </Form.Group>
            {editBreweryStatus === 'loading' ? <Spinner animation="border" /> : <Button type="submit">Save</Button>}
        </Form>
    )
}