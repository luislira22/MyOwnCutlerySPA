import React, { useState, useEffect } from 'react'

const CreateProductForm = props => {
    const initialFormState = { ref: '', plan: { operations: [] } }
    const [product, setProduct] = useState(initialFormState)
    const [manufacturingPlan, setManufacturingPlan] = useState([])

    useEffect(() => {
        setProduct({ ...product, plan: { operations: manufacturingPlan } })
    }, [manufacturingPlan])

    const handleInputChange = event => {
        const { name, value } = event.target
        setProduct({ ...product, [name]: value })
    }

    const handleAddToPlan = event => {
        const operationId = event.target.form[1].value
        const operation = props.operations.find(element => element.id === operationId);
        setManufacturingPlan([...manufacturingPlan, operation])
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (product.ref.length === 0 || product.plan.operations.length === 0) return
        props.createProduct(product, props.userToken)
        setProduct(initialFormState)
        document.getElementById("createForm").reset()
        setManufacturingPlan([])
        props.hideCreate()
    }

    return (
        <>
            <h3>Create</h3>
            <hr />
            <form id="createForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label>Reference</label>
                        <input type="text" className="form-control" name="ref" onChange={handleInputChange} required />
                        <br />
                        <label>Operations</label>
                        <select id="inputState" className="form-control" name="machinetype">
                            <option selected disabled>Choose...</option>
                            {props.operations.map(operation => (
                                <option key={operation.id} value={operation.id}>{operation.description} - {operation.tool} - {operation.duration}</option>
                            ))}
                        </select>
                        <br />
                        <button type="button" className="btn btn-outline-primary" onClick={handleAddToPlan}>add</button>
                    </div>

                    <div className="form-group col-md-7">
                        <PlanList manufacturingPlan={manufacturingPlan} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form >
        </>
    )
}

const PlanList = props => {

    return (
        <>
            <h5>Manufacturing Plan</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Tool</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {props.manufacturingPlan.map(operation => (
                        <tr>
                            <td>{operation.description}</td>
                            <td>{operation.tool}</td>
                            <td>{operation.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default CreateProductForm