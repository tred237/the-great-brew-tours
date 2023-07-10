import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweries } from "./breweriesSlice";

export default function Breweries() {
  const breweries = useSelector((state) => state.breweries.entities);
  const breweryStatus = useSelector((state) => state.breweries.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if(breweryStatus === 'idle') dispatch(fetchBreweries());
  }, [dispatch, breweryStatus]);

  return (
      <ul>
        {breweryStatus === 'loading' || breweryStatus === 'idle' ? <p>Loading...</p> : breweries.map(b => <li key={b.id}>{b.name}</li> )}
      </ul>
  );
}