import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from 'react-bootstrap/esm/Container';
import Spinner from "react-bootstrap/esm/Spinner";

import { fetchBreweries } from "./breweriesSlice";
import Breweries from './Breweries';
import gbtlogo2 from "../../assets/gbtlogo2.png";

export default function Home() {
    const breweryStatus = useSelector((state) => state.breweries.status);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if(breweryStatus === 'idle') dispatch(fetchBreweries())
    }, [dispatch, breweryStatus]);

    return (
        <Container className='w-100 pt-3'>
            <Container className="text-center">
                <img src={gbtlogo2} alt="GBT Logo" width="500" height="250"/>
            </Container>
            <Container>
                {breweryStatus === 'loading' || breweryStatus === 'idle' ? <Spinner animation="border" /> : <Breweries />}
            </Container>
        </Container>
    )

}