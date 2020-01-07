import React from 'react';
import { Form, Modal, FormLabel } from 'react-bootstrap';

const PopUpModal = (props) => {

    return (
        <Modal
            {...props.parent}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormLabel>{props.description}</FormLabel>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default PopUpModal;