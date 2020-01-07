import React from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { DropdownButton } from 'react-bootstrap'

const MachineTypeTable = props => (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Type</th>
                <th scope="col">Operations</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.machineTypes.map(machineType => (
                <MachineTypeRow
                    machineType={machineType}
                    operations={props.operations}
                    editMachineTypeRow={props.editMachineTypeRow}
                    showUpdate={props.showUpdate} />
            ))}
        </tbody>
    </table>
)

const MachineTypeRow = props => {
    let listOp = []
    props.machineType.operations.forEach(operation => {
        props.operations.find(function (element) {
            if (element.id === operation) {
                listOp.push(element)
            }
        })
    })

    const handleUpdate = () => {
        const newMachineType = {
            id: props.machineType.id,
            type: props.machineType.type,
            operations: props.machineType.operations
        }
        props.editMachineTypeRow(newMachineType)
        props.showUpdate()
    }

    return (
        <tr>
            <td>{props.machineType.type}</td>
            <td>
                <DropdownButton alignCenter id="dropdown-menu-align-right" title="Operations" size="sm">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Tool</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOp.map(operation => (
                                <tr key={operation.id}>
                                    <td>{operation.description}</td>
                                    <td>{operation.tool}</td>
                                    <td>{operation.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </DropdownButton>
            </td>
            <td style={{ textAlign: "center" }}>
                <button id="update" type="button" className="btn btn-outline-primary btn-sm" onClick={handleUpdate}>
                    <i><FaPencilAlt className="react-icons" /></i>
                </button>
            </td>
        </tr>
    )
}

export default MachineTypeTable;
