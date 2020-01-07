import React from 'react'


const OperationTable = props => (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Description</th>
                <th scope="col">Tool</th>
                <th scope="col">Setup Time</th>
                <th scope="col">Exec Time</th>
            </tr>
        </thead>
        <tbody>
            {props.operations.map(operation => (
                <OperationRow
                    key={operation.id}
                    operation={operation}
                />
            ))}
        </tbody>
    </table>
)

const OperationRow = props => {

    return (
        <tr>
            <td>{props.operation.description}</td>
            <td>{props.operation.tool}</td>
            <td>{props.operation.setupTime}</td>
            <td>{props.operation.duration}</td>
        </tr>
    )
}

export default OperationTable;