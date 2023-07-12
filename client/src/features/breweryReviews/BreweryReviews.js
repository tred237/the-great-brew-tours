import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

import { fetchDeleteReview } from "../brewery/brewerySlice";

export default function BreweryReviews({ review }) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(fetchDeleteReview(review.id))
    }

    const reviewButton = () => {
        if(!user) return null
    
        if(user.is_admin) return <Button variant="success" onClick={handleDelete}>Delete</Button>
        else if(user.id === review.user_id) return <Button variant="success">Edit</Button>
        else return null
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <p>{review.review_username} {review.created_at.split('T')[0]} {review.created_at.split('T')[1].split('Z')[0]} <i>{review.is_edited ? "Edited" : null}</i></p>
                    {reviewButton()}
                </Card.Header>
                <Card.Body>{review.is_recommended ? "Recommended" : "Not Recommended"}</Card.Body>
                <Card.Body>{review.review}</Card.Body>
            </Card>
        </Container>
    )
}