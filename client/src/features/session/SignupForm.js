import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/esm/InputGroup';

export default function SignupForm({ isLogin }) {
    const formDataDefault = {
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        birthDate: '',
    }
    const [formData, setFormData] = useState(formDataDefault)
    const [signupErrors, setSignupErrors] = useState([])
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () => setShowPassword(!showPassword)

    const handleChange = (e) => setFormData({...formData, [e.target.name]:e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                username: formData.username,
                password: formData.password,
                password_confirmation: formData.passwordConfirmation,
                birth_date: formData.birthDate,
            })
        })
        const data = await response.json()
        if(response.ok) isLogin()
        else setSignupErrors(data.errors) 
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email Address *</Form.Label>
                <Form.Control placeholder="Enter email address" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Username *</Form.Label>
                <Form.Control placeholder="Enter username" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Birth Date*</Form.Label>
                <Form.Control type="date"
                            name='birthDate'
                            value={formData.birthDate}
                            onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password *</Form.Label>
                <InputGroup>
                    <Form.Control type={showPassword ? "text" : "password"}
                                placeholder="Enter password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange}/>
                    <Button onMouseUp={handleTogglePassword} onMouseDown={handleTogglePassword}>Show Password</Button>
                </InputGroup>
                <Form.Text className="text-muted">
                        Passwords must contain between 6 and 20 characters<br/>
                        Passwords must contain at least one uppercase letter, one lowercase letter, and one number<br/>
                        Passwords must contain at least one of the following symbols: !@#$%^&*()_+
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control type={showPassword ? "text" : "password"}
                            placeholder="Enter password" 
                            name="passwordConfirmation" 
                            value={formData.passwordConfirmation}
                            onChange={handleChange}/>
            </Form.Group>
            <Container>
                {signupErrors ? signupErrors.map(e => <p key={e}>{e}</p>) : null}
            </Container>
            <Button variant="success" type="submit">Create Account</Button>
        </Form>
    )
}