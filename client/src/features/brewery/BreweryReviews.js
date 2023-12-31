import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

import { fetchDeleteReview } from "./brewerySlice";
import EditReviewModal from "../../modals/EditReviewModal";
import { deleteButtonStyle, submitButtonStyle } from "../../helpers/customStyles";

export default function BreweryReviews({ review }) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [hoverEdit, setHoverEdit] = useState(false)
    const [hoverDelete, setHoverDelete] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    const handleDelete = () => {
        dispatch(fetchDeleteReview(review.id))
        .unwrap()
        .then(() => console.log("Review deleted"))
        .catch(() => console.log("Failed to delete review"))
    }

    return (
        <Container className="pb-4">
            <Card className="reviews-container">
                <Card.Header>
                    <p className="pt-3">{review.review_username} {review.created_at.split('T')[0]} <i>{review.is_edited ? "Edited" : null}</i></p>
                    {user && user.id === review.user_id ? <Button style={submitButtonStyle(hoverEdit)} onMouseOver={() => setHoverEdit(true)} onMouseOut={() => setHoverEdit(false)} onClick={handleShowModal}>Edit</Button> : null}
                    {' '}
                    {user && user.is_admin ? <Button style={deleteButtonStyle(hoverDelete)} onMouseOver={() => setHoverDelete(true)} onMouseOut={() => setHoverDelete(false)} onClick={handleDelete}>Delete</Button> : null}
                </Card.Header>
                <Card.Body>{review.is_recommended ? "Recommended" : "Not Recommended"}</Card.Body>
                <Card.Body>{review.review}</Card.Body>
            </Card>
            <EditReviewModal showModal={showModal} onCloseModal={handleCloseModal} review={review} />
        </Container>
    )
}