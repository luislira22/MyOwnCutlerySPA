import React, { useState} from 'react'
import {Form } from 'react-bootstrap'

const UpdateProductionLineForm = props => {
    const [allMachines] = useState(props.allMachines)
    const [productionLine,setProductionLine] = useState(props.productionLine)

    const handleCheckChange = event => {
        const operationId = event.target.id;
        let newMachines = productionLine.machines;
        if (newMachines.includes(operationId)) {
            const index = newMachines.indexOf(operationId)
            newMachines.splice(index, 1)
        }
        else {
            newMachines.push(operationId)
        }
        let newProductionLine = {id: productionLine.id, machines: productionLine.machines}
        setProductionLine(newProductionLine)
    }

    const handleSubmit = event => {
        event.preventDefault()
        //do nothing if 0 machines are selected
        if (productionLine.machines.length === 0) return
        //update
        props.productionLine.machines = productionLine.machines
        props.updateProductionLine(productionLine, props.userToken)
        //reset form
        document.getElementById("updateForm").reset()
        props.hideUpdate()
    }

    return (
        <>
            <h3>Update Machines</h3>
            <hr />
            <form id="updateForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="col-md-6">
                        <label for="inputState">Machines</label>
                        {allMachines.map(op => (
                            <Form>
                                <div className="mb-3">
                                    <Form.Check
                                        onChange={handleCheckChange}
                                        custom
                                        inline
                                        label={op.description + " - " + op.tool}
                                        type='checkbox'
                                        id={op.id}
                                        defaultChecked={productionLine.machines.includes(op.id) ? true : false}
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


export default UpdateProductionLineForm