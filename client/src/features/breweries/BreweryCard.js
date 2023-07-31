import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/esm/Card';

import gbtlogo2 from "../../assets/gbtlogo2.png";
import Container from "react-bootstrap/esm/Container";

export default function BreweryCard({ breweryId, breweryName, breweryImage, isCarousel = false }) {
    const [hover, setHover] = useState(false)
    const navigate = useNavigate()

    return (
        <Card className={isCarousel ? 'carousel-card-sizing' : 'card-sizing'}
            style={{opacity: hover ? 0.8 : 1}} 
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)} 
            onClick={() => navigate(`/breweries/${breweryId}`)}>
            <Card.Img className={isCarousel ? "carousel-brewery-image" : "brewery-image"} variant="top" src={breweryImage} alt={breweryName} onError={(e) => e.target.src = gbtlogo2}/>
            <Container className="text-center">
                <Card.Body className={isCarousel ? "carousel-brewery-card-body" : "brewery-card-body"}>
                    <Card.Text>{breweryName}</Card.Text>
                </Card.Body>
            </Container>
        </Card>
    )
}