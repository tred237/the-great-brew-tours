import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

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

    if(!isLoggedIn) {
        return (
            <Container className="pt-5 text-center">
                <h2>You must be logged in to see this content.</h2>
                <LoginSignupModal showModal={showModal} onCloseModal={handleCloseModal} />
            </Container>
        )
    } else if(isLoggedIn && reviewedBreweries.length === 0) {
        return (
            <Container className="pt-5 text-center">
                <h2>Review a brewery that you have been to!</h2>
            </Container>
        )
    } else return (
        <Container className="pt-5">
            <h2 className="text-center pb-3">Reviewed Breweries</h2>
            <Row className="breweries-row" md={4}>
                {reviewedBreweryStatus === 'loading' || reviewedBreweryStatus === 'idle' 
                    ? <Spinner animation="border" /> 
                    : reviewedBreweries.slice().sort((a,b) => sortAscending(a.name.toLowerCase(), b.name.toLowerCase())).map(b => {
                        return <Col className="breweries-col" key={b.id}>
                                    <BreweryCard breweryId={b.id} breweryName={b.name} breweryImage={b.image} />
                               </Col>
                    })}
            </Row>
        </Container>
    )
}