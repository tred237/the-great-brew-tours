import Modal from 'react-bootstrap/Modal';
import LoginSignup from '../features/session/LoginSignup';

export default function LoginSignupModal({ showModal, onCloseModal }) {
    return (
        <Modal show={showModal} onHide={onCloseModal} animation={false}>
            <Modal.Header closeButton>
                {/* <Modal.Title>Write a review</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <LoginSignup onCloseModal={onCloseModal} />
            </Modal.Body>
        </Modal>
    )
}