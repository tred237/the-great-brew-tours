import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import Container from "react-bootstrap/esm/Container";
import Accordion from "react-bootstrap/Accordion";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Spinner from 'react-bootstrap/Spinner';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { fetchTours } from "./toursSlice";
import Tour from "./Tour";
import LoginSignupModal from "../../modals/LoginSignupModal";
import { sortAscending } from "../../helpers/sort";

export default function Tours() {
    const tours = useSelector(state => state.tours.tours)
    const toursStatus = useSelector(state => state.tours.status)
    const isLoggedIn = useSelector((state) => state.session.loggedIn);
    const dispatch = useDispatch()
    const [date, setDate] = useState(dayjs(Date()))
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(fetchTours(date.format('YYYY/MM/DD')))
            .unwrap()
            .then(() => console.log("Tours loaded"))
            .catch(() => console.log("Tours failed"))
        }
        else handleShowModal()
    },[dispatch, isLoggedIn, date])

    if(!isLoggedIn) return (
        <Container className="pt-5 text-center">
            <h2>You must be logged in to see this content</h2>
            <LoginSignupModal showModal={showModal} onCloseModal={handleCloseModal} />
        </Container>
    )
    else return (
        <Container className="pt-5">
            <h2 className="text-center pb-3">Tours</h2>
            <Row className="tours-container">
                <Col>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={date} onChange={(e) => setDate(e)} />
                    </LocalizationProvider>
                </Col>
                <Col sm={7}>
                    {toursStatus === 'loading' ? <Spinner animation="border" /> :
                        <Accordion className="tour-accordion" defaultActiveKey="0">
                            {tours ? tours.filter(t=> dayjs(t.tour_date.split('T')[0]).format('YYYYMMDD') !== dayjs(Date()).format('YYYYMMDD') && date.format('YYYYMMDD') === dayjs(t.tour_date.split('T')[0]).format('YYYYMMDD'))
                                        .slice().sort((a,b) => sortAscending(a.tour_date, b.tour_date))
                                        .map(t => <Tour key={t.id} tour={t} selectedDate={date.format('YYYYMMDD')} />) : null}
                        </Accordion>}
                </Col>
            </Row>
        </Container>
    )
}