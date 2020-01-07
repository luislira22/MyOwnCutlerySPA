import React from 'react'


const OperationTable = props => (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Tool</th>
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
            <td>{props.operation.duration}</td>
            <td>{props.operation.tool}</td>
        </tr>
    )
}

export default OperationTable;