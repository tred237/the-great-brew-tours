import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/esm/Button';

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function LoginSignup({ onCloseModal }) {
    const [isSignup, setIsSignup] = useState(false)

    const handleClick = () => setIsSignup(!isSignup)

    return (
        <Container>
            <h3>{isSignup ? 'Create Account' : 'Login'}</h3>
            {isSignup ? <SignupForm onCloseModal={onCloseModal} isLogin={handleClick} /> : <LoginForm onCloseModal={onCloseModal} />}
            <Button variant="link" onClick={handleClick}>{isSignup ? 'Log In' : 'Create an Account'}</Button>
        </Container>
    )
}