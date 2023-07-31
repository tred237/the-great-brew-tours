import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/esm/Carousel';

import BreweryCard from "./BreweryCard";
import { sortAscending } from '../../helpers/sort';
import Container from 'react-bootstrap/esm/Container';

export default function CityCarousel({ city }) {
    const breweries = useSelector((state) => state.breweries.breweries);

    return (
        <Container>
            <h3 className="text-center">{city.split(' ').map(w => {
                    const splitWord = w.split('')
                    splitWord[0] = splitWord[0].toUpperCase()
                    return splitWord.join('')
                }).join(' ')}
            </h3>
            <Carousel className="carousel-outer">
                {breweries.filter(b => b.city.toLowerCase() === city).sort((a,b) => sortAscending(a.name, b.name)).map(b => {
                    return <Carousel.Item key={b.id}>
                            <BreweryCard breweryId={b.id} breweryName={b.name} breweryImage={b.image} isCarousel={true} />
                        </Carousel.Item>
                })}
            </Carousel>
        </Container>
    )
}