import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/esm/Spinner";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import { fetchBreweries } from "./breweriesSlice";
import BreweryCard from "./BreweryCard";
import { sortAscending } from '../../helpers/sort';

export default function Breweries() {
  const breweries = useSelector((state) => state.breweries.breweries);
  const breweryStatus = useSelector((state) => state.breweries.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if(breweryStatus === 'idle') dispatch(fetchBreweries())
  }, [dispatch, breweryStatus]);

  return (
      <Container className="breweries-container">
        <Row className="breweries-row" md={3}>
          {breweryStatus === 'loading' || breweryStatus === 'idle' ? <Spinner animation="border" /> : breweries.slice().sort((a,b) => sortAscending(a.name, b.name)).map(b => {
            return <Col className="see-all-col" key={b.id}>
                      <BreweryCard breweryId={b.id} breweryName={b.name} breweryImage={b.image} />
                  </Col>
          } )}
        </Row>
      </Container>
  );
}