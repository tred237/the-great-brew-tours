import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { useSelector } from "react-redux";

import EditBreweryModal from "../../modals/EditBreweryModal";

export default function BreweryInformation({ name, website, address, city, postal_code }) {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)


    return (
        <>
            <ListGroup className="w-50">
                <ListGroup.Item>{`Name: ${name}`}</ListGroup.Item>
                <ListGroup.Item>Website: {<a href={website}>{website}</a>}</ListGroup.Item>
                <ListGroup.Item>Address: {address}</ListGroup.Item>
                <ListGroup.Item>{`City: ${city}`}</ListGroup.Item>
                <ListGroup.Item>{`Postal Code: ${postal_code}`}</ListGroup.Item>
                {user && user.is_admin ? 
                    <ListGroup.Item> 
                        <Button onClick={handleShowModal}>Edit</Button>
                    </ListGroup.Item>
                    : null
                }
            </ListGroup>
            <EditBreweryModal showModal={showModal} onCloseModal={handleCloseModal} />
        </>
    )
}