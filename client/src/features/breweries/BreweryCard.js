import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/esm/Card';

export default function BreweryCard({ brewery_id, brewery_name }) {
    const [hover, setHover] = useState(false)
    const navigate = useNavigate()

    return (
        <Card style={{opacity: hover ? 0.8 : 1}} 
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)} 
            onClick={() => navigate(`/breweries/${brewery_id}`)}>
            <Card.Body className='text-center'>
                <Card.Text>{brewery_name}</Card.Text>
            </Card.Body>
        </Card>
    )
}