import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/esm/InputGroup';

import { fetchLogin } from "./sessionSlice";

export default function LoginPage() {
    const formDataDefault = {
        user: '',
        password: ''
    }
    const loginError = useSelector((state) => state.session.loginErrors);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formData, setFormData] = useState(formDataDefault)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchLogin({...formData}))
        .unwrap()
        .then(data => {
            if(!('errors' in data)) navigate('/home')
        })
    }

    // console.log(loginError)
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email Address or Username</Form.Label>
                    <Form.Control placeholder="Enter email address or username" 
                                name="user" 
                                value={formData.user}
                                onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control type="password"
                                    placeholder="Enter password" 
                                    name="password" 
                                    value={formData.password}
                                    onChange={handleChange}/>
                        <Button variant="outline-success">Show Password</Button>
                    </InputGroup>
                </Form.Group>
                <Container>
                    {loginError ? <p>{loginError.errors[0]}</p> : null}
                </Container>
                <Button variant="success" type="submit">Log in</Button>
            </Form>
        </Container>
    )
}