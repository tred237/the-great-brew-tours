import Modal from 'react-bootstrap/Modal';
import AddReviewForm from '../features/brewery/AddReviewForm';

export default function AddReviewModal({ showModal, onCloseModal }) {
    return (
        <Modal style={{fontFamily: "Didot, serif"}} show={showModal} onHide={onCloseModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Write a review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddReviewForm onCloseModal={onCloseModal} />
            </Modal.Body>
        </Modal>
    )
}