import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/esm/InputGroup';

import { fetchLogin } from "./sessionSlice";
import { submitButtonStyle } from "../../helpers/customStyles";

export default function LoginForm({ onCloseModal }) {
    const formDataDefault = {
        user: '',
        password: '', 
    }
    const loginErrors = useSelector((state) => state.session.loginErrors);
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(formDataDefault)
    const [showPassword, setShowPassword] = useState(false)
    const [hover, setHover] = useState(false)

    const handleTogglePassword = () => setShowPassword(!showPassword)

    const handleChange = (e) => setFormData({...formData, [e.target.name]:e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchLogin({...formData}))
        .unwrap()
        .then(() => onCloseModal())
        .catch(() => console.log('woops'))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email Address or Username *</Form.Label>
                <Form.Control required
                            placeholder="Enter email address or username" 
                            name="user" 
                            value={formData.user}
                            onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label className="pt-1">Password *</Form.Label>
                <InputGroup className="pb-2">
                    <Form.Control required 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange}/>
                    <Button style={submitButtonStyle(showPassword)} onMouseUp={handleTogglePassword} onMouseDown={handleTogglePassword}>Show Password</Button>
                </InputGroup>
            </Form.Group>
            {loginErrors ? loginErrors.map(e => <p className="error-message" key={e}>{e}</p>) : null}
            <Button style={submitButtonStyle(hover)} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} type="submit">Log in</Button>
        </Form>
    )
}
