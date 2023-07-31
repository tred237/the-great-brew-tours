import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { reviewAdded } from './brewerySlice';
import { addReviewedBrewery } from '../reviewedBreweries/reviewedBreweriesSlice';
import { submitButtonStyle } from '../../helpers/customStyles';

export default function AddReviewForm({ onCloseModal }) {
    const brewery = useSelector(state => state.brewery.brewery)
    const [addReviewErrors, setAddReviewErrors] = useState([])
    const dispatch = useDispatch()
    const [hover, setHover] = useState(false)
    
    const formDataDefault = {
        isRecommended: 'true',
        review: '',
        breweryId: brewery.id, 
    }
    const [formData, setFormData] = useState(formDataDefault)

    const isSelected = (value) => formData.isRecommended === value

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/brewery_reviews', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                is_recommended: formData.isRecommended,
                review: formData.review,
                brewery_id: formData.breweryId,
            })
            })
        const data = await response.json()
        if(response.ok) {
            dispatch(reviewAdded(data))
            dispatch(addReviewedBrewery(brewery))
            onCloseModal()
        }
        else setAddReviewErrors(data.errors)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Would you recommend this brewery?</Form.Label>
                {' '}
                <Form.Check inline type="radio" name="isRecommended" label="Yes" value='true' checked={isSelected('true')} onChange={handleChange} />
                <Form.Check inline type="radio" name="isRecommended" label="No" value='false' checked={isSelected('false')} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="pb-2">
                <Form.Control required
                            as="textarea"
                            placeholder="Write a review..." 
                            name="review" 
                            value={formData.review}
                            onChange={handleChange}/>
            </Form.Group>
            {addReviewErrors ? addReviewErrors.map(e => <p className="error-message" key={e}>{e}</p>) : null}
            <Button style={submitButtonStyle(hover)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} type="submit">Save</Button>
        </Form>
    )
}