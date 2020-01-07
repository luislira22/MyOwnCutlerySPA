import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Col, FormLabel, FormControl, Button, Modal } from 'react-bootstrap'

const UpdateOrderForm = props => {

    const [order, setOrder] = useState(props.order);

    const handleSubmit = event => {
        event.preventDefault()
        props.updateOrder(order, props.userToken)
        props.hideUpdate()
    }

    const handleChange = event => {
        setOrder({...order, quantity: event.target.value});
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Order Quantity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup as={Col} controlId="formPassword2">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl
                        value={order.quantity}
                        onChange={e => handleChange(e)}
                        type="text"
                        isInvalid={order.quantity == 0}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid quantity
                </Form.Control.Feedback>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={handleSubmit}>Update</Button>
            </Modal.Footer>
        </>
    )
}


export default UpdateOrderForm