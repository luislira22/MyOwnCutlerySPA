import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loading from './Loading'
import OrderTable from './tables/Order/OrderTable'
import NavBar from './bars/NavBar'
import CreateOrderForm from './forms/Order/CreateOrderForm'
import config from '../Config'
import Modal from 'react-bootstrap/Modal';
import AllOrdersTable from './tables/Order/AllOrdersTable';
import * as User from './User'
import UpdateOrderForm from './forms/Order/UpdateOrderForm';
import * as QUERIES from '../data/queries'
import { Button } from 'react-bootstrap'

const Order = (props) => {

    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [clients, setClients] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [showCreate, setShowCreate] = useState(false)

    const handleCreateShow = () => setShowCreate(true)
    const handleCreateHide = () => setShowCreate(false)

    const [showUpdate, setShowUpdate] = useState(false)

    const handleUpdateShow = () => setShowUpdate(true)
    const handleUpdateHide = () => setShowUpdate(false)

    const [currentOrder, setCurrentOrder] = useState(false)

    const getProducts = async () => {
        const allProducts = await QUERIES.getAllProductsFromAPI(props.userToken);
        setProducts(allProducts.data);
    }

    const getOrders = async () => {
        const allOrders = await QUERIES.getOrders(props.userToken, props.allOrderView);
        setOrders(allOrders.data);
    }

    const getClients = async () => {
        const allClients = await QUERIES.getClients(props.userToken);
        setClients(allClients.data);
    }

    const editOrderRow = order => {
        setCurrentOrder(order)
    }

    useEffect(() => {
        load()
    }, []);

    const load = () => {
        setIsLoading(true)
        getProducts()
        getOrders();
        if (props.allOrderView) getClients();
        setIsLoading(false)
    }

    return (
        <div className="container">

            <h1>Order</h1>
            {isLoading ?
                <Loading />
                : (
                    <>
                        <NavBar
                            reload={load}
                            showCreate={handleCreateShow}
                            createEnabled={props.allOrderView ? false : true}
                            showStartPlanning={props.allOrderView ? true : false}
                            planProduction={() => QUERIES.createProductionPlanning().then(load)}
                        />
                        <hr />
                        {props.allOrderView ?
                            <AllOrdersTable
                                orders={orders}
                                products={products}
                                clients={clients}
                                permitClient={props.permitClient}
                                deleteOrderFromClient={(orderId, token) => QUERIES.deleteOrderFromClient(orderId, token).then(load)}
                                permitCancelOrder={props.permitCancelOrder}
                                showUpdate={handleUpdateShow}
                                editOrderRow={editOrderRow}
                                permitUpdateOrder={props.permitUpdateOrder}
                                userToken={props.userToken}
                            /> :
                            <OrderTable
                                orders={orders}
                                products={products}
                                deleteOrder={(orderId, token) => QUERIES.deleteOrder(orderId, token).then(load)}
                                permitCancelOrder={props.permitCancelOrder}
                                showUpdate={handleUpdateShow}
                                editOrderRow={editOrderRow}
                                permitUpdateOrder={props.permitUpdateOrder}
                                userToken={props.userToken}
                            />}
                        <Modal
                            show={showCreate}
                            onHide={handleCreateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <CreateOrderForm
                                    createOrder={(order, token) => QUERIES.CreateOrder(order, token).then(load)}
                                    hideCreate={handleCreateHide}
                                    products={products}
                                    userToken={props.userToken} />
                            </Modal.Body>
                        </Modal>

                        <Modal
                            show={showUpdate}
                            onHide={handleUpdateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>

                            <UpdateOrderForm
                                order={currentOrder}
                                updateOrder={(order, token) => props.allOrderView ? QUERIES.updateOrderFromAClient(order, token).then(load) : QUERIES.updateOrder(order, token).then(load)}
                                hideUpdate={handleUpdateHide}
                                userToken={props.userToken} />
                        </Modal>
                    </>
                )}
        </div>
    )
}

export default Order