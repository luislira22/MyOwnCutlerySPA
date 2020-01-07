import React, { useState} from 'react'
import {Form } from 'react-bootstrap'

const UpdateMachineTypeForm = props => {
    const [allOperations] = useState(props.allOperations)
    const [machineType,setMachineType] = useState(props.machineType)

    const handleCheckChange = event => {
        const operationId = event.target.id;
        let newOperations = machineType.operations;
        if (newOperations.includes(operationId)) {
            const index = newOperations.indexOf(operationId)
            newOperations.splice(index, 1)
        }
        else {
            newOperations.push(operationId)
        }
        let newMachineType = {id: machineType.id, operations: machineType.operations}
        setMachineType(newMachineType)
    }

    const handleSubmit = event => {
        event.preventDefault()
        //do nothing if 0 operations are selected
        if (machineType.operations.length === 0) return
        //update
        props.machineType.operations = machineType.operations
        props.updateMachineType(machineType, props.userToken)
        //reset form
        document.getElementById("updateForm").reset()
        props.hideUpdate()
    }

    return (
        <>
            <h3>Update oprations</h3>
            <hr />
            <form id="updateForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="col-md-6">
                        <label for="inputState">Operations</label>
                        {allOperations.map(op => (
                            <Form>
                                <div className="mb-3">
                                    <Form.Check
                                        onChange={handleCheckChange}
                                        custom
                                        inline
                                        label={op.description + " - " + op.tool}
                                        type='checkbox'
                                        id={op.id}
                                        defaultChecked={machineType.operations.includes(op.id) ? true : false}
                                    />
                                </div>
                            </Form>))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </>
    )
}


export default UpdateMachineTypeForm