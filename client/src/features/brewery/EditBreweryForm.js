import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/esm/Spinner';

import { fetchEditBrewery } from './brewerySlice';
import { breweryEdited } from '../breweries/breweriesSlice';
import { submitButtonStyle } from '../../helpers/customStyles';

export default function EditBreweryForm({ onCloseModal }) {
    const brewery = useSelector(state => state.brewery.brewery)
    const editBreweryErrors = useSelector(state => state.brewery.editBreweryErrors)
    const editBreweryStatus = useSelector(state => state.brewery.status)
    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)

    const defaultFormData = {
        breweryName: brewery.name,
        website: brewery.website ? brewery.website : '',
        address: brewery.address ? brewery.address : '',
        city: brewery.city,
        postalCode: brewery.postal_code ? brewery.postal_code : '',
        image: brewery.image,
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
        .catch(() => console.log('Brewery edit failed'))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pb-2">
                <Form.Label>Brewery Name *</Form.Label>
                <Form.Control required name="breweryName" value={formData.breweryName} onChange={handleChange} />
                {editBreweryErrors && editBreweryErrors.name ? editBreweryErrors.name.map(e => <p className="error-message" key={e}>{`Brewery name ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group className="pb-2">
                <Form.Label>Website</Form.Label>
                <Form.Control name="website" value={formData.website} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="pb-2">
                <Form.Label>Address</Form.Label>
                <Form.Control name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="pb-2">
                <Form.Label>City *</Form.Label>
                <Form.Control required as="select" name="city" value={formData.city} onChange={handleChange}>
                    {['Colorado Springs', 'Denver', 'Fort Collins'].map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
                {editBreweryErrors && editBreweryErrors.city ? editBreweryErrors.city.map(e => <p className="error-message" key={e}>{`City ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group className="pb-2">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control name="postalCode" value={formData.postalCode} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="pb-2">
                <Form.Label>Image</Form.Label>
                <Form.Control required name="image" value={formData.image} onChange={handleChange} />
                {editBreweryErrors && editBreweryErrors.image ? editBreweryErrors.image.map(e => <p className="error-message" key={e}>{`Image ${e}`}</p>) : null}
            </Form.Group>
            {editBreweryStatus === 'loading' ? <Spinner animation="border" /> : <Button style={submitButtonStyle(hover)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} type="submit">Save</Button>}
        </Form>
    )
}