import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Form, Button, Modal, FormGroup, FormControl, FormLabel, Col} from 'react-bootstrap';
import PopUpModal from './PopUpModal';
import TermsAndConditions from "./TermsAndConditions";

const SignUpModal = (props) => {

    const initialFormState = {
        name: {firstname: '', lastname: ''},
        address: {address: '', postalcode: '', city: '', country: ''},
        email: '',
        password: '',
        nif: ''
    };

    const [password2, setPassword2] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nifError, setNifError] = useState();
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [validateTermsError, setValidateTermsError] = useState("");
    const [error, setError] = useState(true);
    const [firstTime, setFirstTime] = useState(false);
    const [user, setUser] = useState(initialFormState);
    const [createdUser, setCreatedUser] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

    const [termsView, setTermsView] = useState(false);

    const hideTerms = () => {
        setTermsView(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (error) return
        props.createuser(user).then(function (response) {
            if (response.status == 201) {
                setCreatedUser(response.data);
                setTitle("Created with Success");
                setDescription("Thank you for registering! Use your email to login: " + user.email);
                setUser(initialFormState)
            } else if (response.status == 400) {
                setTitle("Error");
                setDescription("This email is already registered.");
            } else {
                setTitle(response.statusText);
                setDescription("An error ocurred. Please try again later");
            }
            setShowResult(true);
        });
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const handleInputChange4Childs = (event) => {
        const {name, value} = event.target
        const jsonRoots = name.split('.');
        const root1 = jsonRoots[0]; //ex:name
        const root2 = jsonRoots[1]; //ex:lastname

        setUser({...user, [root1]: {...user[root1], [root2]: value}})
    }

    useEffect(() => {
        if (firstTime > 0) {
            validateForm();
        } else {
            setFirstTime(true);
        }
    }, [user, password2, acceptedTerms]);

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
        testError = validateTerms();
        if (testError) {
            error2 = true;
            setValidateTermsError(testError);
            testError = null;
        } else {
            setValidateTermsError("");
        }
        testError = validateNIF();
        if (testError) {
            error2 = true;
            setNifError(testError);
            testError = null;
        } else {
            setNifError("");
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
        if (user.password.length == 0) {
            return "Confirm Password";
        }
        if (user.password != password2) {
            return "Passwords don't match";
        }
        return null;
    }

    const validateTerms = () => {
        if (!acceptedTerms) {
            return "To create an account please read and accept our terms and conditions"
        }
        return null;
    }

    const validateNIF = () => {
        if (user.nif.length != 9) {
            return "NIF needs to have 9 characters"
        }
        return null;
    };

    //Solucao menos ma, apesar de ser uma m3rd*
    useEffect(() => {
        setTimeout(() => {
            setShowResult(false);
        }, 3000);
    }, [showResult]);

    return (
        <>
            {!showResult ?
                <>
                    {!termsView ?
                        <Modal
                            {...props}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            id="sign-up-id">
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Sign Up
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Row>
                                    <FormGroup as={Col} controlId="formFirstName">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            name="name.firstname"
                                            onChange={handleInputChange4Childs}
                                        />
                                    </FormGroup>
                                    <FormGroup as={Col} controlId="formLastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            name="name.lastname"
                                            onChange={handleInputChange4Childs}
                                        />
                                    </FormGroup>
                                </Form.Row>
                                <Form.Row>
                                    <FormGroup as={Col} controlId="formEmail">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl
                                            autoFocus
                                            type="email"
                                            name="email"
                                            onChange={handleInputChange}
                                            isInvalid={emailError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {emailError}
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup as={Col} controlId="formNif">
                                        <FormLabel>NIF</FormLabel>
                                        <FormControl
                                            autoFocus
                                            type="number"
                                            name="nif"
                                            onChange={handleInputChange}
                                            isInvalid={nifError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {nifError}
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </Form.Row>
                                <Form.Row>
                                    <FormGroup as={Col} controlId="formCountry">
                                        <FormLabel>Country</FormLabel>
                                        <FormControl
                                            name="address.country"
                                            onChange={handleInputChange4Childs}
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup as={Col} controlId="formCity">
                                        <FormLabel>City</FormLabel>
                                        <FormControl
                                            name="address.city"
                                            onChange={handleInputChange4Childs}
                                            type="text"
                                        />
                                    </FormGroup>
                                </Form.Row>
                                <Form.Row>
                                    <FormGroup as={Col} controlId="formAddress">
                                        <FormLabel>Address</FormLabel>
                                        <FormControl
                                            name="address.address"
                                            onChange={handleInputChange4Childs}
                                            type="text"
                                        />
                                    </FormGroup>
                                    <FormGroup as={Col} controlId="formPostalCode">
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl
                                            name="address.postalcode"
                                            onChange={handleInputChange4Childs}
                                            type="text"
                                        />
                                    </FormGroup>
                                </Form.Row>
                                <Form.Row>
                                    <FormGroup as={Col} controlId="formPassword">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl
                                            name="password"
                                            onChange={handleInputChange}
                                            type="password"
                                        />
                                    </FormGroup>
                                    <FormGroup as={Col} controlId="formPassword2">
                                        <FormLabel>Verify Password</FormLabel>
                                        <FormControl
                                            value={password2}
                                            onChange={e => setPassword2(e.target.value)}
                                            type="password"
                                            isInvalid={passwordError}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {passwordError}
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </Form.Row>
                                <Form>
                                    <Form.Check
                                        required
                                        type="switch"
                                        id="custom-switch"
                                        checked={acceptedTerms}
                                        label={<p>I agree with the <a className="text-primary" onClick={() => setTermsView(true)}>Terms and
                                            Conditions</a></p>}
                                        onChange={e => setAcceptedTerms(e.target.checked)}
                                        isInvalid={validateTermsError}
                                        feedback={validateTermsError}
                                    />
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                                <Button disabled={error} type="submit" onClick={handleSubmit}>Sign Up</Button>
                            </Modal.Footer>
                        </Modal> :
                        <TermsAndConditions
                            parent={props}
                            onHide={hideTerms}/>
                    }
                </>
                :
                <PopUpModal
                    parent={props}
                    title={title}
                    description={description}
                    onHide={props.onHide}
                />

            }
        </>
    );
}

export default SignUpModal;