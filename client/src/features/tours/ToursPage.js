import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import Container from "react-bootstrap/esm/Container";
import Accordion from "react-bootstrap/Accordion";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { fetchTours } from "./toursSlice";
import Tour from "./Tour";

export default function Tours() {
    const tours = useSelector(state => state.tours.tours)
    const dispatch = useDispatch()
    const [date, setDate] = useState(dayjs(Date()))

    useEffect(() => {
        dispatch(fetchTours())
        .unwrap()
        .then(() => console.log("Tours loaded"))
        .catch(() => console.log("Tours failed"))
    },[dispatch])

    return(
        <Container>
            <h2>Tours</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={date} onChange={(e) => setDate(e)} />
            </LocalizationProvider>
            <Accordion defaultActiveKey="0">
                {tours ? tours.map(t => {
                    if(dayjs(t.tour_date).format('YYYYMMDD') !== dayjs(Date()).format('YYYYMMDD') && date.format('YYYYMMDD') === dayjs(t.tour_date).format('YYYYMMDD')) return <Tour key={t.id} tour={t} />
                }) : null}
            </Accordion>
        </Container>
    )
}