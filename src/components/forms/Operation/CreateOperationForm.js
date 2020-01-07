import React, { useState } from 'react'

const CreateOperationForm = props => {
    const initialFormState = { description: '',tool: '', execTime: '',setupTime: '' }
    const [operation, setOperation] = useState(initialFormState)
    const [execTime, setExecTime] = useState({})
    const [setupTime, setSetupTime] = useState({})

    const handleInputChange = event => {
        const { name, value } = event.target
        setOperation({ ...operation, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        props.createOperation({...operation,["setupTime"] : setupTime,["execTime"]: execTime}, props.userToken)
        setOperation(initialFormState)
        document.getElementById("createForm").reset()
        props.hideCreate()
    }

    const handleInputChangeExecTime = event => {
        const { name, value } = event.target
        setExecTime({ ...execTime, [name]: value })
    }

    const handleInputChangeSetupTime = event => {
        const { name, value } = event.target
        setSetupTime({ ...setupTime, [name]: value })
    }

    return (
        <>
            <h3>Create</h3>
            <hr />
            <form id="createForm" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-6">
                        <div>
                            <label for="inputDescription">Description</label>
                            <input class="form-control" type="text" name="description" onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="form-group col-6">
                        <div>
                            <label for="inputTool">Tool</label>
                            <input class="form-control" name="tool" type="text" onChange={handleInputChange} required />
                        </div>
                    </div>
                </div>
                <label for="inputExecTime">Execution Time</label>
                <div class="form-row">
                    <div className="form-group col-2">
                        <div>
                            <input type="text" name="hours" onChange={handleInputChangeExecTime} class="form-control" placeholder="hh" pattern="[0-9]|1[0-9]|2[0-4]" required />
                        </div>
                    </div>
                    <div className="form-group col-2">
                        <div>
                            <input type="text" name="minutes" onChange={handleInputChangeExecTime} class="form-control" placeholder="mm" pattern="[0-9]|[1-5][0-9]" required />
                        </div>
                    </div>
                    <div className="form-group col-2">
                        <div>
                            <input type="text" name="seconds" onChange={handleInputChangeExecTime} class="form-control" placeholder="ss" pattern="[0-9]|[1-5][0-9]" required />
                        </div>
                    </div>
                </div >
                <label for="inputTool">Setup Time</label>
                <div class="form-row">
                    <div className="form-group col-2">
                        <div>
                            <input type="text" name="hours" onChange={handleInputChangeSetupTime} class="form-control" placeholder="hh" pattern="[0-9]|1[0-9]|2[0-4]" required />
                        </div>
                    </div>
                    <div className="form-group col-2">
                        <div>
                            <input type="text" name="minutes" onChange={handleInputChangeSetupTime} class="form-control" placeholder="mm" pattern="[0-9]|[1-5][0-9]" required />
                        </div>
                    </div>
                    <div className="form-group col-2">
                        <div>
                            <input type="text" name="seconds" onChange={handleInputChangeSetupTime} class="form-control" placeholder="ss" pattern="[0-9]|[1-5][0-9]" required />
                        </div>
                    </div>
                </div >
                <br />
                <button type="submit" className="btn btn-primary">Create</button>
            </form >
        </>
    )
}
export default CreateOperationForm