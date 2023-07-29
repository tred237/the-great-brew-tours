import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/esm/Spinner";

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
      <Container>
        {breweryStatus === 'loading' || breweryStatus === 'idle' ? <Spinner animation="border" /> : breweries.slice().sort((a,b) => sortAscending(a.name, b.name)).map(b => <BreweryCard key={b.id} brewery_id={b.id} brewery_name={b.name} /> )}
      </Container>
  );
}