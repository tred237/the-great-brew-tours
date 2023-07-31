import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { useDispatch, useSelector } from "react-redux";

import EditBreweryModal from "../../modals/EditBreweryModal";
import { submitButtonStyle } from "../../helpers/customStyles";
import { clearBreweryEditErrors } from "./brewerySlice";

export default function BreweryInformation({ name, website, address, city, postal_code }) {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false)
    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => {
        setShowModal(false)
        dispatch(clearBreweryEditErrors())
    }

    return (
        <>
            <ListGroup className="w-50">
                <ListGroup.Item>{`Name: ${name}`}</ListGroup.Item>
                {/* eslint-disable-next-line */}
                <ListGroup.Item>Website: {<a href={website} target="_blank">{website}</a>}</ListGroup.Item>
                <ListGroup.Item>Address: {address}</ListGroup.Item>
                <ListGroup.Item>{`City: ${city}`}</ListGroup.Item>
                <ListGroup.Item>{`Postal Code: ${postal_code}`}</ListGroup.Item>
                {user && user.is_admin ? 
                    <ListGroup.Item> 
                        <Button style={submitButtonStyle(hover)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={handleShowModal}>Edit</Button>
                    </ListGroup.Item>
                    : null
                }
            </ListGroup>
            <EditBreweryModal showModal={showModal} onCloseModal={handleCloseModal} />
        </>
    )
}