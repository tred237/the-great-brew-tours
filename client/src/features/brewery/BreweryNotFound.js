import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

export default function BreweryNotFound() {
    const navigate = useNavigate()

    return (
        <Container>
            <h2>Uh Oh! We couldn't find that brewery</h2>
            <Button onClick={() => navigate("/home")}>Go Home</Button>
        </Container>
    )
}