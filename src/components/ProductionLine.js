import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loading from './Loading'
import ProductionLineTable from './tables/ProductionLine/ProductionLineTable'
import NavBar from './bars/NavBar'
import CreateProductionLineForm from './forms/ProductionLine/CreateProductionLineForm'
import UpdateProductionLineForm from './forms/ProductionLine/UpdateProductionLineForm'
import config from '../Config'
import Modal from 'react-bootstrap/Modal';
import * as QUERIES from '../data/queries'

const ProductionLine = (props) => {

    const [productionLines, setProductionLines] = useState([])
    const [machines, setMachines] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [showCreate, setShowCreate] = useState(false)

    const handleCreateShow = () => setShowCreate(true)
    const handleCreateHide = () => setShowCreate(false)

    const [showUpdate, setShowUpdate] = useState(false)

    const handleUpdateShow = () => setShowUpdate(true)
    const handleUpdateHide = () => setShowUpdate(false)

    const initialFormState = { description: '', machines: ''}
    const [currentProductionLine, setCurrentProductionLine] = useState(initialFormState)

    const getAllProductionLines = async () => {
        const allProductionLines = await QUERIES.getAllProductionLinesFromAPI(props.userToken);
        const allMachines = await QUERIES.getAllMachinesFromAPI(props.userToken);
        setProductionLines(allProductionLines.data);
        setMachines(allMachines.data);
        setIsLoading(false);
    }

    const editProductionLineRow = productionLine => {
        setCurrentProductionLine(productionLine)
    }

    useEffect(() => {
        getAllProductionLines()
    }, []);

    return (
        <div className="container">

            <h1>ProductionLine</h1>
            {isLoading ?
                <Loading />
                : (
                    <>
                        <NavBar
                            machines={machines}
                            reload={getAllProductionLines}
                            showCreate={handleCreateShow}
                            createEnabled={true}
                        />
                        <ProductionLineTable
                            productionLines={productionLines}
                            machines={machines}
                            editProductionLineRow={editProductionLineRow}
                            showUpdate={handleUpdateShow} />

                        <Modal
                            show={showCreate}
                            onHide={handleCreateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <CreateProductionLineForm
                                    machines={machines}
                                    productionLines={productionLines}
                                    createProductionLine={(pl,userToken) => QUERIES.createProductionLine(pl, userToken).then(getAllProductionLines)}
                                    hideCreate={handleCreateHide}
                                    userToken={props.userToken} />
                            </Modal.Body>
                        </Modal>

                        <Modal
                            show={showUpdate}
                            onHide={handleUpdateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <UpdateProductionLineForm
                                    currentProductionLine={currentProductionLine}
                                    machines={machines}
                                    updateProductionLine={(pl,userToken) => QUERIES.updateProductionLine(pl, userToken).then(getAllProductionLines)}
                                    hideUpdate={handleUpdateHide}
                                    userToken={props.userToken} />
                            </Modal.Body>
                        </Modal>
                    </>
                )}
        </div>
    )
}

export default ProductionLine;