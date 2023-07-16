import Container from 'react-bootstrap/esm/Container';
import Breweries from './breweries/Breweries';

export default function Home() {
    return (
        <Container>
            <h1>Experience the Great Brew Tours</h1>
            <Container>
                <Breweries />
            </Container>
        </Container>
    )

}