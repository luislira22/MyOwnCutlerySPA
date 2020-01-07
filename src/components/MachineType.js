import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loading from './Loading'
import MachineTypeTable from './tables/MachineType/MachineTypeTable'
import NavBar from './bars/NavBar'
import CreateMachineTypeForm from './forms/MachineType/CreateMachineTypeForm'
import UpdateMachineTypeForm from './forms/MachineType/UpdateMachineTypeForm'
import config from '../Config'
import Modal from 'react-bootstrap/Modal';
import * as QUERIES from '../data/queries'

const MachineType = (props) => {

    const [machineTypes, setMachineTypes] = useState([])
    const [operations, setOperations] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [showCreate, setShowCreate] = useState(false)

    const handleCreateShow = () => setShowCreate(true)
    const handleCreateHide = () => setShowCreate(false)

    const [showUpdate, setShowUpdate] = useState(false)

    const handleUpdateShow = () => setShowUpdate(true)
    const handleUpdateHide = () => setShowUpdate(false)

    const initialFormState = { id: '', type: '', operations: '' }
    const [currentMachineType, setCurrentMachineType] = useState(initialFormState)

    const getAllMachineTypes = async () => {
        const allMachineTypes = await QUERIES.getAllMachineTypesFromAPI(props.userToken);
        const allOperations = await QUERIES.getAllOperationsFromAPI(props.userToken);
        setMachineTypes(allMachineTypes.data);
        setOperations(allOperations.data);
        setIsLoading(false);
    }

    const getAllMachineTypesFilterByOperation = async operation => {
        const operationId = operation.target.value
        const filterMachineTypes = await QUERIES.filterByMachineType(operationId,props.userToken);
        const allOperations = await QUERIES.getAllOperationsFromAPI(props.userToken);
        setMachineTypes(filterMachineTypes.data);
        setOperations(allOperations.data);
    }



    const editMachineTypeRow = machineType => {
        setCurrentMachineType(machineType)
    }

    useEffect(() => {
        getAllMachineTypes()
    }, []);

    return (
        <div className="container">

            <h1>MachineType</h1>
            {isLoading ?
                <Loading />
                : (
                    <>
                        <NavBar
                            operations={operations}
                            reload={getAllMachineTypes}
                            showCreate={handleCreateShow}
                            createEnabled={true}
                            filterByOperation={getAllMachineTypesFilterByOperation}
                        />
                        <MachineTypeTable
                            machineTypes={machineTypes}
                            operations={operations}
                            editMachineTypeRow={editMachineTypeRow}
                            showUpdate={handleUpdateShow} />
                        <Modal
                            show={showCreate}
                            onHide={handleCreateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <CreateMachineTypeForm
                                    operations={operations}
                                    createMachineType={(machine, token) => QUERIES.createMachineType(machine,token).then(getAllMachineTypes)}
                                    userToken={props.userToken}
                                    hideCreate={handleCreateHide} />
                            </Modal.Body>
                        </Modal>

                        <Modal
                            show={showUpdate}
                            onHide={handleUpdateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>

                            <Modal.Body>
                                <UpdateMachineTypeForm
                                    machineType={currentMachineType}
                                    allOperations={operations}
                                    updateMachineType={(machine, token) => QUERIES.updateMachineType(machine,token).then(getAllMachineTypes)}
                                    userToken={props.userToken}
                                    hideUpdate={handleUpdateHide} />
                            </Modal.Body>
                        </Modal>
                    </>
                )}
        </div>
    )
}

export default MachineType;