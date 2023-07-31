import Modal from 'react-bootstrap/Modal';
import EditReviewForm from '../features/brewery/EditReviewForm';

export default function EditReviewModal({ showModal, onCloseModal, review }) {
    return (
        <Modal style={{fontFamily: "Didot, serif"}} show={showModal} onHide={onCloseModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit your review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditReviewForm onCloseModal={onCloseModal} review={review} />
            </Modal.Body>
        </Modal>
    )
}