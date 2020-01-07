import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Modal, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import PopUpModal from './PopUpModal';

const LogInModal = (props) => {

    const initialFormState = {
        email: '',
        password: ''
    }
    const [user, setUser] = useState(initialFormState);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState(false);
    const [firstTime, setFirstTime] = useState(false);
    const emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (error) return
        try {
            props.login(user).then(function (response) {
                console.log(response)
                if (response.data.success) {
                    props.userLogIn(response.data);
                    props.onHide()
                }else{
                    if(response.data.message.includes("email")){
                        setEmailError(response.data.message)
                    }else{
                        setPasswordError(response.data.message)
                    }
                }
            });
        } catch (error) {
            setEmailError(error)
        }
    }

    useEffect(() => {
        if (firstTime > 0) {
            validateForm();
        } else {
            setFirstTime(true);
        }
    }, [user]);

    const validateForm = () => {
        var error2 = false;
        var testError = null;
        testError = validateEmail();
        if (testError) {
            error2 = true;
            setEmailError(testError);
            testError = null;
        } else {
            setEmailError("");
        }
        testError = validatePasswords();
        if (testError) {
            error2 = true;
            setPasswordError(testError);
            testError = null;
        } else {
            setPasswordError("");
        }
        setError(error2);
    }

    const validateEmail = () => {
        if (user.email.length == 0) {
            return "Email can't be empty"
        }
        if (!emailRegularExpression.test(user.email)) {
            return "Insert a Valid Email Address (example@example.com)";
        }
        return null;

    }

    const validatePasswords = () => {
        if (user.password.length == 0) {
            return "Password can't be empty";
        }
        return null;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    return (

        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Log In
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formEmail">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            name="email"
                            type="email"
                            onChange={handleInputChange}
                            isInvalid={emailError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {emailError}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup controlId="formPassword">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            name="password"
                            onChange={handleInputChange}
                            type="password"
                            isInvalid={passwordError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {passwordError}
                        </Form.Control.Feedback>
                    </FormGroup>
                    <Form>
                        <Form.Check
                            type="switch"
                            label="Remember Me"
                            id="remember-me"
                            checked={props.rememberMe}
                            onChange={e => props.setRememberMe(e.target.checked)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button disabled={error} onClick={handleSubmit} type="submit">Log In</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LogInModal;