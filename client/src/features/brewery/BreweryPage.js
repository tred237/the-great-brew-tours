import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container"
import Button from "react-bootstrap/esm/Button";

import { fetchBrewery } from "./brewerySlice";
import BreweryInformation from "./BreweryInformation";
import BreweryReviews from "../breweryReviews/BreweryReviews";
import AddReviewModal from "../../modals/AddReviewModal";

export default function BreweryPage() {
    const brewery = useSelector((state) => state.brewery.brewery);
    const dispatch = useDispatch();
    const breweryId = useParams()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
  
    useEffect(() => {
      dispatch(fetchBrewery(breweryId.id))
      .unwrap()
      .then(data => {
        if('errors' in data) navigate("/home")
      })
    }, [breweryId.id, dispatch]);

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    return (
        <Container>
            <Container className='d-flex justify-content-center'>
                <BreweryInformation name={brewery.name}
                                    website={brewery.website}
                                    address={brewery.address}
                                    city={brewery.city}
                                    postal_code={brewery.postal_code} />
            </Container>
            <Container>
                <h2>Reviews</h2>
                <Button variant="success" onClick={handleShowModal}>Add Review</Button>
            </Container>
            <Container>
                {brewery.brewery_reviews ? brewery.brewery_reviews.map(r => <BreweryReviews key={r.id} review={r} />) : null}
            </Container>
            <AddReviewModal showModal={showModal} onCloseModal={handleCloseModal} />
        </Container>
    )
}