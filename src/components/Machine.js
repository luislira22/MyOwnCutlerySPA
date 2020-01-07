import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loading from './Loading'
import MachineTable from './tables/Machine/MachineTable'
import NavBar from './bars/NavBar'
import CreateMachineForm from './forms/Machine/CreateMachineForm'
import UpdateMachineForm from './forms/Machine/UpdateMachineForm'
import config from '../Config'
import Modal from 'react-bootstrap/Modal';
import * as QUERIES from '../data/queries'

const Machine = (props) => {

    const [machines, setMachines] = useState([])
    const [machineTypes, setMachineTypes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [showCreate, setShowCreate] = useState(false)

    const handleCreateShow = () => setShowCreate(true)
    const handleCreateHide = () => setShowCreate(false)

    const [showUpdate, setShowUpdate] = useState(false)

    const handleUpdateShow = () => setShowUpdate(true)
    const handleUpdateHide = () => setShowUpdate(false)

    const initialFormState = { id: '', machinetype: '', machinebrand: '', machinemodel: '', machinelocation: '' }
    const [currentMachine, setCurrentMachine] = useState(initialFormState)

    const getAllMachines = async () => {
        const allMachines = await QUERIES.getAllMachinesFromAPI(props.userToken)
        const allMachineTypes = await QUERIES.getAllMachineTypesFromAPI(props.userToken);
        setMachines(allMachines.data);
        setMachineTypes(allMachineTypes.data);
        setIsLoading(false);
    }

    const getAllMachinesFilterByMachineType = async machineType => {
        const machineTypeId = machineType.target.value
        const filterMachines = await QUERIES.filterByMachineType(machineTypeId, props.userToken)
        const allMachineTypes = await QUERIES.getAllMachineTypesFromAPI(props.userToken);
        setMachines(filterMachines.data);
        setMachineTypes(allMachineTypes.data);
    }

    const editMachineRow = machine => {
        setCurrentMachine(machine)
    }

    useEffect(() => {
        getAllMachines()
    }, []);

    return (
        <div className="container">

            <h1>Machine</h1>
            {isLoading ?
                <Loading />
                : (
                    <>
                        <NavBar
                            machineTypes={machineTypes}
                            reload={getAllMachines}
                            showCreate={handleCreateShow}
                            createEnabled={true}
                            enableFilter={true}
                            filterByMachineType={getAllMachinesFilterByMachineType}
                        />
                        <MachineTable
                            machines={machines}
                            machineTypes={machineTypes}
                            editMachineRow={editMachineRow}
                            activateMachine={(id,userToken) => QUERIES.activateMachine(id, userToken).then(getAllMachines)}
                            deactivateMachine={(id,userToken) => QUERIES.deactivateMachine(id, userToken).then(getAllMachines)}
                            userToken={props.userToken}
                            showUpdate={handleUpdateShow} />

                        <Modal
                            show={showCreate}
                            onHide={handleCreateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <CreateMachineForm
                                    machineTypes={machineTypes}
                                    createMachine={(machine, userToken) => QUERIES.createMachine(machine,userToken).then(getAllMachines)}
                                    userToken={props.userToken}
                                    hideCreate={handleCreateHide}
                                     />
                            </Modal.Body>
                        </Modal>

                        <Modal
                            show={showUpdate}
                            onHide={handleUpdateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>

                            <Modal.Body>
                                <UpdateMachineForm
                                    currentMachine={currentMachine}
                                    machineTypes={machineTypes}
                                    updateMachine={(machine, userToken) => QUERIES.updateMachine(machine, userToken).then(getAllMachines)}
                                    userToken={props.userToken}
                                    hideUpdate={handleUpdateHide} />
                            </Modal.Body>
                        </Modal>
                    </>
                )}
        </div>
    )
}

export default Machine;