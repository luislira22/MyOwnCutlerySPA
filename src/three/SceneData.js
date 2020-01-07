import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loading from '../components/Loading'
import config from '../Config'
import SceneManager from './SceneManager'
import Modal from 'react-bootstrap/Modal';
import CreateMachineForm from '../components/forms/Machine/CreateMachineForm'
import * as QUERIES from '../data/queries'

const SceneData = (props) => {

    const [productionLines, setProductionLines] = useState([])
    const [machines, setMachines] = useState([])
    const [machineTypes, setMachineTypes] = useState([])
    const [operations, setOperations] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState(true);
    const [newData, setNewData] = useState(false);

    const [showCreate, setShowCreate] = useState(false)
    //const handleCreateShow = () => setShowCreate(true);
    const handleCreateHide = () => setShowCreate(false)
    const [lineToCreateMachine, setLineToCreateMachine] = useState();

    const [showUpdate, setShowUpdate] = useState(false)

    const handleUpdateShow = () => setShowUpdate(true)
    const handleUpdateHide = () => setShowUpdate(false)

    const initialFormState = { description: '', machines: '' }
    const [currentProductionLine, setCurrentProductionLine] = useState(initialFormState)

    const handleCreateShow = (e, lineId) => {
        setShowCreate(true)
        
        const line = productionLines.find(function (line) {
            if (line.id === lineId) {
                return line;
            }
        })

        setLineToCreateMachine(line);
    }
    

    const getAllProductionLines = async () => {
        const allProductionLines = await QUERIES.getAllProductionLinesFromAPI(props.userToken);
        const allMachines = await QUERIES.getAllMachinesFromAPI(props.userToken);
        const allMachineTypes = await QUERIES.getAllMachineTypesFromAPI(props.userToken);
        const allOperations = await QUERIES.getAllOperationsFromAPI(props.userToken);
        setProductionLines(allProductionLines.data);
        setMachines(allMachines.data);
        setMachineTypes(allMachineTypes.data);
        setOperations(allOperations.data);
        setIsLoading(false);
        setNewData(true);
        console.log("Updated From Database");
    }

    const addMachineInProductionLine = async machine => {
        await axios({
            method: "post",
            url: config.routes.machines.create,
            data: machine,
            headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + props.userToken },
        }).then(response => { 
            lineToCreateMachine.machines.push(response.data.id);
            updateProductionLine(lineToCreateMachine);
        }).catch((error) => {
            console.log(error)
        })
    }

    const updateProductionLine = async productionLine => {
        console.log(productionLine)
        await axios({
            method: "put",
            url: config.routes.productionlines.productionLines + productionLine.id,
            data: productionLine,
            headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + props.userToken },
        }).then(response => { 
            setRefresh(true);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (refresh) {
            getAllProductionLines()
            setRefresh(false);
        }
    }, [refresh]);

    return (
        <>
            {isLoading ?
                <Loading />
                : (
                    <>
                        <SceneManager
                            productionLines={productionLines}
                            machines={machines}
                            machineTypes={machineTypes}
                            operations={operations}
                            refresh={refresh}
                            setRefresh={setRefresh}
                            newData={newData}
                            setNewData={setNewData}
                            showCreate={handleCreateShow}
                        />
                        <Modal
                            show={showCreate}
                            onHide={handleCreateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <CreateMachineForm
                                    machineTypes={machineTypes}
                                    createMachine={addMachineInProductionLine}
                                    hideCreate={handleCreateHide} />
                            </Modal.Body>
                        </Modal>
                    </>
                )}
        </>
    )
}

export default SceneData;