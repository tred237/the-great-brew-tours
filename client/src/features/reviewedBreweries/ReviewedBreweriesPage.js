import { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";

import { fetchReviewedBreweries } from "./reviewedBreweriesSlice";
import BreweryCard from "../breweries/BreweryCard";

export default function ReviewedBreweries() {
    const userId = useSelector((state) => state.session.id)
    const reviewedBreweries = useSelector((state) => state.reviewedBreweries.reviewedBreweries);
    const reviewedBreweryStatus = useSelector((state) => state.reviewedBreweries.status);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchReviewedBreweries())
    },[dispatch])

    return (
        <Container>
            {reviewedBreweryStatus === 'loading' || reviewedBreweryStatus === 'idle' ? <p>Loading...</p> : reviewedBreweries.map(b => <BreweryCard key={b.id} brewery_id={b.id} brewery_name={b.name} /> )}
        </Container>
    )
}