import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/esm/Card';

export default function BreweryCard({ breweryId, breweryName, breweryImage }) {
    const [hover, setHover] = useState(false)
    const navigate = useNavigate()

    return (
        <Card style={{opacity: hover ? 0.8 : 1}} 
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)} 
            onClick={() => navigate(`/breweries/${breweryId}`)}>
            <Card.Img className='brewery-image' variant="top" src={breweryImage} alt={breweryName} />
            {/* onError={(e) => e.target.src = gbtlogo} /> */}
            <Card.Body className='text-center'>
                <Card.Text>{breweryName}</Card.Text>
            </Card.Body>
        </Card>
    )
}