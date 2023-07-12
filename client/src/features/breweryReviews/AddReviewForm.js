import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { fetchAddReview } from './breweryReviewSlice';
import { reviewAdded } from '../brewery/brewerySlice';

export default function AddReviewForm({ onCloseModal }) {
    const brewery_id = useSelector(state => state.brewery.brewery.id)
    const addReviewErrors = useSelector(state => state.reviews.errors)
    const formDataDefault = {
        is_recommended: 'true',
        review: '',
        brewery_id: brewery_id, 
    }

    const [formData, setFormData] = useState(formDataDefault)
    const dispatch = useDispatch()

    const isSelected = (value) => formData.is_recommended === value

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchAddReview({...formData}))
        .unwrap()
        .then(data => {
            if(!('errors' in data)) {
                dispatch(reviewAdded(data))
                onCloseModal()
            }
        })
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
                {addReviewErrors ? addReviewErrors.errors.map(e => <p key={e}>{e}</p>) : null}
            </Container>
            <Button variant="success" type="submit">Add</Button>
        </Form>
    )
}