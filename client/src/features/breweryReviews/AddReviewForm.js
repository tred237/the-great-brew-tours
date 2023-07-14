import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { reviewAdded } from '../brewery/brewerySlice';
import { addReviewedBrewery } from '../reviewedBreweries/reviewedBreweriesSlice';

export default function AddReviewForm({ onCloseModal }) {
    const brewery = useSelector(state => state.brewery.brewery)
    const [addReviewErrors, setAddReviewErrors] = useState([])
    const dispatch = useDispatch()
    
    const formDataDefault = {
        is_recommended: 'true',
        review: '',
        brewery_id: brewery.id, 
    }
    const [formData, setFormData] = useState(formDataDefault)

    const isSelected = (value) => formData.is_recommended === value

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
            body: JSON.stringify(formData)
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
                <Form.Check inline type="radio" name="is_recommended" label="Yes" value='true' checked={isSelected('true')} onChange={handleChange} />
                <Form.Check inline type="radio" name="is_recommended" label="No" value='false' checked={isSelected('false')} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Control as="textarea"
                            placeholder="Write a review..." 
                            name="review" 
                            value={formData.review}
                            onChange={handleChange}/>
            </Form.Group>
            <Container>
                {addReviewErrors ? addReviewErrors.map(e => <p key={e}>{e}</p>) : null}
            </Container>
            <Button variant="success" type="submit">Add</Button>
        </Form>
    )
}