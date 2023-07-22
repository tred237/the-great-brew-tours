import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/esm/Button';

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useDispatch } from "react-redux";
import { resetSession } from "./sessionSlice";

export default function LoginSignup({ onCloseModal, changeTitle }) {
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()

    const handleClick = () => {
        setIsSignup(!isSignup)
        if(!isSignup) dispatch(resetSession())
        changeTitle()
    }

    return (
        <Container>
            {isSignup ? <SignupForm onCloseModal={onCloseModal} isLogin={handleClick} /> : <LoginForm onCloseModal={onCloseModal} />}
            <Button variant="link" onClick={handleClick}>{isSignup ? 'Log In' : 'Create an Account'}</Button>
        </Container>
    )
}