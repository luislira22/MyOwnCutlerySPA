import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const CreateProductionLineForm = props => {
    const initialFormState = { description: '', machines: [] }
    const [productionLine, setProductionLine] = useState(initialFormState)
    const [machines, setMachines] = useState([])

    const handleInputChange = event => {
        const { name, value } = event.target
        setProductionLine({ ...productionLine, [name]: value })
    }

    const handleCheckChange = event => {
        const machineId = event.target.id;
        let newMachines = machines;
        if (newMachines.includes(machineId)) {
            const index = newMachines.indexOf(machineId)
            newMachines.splice(index, 1)
        }
        else {
            newMachines.push(machineId)
        }
        setMachines(newMachines);
        setProductionLine({ ...productionLine, machines: newMachines })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!productionLine.description || productionLine.machines.length == 0) {
            console.log("Can't be empty");
            return
        }
        props.createProductionLine(productionLine, props.userToken)
        setProductionLine(initialFormState)
        document.getElementById("createForm").reset()
        props.hideCreate()
    }

    function inUseMachines(m) {
        var found;
        props.productionLines.forEach(prodLine => {
            if (prodLine.machines.includes(m.id)) {
                found = prodLine.description;
            }
        });
        if (found) {
            return "(Already in use by " + found + ")";
        } else {
            return "";
        }
    }

    return (
        <>
            <h3>Create</h3>
            <hr />
            <form id="createForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="type">Production Line</label>
                        <input type="text" className="form-control" name="description" onChange={handleInputChange} required />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputState">Machines</label>
                        {props.machines.map(m => (
                            <Form>
                                <div className="mb-3">
                                    <Form.Check
                                        onChange={handleCheckChange}
                                        custom
                                        inline
                                        label={m.machineBrand + " - " + m.machineModel + " " + inUseMachines(m)}
                                        type='checkbox'
                                        id={m.id}
                                    />
                                </div>
                            </Form>))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </>
    )
}

export default CreateProductionLineForm