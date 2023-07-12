import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

import { fetchDeleteReview } from "../brewery/brewerySlice";
import EditReviewModal from "../../modals/EditReviewModal";
import { removeErrors } from "./breweryReviewSlice";

export default function BreweryReviews({ review }) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => {
        setShowModal(false)
        dispatch(removeErrors())
    }

    const handleDelete = () => {
        dispatch(fetchDeleteReview(review.id))
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <p>{review.review_username} {review.created_at.split('T')[0]} {review.created_at.split('T')[1].split('Z')[0]} <i>{review.is_edited ? "Edited" : null}</i></p>
                    {user && user.is_admin ? <Button variant="success" onClick={handleDelete}>Delete</Button> : null}
                    {user && user.id === review.user_id ? <Button variant="success" onClick={handleShowModal}>Edit</Button> : null}
                </Card.Header>
                <Card.Body>{review.is_recommended ? "Recommended" : "Not Recommended"}</Card.Body>
                <Card.Body>{review.review}</Card.Body>
            </Card>
            <EditReviewModal showModal={showModal} onCloseModal={handleCloseModal} review={review} />
        </Container>
    )
}