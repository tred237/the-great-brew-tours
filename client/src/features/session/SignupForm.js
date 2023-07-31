import { useState } from "react";
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/esm/InputGroup';

import { submitButtonStyle } from "../../helpers/customStyles";

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
    const [hover, setHover] = useState(false)

    const handleTogglePassword = () => setShowPassword(!showPassword)

    const handleChange = (e) => setFormData({...formData, [e.target.name]:e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
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
            <Form.Group className="pb-1">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control required 
                            placeholder="Enter email address" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange} />
                {signupErrors && signupErrors.email ? signupErrors.email.map(e => <p className="error-message" key={e}>{`Email ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group className="pb-1">
                <Form.Label>Username *</Form.Label>
                <Form.Control required 
                            placeholder="Enter username" 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange} />
                {signupErrors && signupErrors.username ? signupErrors.username.map(e => <p className="error-message" key={e}>{`Username ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group className="pb-1">
                <Form.Label>Birth Date*</Form.Label>
                <Form.Control required 
                            type="date"
                            name='birthDate'
                            value={formData.birthDate}
                            onChange={handleChange} />
                {signupErrors && signupErrors.user_age ? signupErrors.user_age.map(e => <p className="error-message" key={e}>{`Age ${e}`}</p>) : null}
            </Form.Group>
            <Form.Group className="pb-1">
                <Form.Label>Password *</Form.Label>
                <InputGroup>
                    <Form.Control required 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange}/>
                    <Button style={submitButtonStyle(showPassword)} onMouseUp={handleTogglePassword} onMouseDown={handleTogglePassword}>Show Password</Button>
                </InputGroup>
                {signupErrors && signupErrors.password ? signupErrors.password.map(e => <p className="error-message" key={e}>{`Password ${e}`}</p>) : null}
                <Form.Text className="text-muted pb-1">
                        Passwords must contain between 6 and 20 characters<br/>
                        Passwords must contain at least one uppercase letter, one lowercase letter, and one number<br/>
                        Passwords must contain at least one of the following symbols: !@#$%^&*()_+
                </Form.Text>
            </Form.Group>
            <Form.Group className="pb-2">
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control required 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password" 
                            name="passwordConfirmation" 
                            value={formData.passwordConfirmation}
                            onChange={handleChange}/>
                {signupErrors && signupErrors.password_confirmation ? signupErrors.password_confirmation.map(e => <p className="error-message" key={e}>{`Confirmed Password ${e}`}</p>) : null}
            </Form.Group>
            <Button style={submitButtonStyle(hover)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} type="submit">Create Account</Button>
        </Form>
    )
}