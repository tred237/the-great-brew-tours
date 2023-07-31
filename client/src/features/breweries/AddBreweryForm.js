import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/esm/Spinner';

import { fetchAddBrewery, fetchBreweries } from './breweriesSlice';
import { submitButtonStyle } from '../../helpers/customStyles';

export default function AddBreweryForm({ setShowSuccess }) {
    const breweriesStatus = useSelector(state => state.breweries.status)
    const breweryErrors = useSelector(state => state.breweries.addBreweryErrors)
    const addBreweryStatus = useSelector(state => state.breweries.status)
    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)

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
        .catch(() => console.log('Failed to add brewery'))
    }

    return (
        <Form className="add-brewery-form" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Brewery Name *</Form.Label>
                <Form.Control required name="breweryName" value={formData.breweryName} onChange={handleChange} />
                {breweryErrors && breweryErrors.name ? breweryErrors.name.map(e => <p className="error-message" key={e}>{`Brewery name ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label className="pt-2">Website</Form.Label>
                <Form.Control name="website" value={formData.website} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label className="pt-2">Address</Form.Label>
                <Form.Control name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label className="pt-2">City *</Form.Label>
                <Form.Control required as="select" name="city" value={formData.city} onChange={handleChange}>
                    <option value=''>Choose a city</option>
                    {['Colorado Springs', 'Denver', 'Fort Collins'].map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                {breweryErrors && breweryErrors.city ? breweryErrors.city.map(e => <p className="error-message" key={e}>{`City ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label className="pt-2">Postal Code</Form.Label>
                <Form.Control name="postalCode" value={formData.postalCode} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="pb-3">
                <Form.Label className="pt-2">Image *</Form.Label>
                <Form.Control name="image" value={formData.image} onChange={handleChange} />
                {breweryErrors && breweryErrors.image ? breweryErrors.image.map(e => <p className="error-message" key={e}>{`Image ${e}`}</p>) : null}
            </Form.Group>
            {addBreweryStatus === 'loading' ? <Spinner animation="border" /> : <Button type="submit" style={submitButtonStyle(hover)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} >Save</Button>}
        </Form>
    )
}