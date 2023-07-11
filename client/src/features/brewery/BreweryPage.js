import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container"

import { fetchBrewery } from "./brewerySlice";
import BreweryInformation from "./BreweryInformation";

export default function BreweryPage() {
    const brewery = useSelector((state) => state.brewery.entities);
    const dispatch = useDispatch();
    const breweryId = useParams()
    const navigate = useNavigate()
  
    useEffect(() => {
      dispatch(fetchBrewery(breweryId.id));
    }, [breweryId.id, dispatch]);

    if (brewery.errors) return navigate("/home")
    else return (
        <Container>
            <Container className='d-flex justify-content-center'>
                <BreweryInformation name={brewery.name}
                                    website={brewery.website}
                                    address={brewery.address}
                                    city={brewery.city}
                                    postal_code={brewery.postal_code} />
            </Container>
        </Container>
    )
}