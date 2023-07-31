import { useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Stack from 'react-bootstrap/esm/Stack';

import BreweryCard from "./BreweryCard";
import CityCarousel from "./CityCarousel";
import { sortAscending } from '../../helpers/sort';

export default function Breweries() {
  const breweries = useSelector((state) => state.breweries.breweries);

  return (
      <Container className="breweries-container">
        <Container className="pb-4">
          <Stack direction="horizontal" gap={3}>
            {[...new Set(breweries.map(b => b.city.toLowerCase()).sort())].map(c => <CityCarousel key={c} city={c} />)}
          </Stack>
        </Container>
        <Container>
          <hr />
          <h3 className="text-center pt-2 pb-3">Take a look at our catalog!</h3>
          <Row className="breweries-row" md={4}>
            {breweries.slice().sort((a,b) => sortAscending(a.name.toLowerCase(), b.name.toLowerCase())).map(b => {
              return <Col className="breweries-col" key={b.id}>
                        <BreweryCard breweryId={b.id} breweryName={b.name} breweryImage={b.image} />
                    </Col>
            })}
          </Row>
        </Container>
      </Container>
  );
}