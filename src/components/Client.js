import React, { useState, useEffect } from 'react';
import axios from "axios";
import config from '../Config'
import Loading from './Loading'
import NavBar from './bars/NavBar'
import ClientTable from './tables/Clients/ClientTable'
import EditAccountModal from './modals/EditAccountModal';


const Client = (props) => {

    const [clients, setClients] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showEditUser, setShowEditUser] = useState(false)
    const [user, setUser] = useState(false)

    const getClients = async () => {
        await axios({
            method: "get",
            url: config.routes.users.getAllClients,
            headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": props.userToken },
        }).then((result) => {
            setClients(result.data);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error)
            setIsLoading(false);
        })
    }

    const deleteClient = async (clientId) => {
        await axios({
            method: "delete",
            url: config.routes.users.deleteClient + clientId,
            headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": props.userToken },
        }).then((result) => {
            setIsLoading(false);
        }).catch((error) => {
            console.log(error)
            setIsLoading(false);
        })
        getClients();
    }

    const updateNameAndAddress = async (client) => {
        return await axios({
            method: "put",
            url: config.routes.users.updateClient + client.id,
            data: client,
            headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": props.userToken },
        }).then(response => {
            getClients();
            return response;
        }).catch((error) => {
            return error.response;
        })
    }

    const editClientRow = client => {
        setUser(client)
    }

    useEffect(() => {
        setIsLoading(true);
        getClients()
        setIsLoading(false);
    }, []);

    return (
        <div className="container">

            <h1>Clients</h1>
            {isLoading ?
                <Loading />
                : (
                    <>
                        <NavBar
                            reload={getClients}
                        />
                        <ClientTable
                            clients={clients}
                            permitDeleteClient={props.permitDeleteClient}
                            deleteClient={deleteClient}
                            updateNameAndAddress={updateNameAndAddress}
                            showUpdate={setShowEditUser}
                            editClientRow={editClientRow}
                        />
                        <EditAccountModal
                            show={showEditUser}
                            onHide={(e) => setShowEditUser(false)}
                            user={user}
                            updateClient={updateNameAndAddress}
                            cannotUpdate={props.updateNameAddress}
                        />
                    </>
                )}
        </div>
    )
}

export default Client;