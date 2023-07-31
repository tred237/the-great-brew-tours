import Modal from 'react-bootstrap/Modal';
import EditBreweryForm from '../features/brewery/EditBreweryForm';

export default function EditBreweryModal({ showModal, onCloseModal, review }) {
    return (
        <Modal style={{fontFamily: "Didot, serif"}} show={showModal} onHide={onCloseModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Brewery</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditBreweryForm onCloseModal={onCloseModal} />
            </Modal.Body>
        </Modal>
    )
}