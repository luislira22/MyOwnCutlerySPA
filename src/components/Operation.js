import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loading from './Loading'
import OperationTable from './tables/Operation/OperationTable'
import NavBar from './bars/NavBar'
import CreateOperationForm from './forms/Operation/CreateOperationForm'
import config from '../Config'
import Modal from 'react-bootstrap/Modal';
import * as QUERIES from '../data/queries'

const Operation = (props) => {

    const [operations, setOperations] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [showCreate, setShowCreate] = useState(false)

    const handleCreateShow = () => setShowCreate(true)
    const handleCreateHide = () => setShowCreate(false)

    const getAllOperations = async () => {
        const allOperations = await QUERIES.getAllOperationsFromAPI(props.userToken);
        setOperations(allOperations.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getAllOperations()
    }, []);

    return (
        <div className="container">

            <h1>Operation</h1>
            {isLoading ?
                <Loading />
                : (
                    <>
                        <NavBar
                            reload={getAllOperations}
                            showCreate={handleCreateShow}
                            createEnabled={true}
                        />
                        <OperationTable
                            operations={operations}
                        />
                        <Modal
                            show={showCreate}
                            onHide={handleCreateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <CreateOperationForm
                                    createOperation={(op, token) => QUERIES.CreateOperation(op,token).then(getAllOperations)}
                                    hideCreate={handleCreateHide}
                                    userToken={props.userToken} />
                            </Modal.Body>
                        </Modal>
                    </>
                )}
        </div>
    )
}

export default Operation