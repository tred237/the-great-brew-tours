import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import Container from "react-bootstrap/esm/Container";
import Accordion from "react-bootstrap/Accordion";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { fetchTours } from "./toursSlice";
import { fetchScheduledTours } from "../scheduledTours/scheduledToursSlice";
import Tour from "./Tour";
import LoginSignupModal from "../../modals/LoginSignupModal";

export default function Tours() {
    const tours = useSelector(state => state.tours.tours)
    const isLoggedIn = useSelector((state) => state.session.loggedIn);
    const dispatch = useDispatch()
    const [date, setDate] = useState(dayjs(Date()))
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(fetchTours())
            .unwrap()
            .then(() => {
                console.log("Tours loaded")
                dispatch(fetchScheduledTours())
            })
            .catch(() => console.log("Tours failed"))
        }
        else handleShowModal()
    },[dispatch, isLoggedIn])

    if(!isLoggedIn) return (
        <Container>
            <h2>You must be logged in to see this content</h2>
            <LoginSignupModal showModal={showModal} onCloseModal={handleCloseModal} />
        </Container>
    )
    else return (
        <Container>
            <h2>Tours</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={date} onChange={(e) => setDate(e)} />
            </LocalizationProvider>
            <Accordion defaultActiveKey="0">
                {tours ? tours.filter(t=> dayjs(t.tour_date.split('T')[0]).format('YYYYMMDD') !== dayjs(Date()).format('YYYYMMDD') && date.format('YYYYMMDD') === dayjs(t.tour_date.split('T')[0]).format('YYYYMMDD'))
                            .map(t => <Tour key={t.id} tour={t} selectedDate={date.format('YYYYMMDD')} />) : null}
            </Accordion>
        </Container>
    )
}