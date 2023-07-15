import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Accordion from 'react-bootstrap/Accordion';

import { fetchTours } from "./toursSlice";
import Tour from "./Tour";

export default function Tours() {
    const tours = useSelector(state => state.tours.tours)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTours())
        .unwrap()
        .then(() => console.log("Tours loaded"))
        .catch(() => console.log("Tours failed"))
    },[dispatch])

    console.log(tours)
    return(
        <Container>
            <h2>Tours</h2>
            <Accordion defaultActiveKey="0">
                {tours ? tours.map(t => <Tour key={t.id} tour={t} />) : null}
            </Accordion>
        </Container>
    )
}