import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container"
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import Image from 'react-bootstrap/esm/Image';

import { fetchBrewery } from "./brewerySlice";
import BreweryInformation from "./BreweryInformation";
import BreweryReviews from "./BreweryReviews";
import AddReviewModal from "../../modals/AddReviewModal";
import LoginSignupModal from "../../modals/LoginSignupModal";
import BreweryNotFound from "./BreweryNotFound";
import { sortDescending } from "../../helpers/sort";
import { fetchBreweries } from "../breweries/breweriesSlice";
import gbtlogo2 from "../../assets/gbtlogo2.png";

export default function Brewery() {
    const brewery = useSelector((state) => state.brewery.brewery)
    const breweryStatus = useSelector((state) => state.brewery.status)
    const breweriesStatus = useSelector(state => state.breweries.status)
    const breweryErrors = useSelector((state) => state.brewery.getBreweryErrors)
    const isLoggedIn = useSelector(state => state.session)
    const dispatch = useDispatch()
    const breweryId = useParams()
    const [showModal, setShowModal] = useState(false)

    // const session = useSelector(state => state.session)
  
    useEffect(() => {
        if(breweryId.id){
            if(breweriesStatus === 'idle') dispatch(fetchBreweries())
            dispatch(fetchBrewery(breweryId.id))
            .unwrap()
            .then(() => console.log('We have a brewery'))
            .catch(err => console.log(err))
        }
    }, [breweryId.id, isLoggedIn, dispatch, breweriesStatus])

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    // console.log(breweries)

    if(Object.keys(brewery).length === 0 && (breweryStatus === 'idle' || breweryStatus === 'loading')) return <Spinner animation="border" />
    else if(Object.keys(brewery).length === 0 && breweryErrors) return <BreweryNotFound />
    return (
        <Container>
            <Container className='d-flex justify-content-center p-4 w-75 h-25'>
                <Image className="rounded brewery-information-image" src={brewery.image} alt={brewery.name} onError={(e) => e.target.src = gbtlogo2} />
            </Container>
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
                {brewery.brewery_reviews ? brewery.brewery_reviews.slice().sort((a,b) => sortDescending(a.created_at, b.created_at)).map(r => <BreweryReviews key={r.id} review={r} />) : null}
            </Container>
            {isLoggedIn.loggedIn ? <AddReviewModal showModal={showModal} onCloseModal={handleCloseModal} /> : <LoginSignupModal showModal={showModal} onCloseModal={handleCloseModal} />}
        </Container>
    )
}