import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import LoginSignup from '../features/session/LoginSignup';

export default function LoginSignupModal({ showModal, onCloseModal }) {
    const [isSignupTitle, setIsSignupTitle] = useState(false)

    const changeTitle = () => setIsSignupTitle(!isSignupTitle)

    return (
        <Modal style={{fontFamily: "Didot, serif"}} show={showModal} onHide={onCloseModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{isSignupTitle ? 'Create An Account' : 'Log In'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginSignup onCloseModal={onCloseModal} changeTitle={changeTitle} />
            </Modal.Body>
        </Modal>
    )
}