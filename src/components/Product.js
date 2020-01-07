import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loading from './Loading'
import ProductTable from './tables/Product/ProductTable'
import NavBar from './bars/NavBar'
import CreateProductForm from './forms/Product/CreateProductForm'
import config from '../Config'
import Modal from 'react-bootstrap/Modal';
import CreateOrderForm from './forms/Order/CreateOrderForm'
import * as QUERIES from '../data/queries'
import { useAlert } from 'react-alert'

const Product = (props) => {

    const [products, setProducts] = useState([])
    const [operations, setOperations] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [mostItems, setMostItems] = useState([])
    const [mostOrders, setMostOrders] = useState([])
    const [bestMakespan, setBestMakespan] = useState([])

    const [showCreate, setShowCreate] = useState(false)

    const handleCreateShow = () => setShowCreate(true)
    const handleCreateHide = () => setShowCreate(false)

    const [showCreateProduct, setShowCreateProduct] = useState(false);

    const handleCreateProductShow = () => setShowCreateProduct(true)
    const handleCreateProductHide = () => setShowCreateProduct(false)

    const [product, setProduct] = useState()

    const getAllProducts = async () => {
        var allProducts = [];

        try {
            allProducts = await QUERIES.getAllProductsFromAPI(props.userToken);
            setProducts(allProducts.data);
        } catch (error) {
            console.log(error)
        }

        try {
            const mostItemsIds = await QUERIES.getMostOrdererQuantityItemsFromAPI(props.userToken);
            if (mostItemsIds.data) {
                const values = [];
                mostItemsIds.data.forEach(child => {
                    allProducts.data.find(function (product) {
                        if (product.id === child) {
                            values.push(product);
                        }
                    })
                })
                setMostItems(values);
            }
        } catch (error) {
            console.log(error)
        }

        try {
            const mostOrdersIds = await QUERIES.getMostOrdererQuantityOrdersFromAPI(props.userToken);
            if (mostOrdersIds.data) {
                const values = [];
                mostOrdersIds.data.forEach(child => {
                    allProducts.data.find(function (product) {
                        if (product.id === child) {
                            values.push(product);
                        }
                    })
                })
                setMostOrders(values);
            }
        } catch (error) {
            console.log(error)
        }

        try {
            const bestMakespanIds = await QUERIES.bestMakespan();

            if (bestMakespanIds.data) {
                const values = [];
                bestMakespanIds.data.productsMakespan.forEach(child => {
                    allProducts.data.find(function (product) {
                        if (product.id === child.productId) {
                            values.push(product);
                        }
                    })
                })
                setBestMakespan(values);
            }
        } catch (error) {
            console.log("Erro no servidor de Production Planning" + error)
        }

        if (props.permitmdfp) {
            try {
                const allOperations = await QUERIES.getAllOperationsFromAPI(props.userToken);
                setOperations(allOperations.data);
            } catch (error) {
                console.log(error)
            }
        }
        setIsLoading(false);
    }



    useEffect(() => {
        getAllProducts()
    }, []);

    return (
        <div className="container">

            <h1>Product</h1>
            {isLoading ?
                <Loading />
                : (
                    <>
                        <NavBar
                            reload={getAllProducts}
                            showCreate={handleCreateShow}
                            createEnabled={props.permitmdfp}
                        />
                        {props.permitmdfp &&
                            <ProductTable
                                products={products}
                                operations={operations}
                                showManufacturingPlan={true}
                            />
                        }

                        <Modal
                            show={showCreate}
                            onHide={handleCreateHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <CreateProductForm
                                    products={products}
                                    operations={operations}
                                    createProduct={(product, token) => QUERIES.createProduct(product, token).then(getAllProducts())}
                                    userToken={props.userToken}
                                    hideCreate={handleCreateHide} />
                            </Modal.Body>
                        </Modal>

                        <Modal
                            show={showCreateProduct}
                            onHide={handleCreateProductHide}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <CreateOrderForm
                                    createOrder={(order, token) => QUERIES.CreateOrder(order, token)}
                                    hideCreate={handleCreateProductHide}
                                    userToken={props.userToken}
                                    products={products}
                                    product={product} />
                            </Modal.Body>
                        </Modal>

                        <h1>Trending (Quantity of Items)</h1>
                        <ProductTable
                            products={mostItems}
                            operations={operations}
                            showManufacturingPlan={false}
                            showStartOrder={props.permitmdfp ? false : true}
                            showCreate={handleCreateProductShow}
                            setProduct={setProduct}
                        />

                        <h1>Trending (Quantity of Orders)</h1>
                        <ProductTable
                            products={mostOrders}
                            operations={operations}
                            showManufacturingPlan={false}
                            showStartOrder={props.permitmdfp ? false : true}
                            showCreate={handleCreateProductShow}
                            setProduct={setProduct}
                        />

                        <h1>Fastest Production Products (Makespan)</h1>
                        <ProductTable
                            products={bestMakespan}
                            operations={operations}
                            showManufacturingPlan={false}
                            showStartOrder={props.permitmdfp ? false : true}
                            showCreate={handleCreateProductShow}
                            setProduct={setProduct}
                        />


                    </>
                )}
        </div>
    )
}

export default Product