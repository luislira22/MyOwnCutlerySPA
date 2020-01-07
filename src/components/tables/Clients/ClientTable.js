import React from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai'
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap'

const ClientTable = props => (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {props.clients.map(client => (
                <ClientRow
                    key={client.id}
                    client={client}
                    editClientRow={props.editClientRow}
                    showUpdate={props.showUpdate}
                    deleteClient={props.deleteClient}
                    deleteOrderFromClient={props.deleteOrderFromClient}
                    updateNameAndAddress={props.updateNameAndAddress}
                    permitDeleteClient={props.permitDeleteClient} />
            ))}
        </tbody>
    </table>
)

const ClientRow = props => {

    const handleUpdate = event => {
        props.editClientRow(props.client)
        props.showUpdate(true)
    }

    const handleDelete = event => {
        props.deleteClient(props.client.id)
    }

    return (
        <tr>
            <td>{props.client.name.firstname}</td>
            <td>{props.client.name.lastname}</td>
            <td>
                <ButtonToolbar style={{ float: "right" }}>
                    <Button size="sm" variant="light" style={{ marginRight: "10px" }} onClick={handleUpdate}>
                        <FaPencilAlt />
                    </Button>
                    {props.permitDeleteClient &&
                        <Button size="sm" variant="light" onClick={handleDelete}>
                            <AiFillDelete />
                        </Button>
                    }
                </ButtonToolbar>
            </td>
        </tr>
    )
}

export default ClientTable;
