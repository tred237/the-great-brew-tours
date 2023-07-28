import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container"
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";

import { fetchBrewery } from "./brewerySlice";
import BreweryInformation from "./BreweryInformation";
import BreweryReviews from "./BreweryReviews";
import AddReviewModal from "../../modals/AddReviewModal";
import LoginSignupModal from "../../modals/LoginSignupModal";
import BreweryNotFound from "./BreweryNotFound";

export default function Brewery() {
    const brewery = useSelector((state) => state.brewery.brewery)
    const breweryStatus = useSelector((state) => state.brewery.status)
    const breweryErrors = useSelector((state) => state.brewery.getBreweryErrors)
    const isLoggedIn = useSelector(state => state.session)
    const dispatch = useDispatch()
    const breweryId = useParams()
    const [showModal, setShowModal] = useState(false)

    const session = useSelector(state => state.session)
  
    useEffect(() => {
        if(breweryId.id){
            dispatch(fetchBrewery(breweryId.id))
            .unwrap()
            .then(() => console.log('We have a brewery'))
            .catch(err => console.log(err))
        }
    }, [breweryId.id, isLoggedIn, dispatch])

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    if(Object.keys(brewery).length === 0 && (breweryStatus === 'idle' || breweryStatus === 'loading')) return <Spinner animation="border" />
    else if(Object.keys(brewery).length === 0 && breweryErrors) return <BreweryNotFound />
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
                <Button onClick={handleShowModal}>Add Review</Button>
            </Container>
            <Container>
                {brewery.brewery_reviews ? brewery.brewery_reviews.map(r => <BreweryReviews key={r.id} review={r} />) : null}
            </Container>
            {isLoggedIn.loggedIn ? <AddReviewModal showModal={showModal} onCloseModal={handleCloseModal} /> : <LoginSignupModal showModal={showModal} onCloseModal={handleCloseModal} />}
        </Container>
    )
}