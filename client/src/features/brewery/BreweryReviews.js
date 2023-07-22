import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

import { fetchDeleteReview } from "./brewerySlice";
import EditReviewModal from "../../modals/EditReviewModal";
import { formatTime } from "../../helpers/time";

export default function BreweryReviews({ review }) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    const handleDelete = () => {
        dispatch(fetchDeleteReview(review.id))
        .unwrap()
        .then(() => console.log("Review deleted"))
        .catch(err => console.log(err.errors[0]))
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <p>{review.review_username} {review.created_at.split('T')[0]} {formatTime(review.created_at.split('T')[1], true)} <i>{review.is_edited ? "Edited" : null}</i></p>
                    {/* <p>{review.review_username} {review.created_at.split('T')[0]} {review.created_at.split('T')[1].split('Z')[0]} <i>{review.is_edited ? "Edited" : null}</i></p> */}
                    {user && user.is_admin ? <Button onClick={handleDelete}>Delete</Button> : null}
                    {user && user.id === review.user_id ? <Button onClick={handleShowModal}>Edit</Button> : null}
                </Card.Header>
                <Card.Body>{review.is_recommended ? "Recommended" : "Not Recommended"}</Card.Body>
                <Card.Body>{review.review}</Card.Body>
            </Card>
            <EditReviewModal showModal={showModal} onCloseModal={handleCloseModal} review={review} />
        </Container>
    )
}