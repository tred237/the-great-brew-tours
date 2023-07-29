import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';

import { fetchReviewedBreweries } from "./reviewedBreweriesSlice";
import BreweryCard from "../breweries/BreweryCard";
import LoginSignupModal from "../../modals/LoginSignupModal";
import { sortAscending } from '../../helpers/sort';

export default function ReviewedBreweries() {
    const reviewedBreweries = useSelector((state) => state.reviewedBreweries.reviewedBreweries);
    const reviewedBreweryStatus = useSelector((state) => state.reviewedBreweries.status);
    const isLoggedIn = useSelector((state) => state.session.loggedIn)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    useEffect(() => {
        if(isLoggedIn) dispatch(fetchReviewedBreweries())
        else handleShowModal()
    },[dispatch, isLoggedIn])

    if(!isLoggedIn) return (
        <Container>
            <h2>You must be logged in to see this content</h2>
            <LoginSignupModal showModal={showModal} onCloseModal={handleCloseModal} />
        </Container>
    )
    else return (
        <Container>
            <h2>Reviewed Breweries</h2>
            {reviewedBreweryStatus === 'loading' || reviewedBreweryStatus === 'idle' ? <Spinner animation="border" /> : reviewedBreweries.slice().sort((a,b) => sortAscending(a.name, b.name)).map(b => <BreweryCard key={b.id} brewery_id={b.id} brewery_name={b.name} /> )}
        </Container>
    )
}