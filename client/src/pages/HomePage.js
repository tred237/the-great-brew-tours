import Container from 'react-bootstrap/Container';
import Breweries from '../features/breweries/Breweries';

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