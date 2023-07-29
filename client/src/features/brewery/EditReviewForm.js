import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { reviewEdited } from './brewerySlice';

export default function EditReviewForm({ onCloseModal, review }) {
    const brewery_id = useSelector(state => state.brewery.brewery.id)
    const [editReviewErrors, setEditReviewErrors] = useState([])
    const formDataDefault = {
        isRecommended: review.is_recommended.toString(),
        review: review.review,
        breweryId: brewery_id,
        reviewId: review.id
    }

    const [formData, setFormData] = useState(formDataDefault)
    const dispatch = useDispatch()

    const isSelected = (value) => formData.isRecommended === value

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`/brewery_reviews/${formData.reviewId}}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                is_recommended: formData.isRecommended,
                review: formData.review,
                brewery_id: formData.breweryId,
                review_id: formData.reviewId,
            })
        })
        const data = await response.json()
        if(response.ok) {
            dispatch(reviewEdited(data))
            onCloseModal()
        }
        else setEditReviewErrors(data.errors)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Would you recommend this brewery?</Form.Label>
                <Form.Check inline type="radio" name="isRecommended" label="Yes" value='true' checked={isSelected('true')} onChange={handleChange} />
                <Form.Check inline type="radio" name="isRecommended" label="No" value='false' checked={isSelected('false')} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Control required 
                            as="textarea"
                            placeholder="Write a review..." 
                            name="review" 
                            value={formData.review}
                            onChange={handleChange}/>
            </Form.Group>
            <Container>
                {editReviewErrors ? editReviewErrors.map(e => <p key={e}>{e}</p>) : null}
            </Container>
            <Button type="submit">Save</Button>
        </Form>
    )
}