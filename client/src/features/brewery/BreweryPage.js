import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container"

import { fetchBrewery } from "./brewerySlice";
import BreweryInformation from "./BreweryInformation";
import BreweryReviews from "../breweryReviews/BreweryReviews";

export default function BreweryPage() {
    const brewery = useSelector((state) => state.brewery.brewery);
    const dispatch = useDispatch();
    const breweryId = useParams()
    const navigate = useNavigate()
  
    useEffect(() => {
      dispatch(fetchBrewery(breweryId.id))
      .unwrap()
      .then(data => {
        if('errors' in data) navigate("/home")
      })
    }, [breweryId.id, dispatch]);

    console.log(brewery)
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
                {brewery.brewery_reviews ? brewery.brewery_reviews.map(r => <BreweryReviews key={r.id} review={r} />) : null}
            </Container>
        </Container>
    )
}