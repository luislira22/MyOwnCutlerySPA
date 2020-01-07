import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Modal, FormGroup, FormControl, FormLabel, Col } from 'react-bootstrap';
import PopUpModal from './PopUpModal';

const EditAccountModal = (props) => {

    const [user, setUser] = useState();
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = () =>{
        setShowResult(false);
        props.onHide();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (error) return
        props.updateClient(user).then(function (response) {
            if (response.status == 200) {
                setTitle("Success");
                setDescription("User updated with Success");
                setUser(user)
                //props.onHide(event);
                setShowResult(true);
            } else {
                setTitle(response.statusText);
                setDescription("An error ocurred. Please try again later");
                setShowResult(true);
            }
        });
    }

    useEffect(() => {
        setUser(props.user);
        setIsLoading(false);
    }, [props.user])


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    const handleInputChange4Childs = (event) => {
        const { name, value } = event.target
        const jsonRoots = name.split('.');
        const root1 = jsonRoots[0]; //ex:name
        const root2 = jsonRoots[1]; //ex:lastname

        setUser({ ...user, [root1]: { ...user[root1], [root2]: value } })
    }

    return (
        <>
            {!isLoading ?
                <>
                    {!showResult ?
                        <>
                            <Modal
                                {...props}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Account
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
                                                value={user ? user.name.firstname : ""}
                                                disabled={props.cannotUpdate}
                                            />
                                        </FormGroup>
                                        <FormGroup as={Col} controlId="formLastName">
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl
                                                autoFocus
                                                type="text"
                                                name="name.lastname"
                                                onChange={handleInputChange4Childs}
                                                value={user ? user.name.lastname : ""}
                                                disabled={props.cannotUpdate}
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
                                                value={user ? user.email : ""}
                                                disabled
                                            />
                                        </FormGroup>
                                        <FormGroup as={Col} controlId="formNif">
                                            <FormLabel>NIF</FormLabel>
                                            <FormControl
                                                autoFocus
                                                type="number"
                                                name="nif"
                                                value={user ? user.nif : ""}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <FormGroup as={Col} controlId="formCountry">
                                            <FormLabel>Country</FormLabel>
                                            <FormControl
                                                name="address.country"
                                                value={user.address ? user.address.country : ""}
                                                onChange={handleInputChange4Childs}
                                                type="text"
                                                disabled={props.cannotUpdate}
                                            />
                                        </FormGroup>
                                        <FormGroup as={Col} controlId="formCity">
                                            <FormLabel>City</FormLabel>
                                            <FormControl
                                                name="address.city"
                                                value={user.address ? user.address.city : ""}
                                                onChange={handleInputChange4Childs}
                                                type="text"
                                                disabled={props.cannotUpdate}
                                            />
                                        </FormGroup>
                                    </Form.Row>
                                    <Form.Row>
                                        <FormGroup as={Col} controlId="formAddress">
                                            <FormLabel>Address</FormLabel>
                                            <FormControl
                                                value={user.address ? user.address.address : ""}
                                                name="address.address"
                                                onChange={handleInputChange4Childs}
                                                type="text"
                                                disabled={props.cannotUpdate}
                                            />
                                        </FormGroup>
                                        <FormGroup as={Col} controlId="formPostalCode">
                                            <FormLabel>Postal Code</FormLabel>
                                            <FormControl
                                                value={user.address ? user.address.postalcode : ""}
                                                name="address.postalcode"
                                                onChange={handleInputChange4Childs}
                                                type="text"
                                                disabled={props.cannotUpdate}
                                            />
                                        </FormGroup>
                                    </Form.Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                                    <Button disabled={error || props.cannotUpdate} onClick={handleSubmit} type="submit">Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                        :
                        <>
                            <PopUpModal
                                parent={props}
                                title={title}
                                description={description}
                                onHide={handleClose}
                            />
                        </>
                    }
                </>
                : <></>}
        </>
    );
}

export default EditAccountModal;