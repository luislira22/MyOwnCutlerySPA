import React, {useState} from 'react'
import {FaPencilAlt} from 'react-icons/fa';
import {Form} from "react-bootstrap";


const MachineTable = props => (
    <table className="table">
        <thead>
        <tr>
            <th scope="col">Machine Type</th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Location</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        {props.machines.map(machine => (
            machine.machineState == "Activated" ?
                <MachineRow
                    key={machine.id}
                    machine={machine}
                    machineTypes={props.machineTypes}
                    editMachineRow={props.editMachineRow}
                    deactivateMachine={props.deactivateMachine}
                    showUpdate={props.showUpdate}
                    userToken={props.userToken}/>
                :
                <MachineRowDeactivated
                    key={machine.id}
                    machine={machine}
                    machineTypes={props.machineTypes}
                    activateMachine={props.activateMachine}
                    userToken={props.userToken}/>
        ))}
        </tbody>
    </table>
)

const MachineRow = props => {

    const [machineState, setMachineState] = useState(true);

    const machineType = props.machineTypes.find(function (machineType) {
        if (machineType.id === props.machine.machineType) {
            return machineType;
        }
    })

    const handleUpdate = event => {
        const newMachine = {
            id: props.machine.id,
            machinetype: props.machine.machineType,
            machinebrand: props.machine.machineBrand == null ? "" : props.machine.machineBrand,
            machinemodel: props.machine.machineModel == null ? "" : props.machine.machineModel,
            machinelocation: props.machine.machineLocation == null ? "" : props.machine.machineLocation,
        }
        props.editMachineRow(newMachine)
        props.showUpdate()
    };

    const handleDisableMachine = async event => {
        try {
            await props.deactivateMachine(props.machine.id, props.userToken);
            setMachineState(false);
        } catch (e) {
            console.log("500 Internal Error ",e);
        }
    };

    return (
        <tr>
            <td>{machineType ? machineType.type : props.machine.machineType}</td>
            <td>{props.machine.machineBrand}</td>
            <td>{props.machine.machineModel}</td>
            <td>{props.machine.machineLocation}</td>
            <td style={{textAlign: "center"}}>


                <Form inline style={{}}>
                    <Form.Check
                        type="switch"
                        label=""
                        id={props.machine.id}
                        checked={machineState}
                        onChange={handleDisableMachine}
                    />
                    <span> </span>
                    <button id="update" type="button" className="btn btn-outline-primary btn-sm" onClick={handleUpdate}>
                        <i><FaPencilAlt className="react-icons"/></i>
                    </button>
                </Form>
            </td>
        </tr>
    )
}

const MachineRowDeactivated = props => {

    const [machineState, setMachineState] = useState(false);

    const machineType = props.machineTypes.find(function (machineType) {
        if (machineType.id === props.machine.machineType) {
            return machineType;
        }
    });

    const handleActivateMachine = async event => {

        try {
            await props.activateMachine(props.machine.id, props.userToken);
            setMachineState(true);
        }
        catch (e) {
            console.log("500 Internal Error ",e);
        }
    };

    return (
        //{props.machine.machineState == "Deactivated" ? <tr className="table-secondary"> : <tr>}
        <tr className="table-active">
            <td>{machineType ? machineType.type : props.machine.machineType}</td>
            <td>{props.machine.machineBrand}</td>
            <td>{props.machine.machineModel}</td>
            <td>{props.machine.machineLocation}</td>
            <td style={{textAlign: "center"}}>
                <Form inline>
                    <Form.Check
                        type="switch"
                        id={props.machine.id}
                        label=""
                        onChange={handleActivateMachine}
                        checked={machineState}
                    />
                </Form>
            </td>
        </tr>
    )
}

export default MachineTable;
