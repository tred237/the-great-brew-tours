import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";

import { fetchBreweries } from "./breweriesSlice";
import BreweryCard from "./BreweryCard";

export default function Breweries() {
  const breweries = useSelector((state) => state.breweries.entities);
  const breweryStatus = useSelector((state) => state.breweries.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if(breweryStatus === 'idle') dispatch(fetchBreweries());
  }, [dispatch, breweryStatus]);

  return (
      <Container>
        {breweryStatus === 'loading' || breweryStatus === 'idle' ? <p>Loading...</p> : breweries.map(b => <BreweryCard key={b.id} brewery_id={b.id} brewery_name={b.name} /> )}
      </Container>
  );
}