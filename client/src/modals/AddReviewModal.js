import Modal from 'react-bootstrap/Modal';
import AddReviewForm from '../features/breweryReviews/AddReviewForm';

export default function AddReviewModal({ showModal, onCloseModal }) {
    return (
        <Modal show={showModal} onHide={onCloseModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Write a review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddReviewForm onCloseModal={onCloseModal} />
            </Modal.Body>
        </Modal>
    )
}