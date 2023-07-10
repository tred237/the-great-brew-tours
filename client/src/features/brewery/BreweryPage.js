import { useState, useEffect } from "react"
import { useParams, Redirect } from "react-router-dom";
import Container from "react-bootstrap/esm/Container"
import BreweryInformation from "./BreweryInformation";

export default function BreweryPage() {
    const [brewery, setBrewery] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const breweryId = useParams()

    useEffect(() => {
        fetch(`/breweries/${breweryId.id}`)
        .then(r => {
            if(r.ok) r.json().then(b => setBrewery(b))
            else r.json().then(err => setErrorMessage(err.errors[0]))
        })
    },[breweryId])

    if(errorMessage) return <Redirect to="/home" />
    return (
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