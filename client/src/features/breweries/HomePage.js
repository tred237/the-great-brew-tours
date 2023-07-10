import Container from 'react-bootstrap/esm/Container';
import Breweries from './Breweries';

export default function HomePage() {
    return (
        <Container>
            <h1>Experience the Great Brew Tours</h1>
            <Container>
                <Breweries />
            </Container>
        </Container>
    )

}