import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import MachineTypes from './MachineType';
import Machines from './Machine';
import Operations from './Operation';
import Products from './Product';
import ProductionLines from './ProductionLine';
import SceneData from '../three/SceneData';
import User from './User'
import Clients from './Client'
import Order from './Order';

const NavigationBar = () => {

	const [userToken, setUserToken] = useState("");
	const [machinesView, setMachinesView] = useState(false)
	const [machineTypesView, setMachineTypesView] = useState(false)
	const [productsView, setProductsView] = useState(false)
	const [operationsView, setOperationsView] = useState(false)
	const [productionLinesView, setProductionLinesView] = useState(false)
	const [visualizationView, setVisualizationView] = useState(false)
	const [orderView, setOrderView] = useState(false)
	const [allOrderView, setAllOrderView] = useState(false)
	const [clientView, setClientView] = useState(false)

	//permissions stuff
	const [permitmdfp, setPermitMdfp] = useState(false);
	const [updateNameAddress, setUpdateNameAddress] = useState(false);
	const [permitAllOrders, setPermitAllOrders] = useState(false);
	const [permitAllClients, setPermitAllClients] = useState(false);
	const [permitOrders, setPermitOrders] = useState(false);
	const [permitDeleteClient, setPermitDeleteClient] = useState(false);
	const [permitClient, setPermitClient] = useState(false);
	const [permitCancelOrder, setPermitCancelOrder] = useState(false);
	const [permitUpdateOrder, setPermitUpdateOrder] = useState(false);

	const hideAllViews = () => {
		setMachinesView(false)
		setMachineTypesView(false)
		setProductsView(false)
		setOperationsView(false)
		setProductionLinesView(false)
		setVisualizationView(false)
		setOrderView(false)
		setClientView(false)
		setAllOrderView(false);
		return true
	}

	const resetPermissions = () => {
		setPermitMdfp(false);
		setUpdateNameAddress(false);
		setPermitAllClients(false);
		setPermitOrders(false);
		setPermitAllOrders(false);
		setPermitAllOrders(false);
		setPermitDeleteClient(false);
		setPermitCancelOrder(false)
		setPermitUpdateOrder(false)
		hideAllViews();
	}

	useEffect(() => {
		console.log(permitUpdateOrder)
	}, [permitUpdateOrder])

	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand>My Own Cutlery</Navbar.Brand>
				<Nav className="mr-auto">
					{permitmdfp &&
						<>
							<Nav.Link onClick={() => hideAllViews() && setMachinesView(true)}>Machines</Nav.Link>
							<Nav.Link onClick={() => hideAllViews() && setMachineTypesView(true)} >Machine Types</Nav.Link>
							<Nav.Link onClick={() => hideAllViews() && setOperationsView(true)}>Operations</Nav.Link>
							<Nav.Link onClick={() => hideAllViews() && setProductionLinesView(true)}>Production Line</Nav.Link>
							<Nav.Link onClick={() => hideAllViews() && setVisualizationView(true)}>Visualization</Nav.Link>
						</>
					}
					{userToken &&
						<Nav.Link onClick={() => hideAllViews() && setProductsView(true)}>Products</Nav.Link>
					}
					{permitOrders &&
						<Nav.Link onClick={() => hideAllViews() && setOrderView(true)}>My Orders</Nav.Link>
					}
					{permitAllOrders &&
						<Nav.Link onClick={() => hideAllViews() && setAllOrderView(true)}>All Orders</Nav.Link>
					}
					{permitAllClients &&
						<Nav.Link onClick={() => hideAllViews() && setClientView(true)}>Clients</Nav.Link>
					}
				</Nav>
				<Form inline>
					<User
						userToken={userToken}
						setUserToken={setUserToken}
						resetPermissions={resetPermissions}
						setPermitMdfp={setPermitMdfp}
						updateNameAddress={updateNameAddress}
						setUpdateNameAddress={setUpdateNameAddress}
						permitAllClients={permitAllClients}
						setPermitAllClients={setPermitAllClients}
						setPermitAllOrders={setPermitAllOrders}
						setPermitOrders={setPermitOrders}
						setPermitDeleteClient={setPermitDeleteClient}
						setPermitClient={setPermitClient}
						setPermitCancelOrder={setPermitCancelOrder}
						setPermitUpdateOrder={setPermitUpdateOrder}
					/>
				</Form>
			</Navbar>
			<div id="mainwindow">
				{machinesView && <Machines
					userToken={userToken} />}
				{machineTypesView && <MachineTypes
					userToken={userToken} />}
				{productsView && <Products
					userToken={userToken}
					permitmdfp={permitmdfp} />}
				{operationsView && <Operations
					userToken={userToken} />}
				{productionLinesView && <ProductionLines
					userToken={userToken} />}
				{visualizationView && <SceneData
					userToken={userToken} />}
				{(orderView || allOrderView) &&
					<Order
						userToken={userToken}
						permitOrders={permitOrders}
						allOrderView={allOrderView}
						users={User}
						permitClient={permitClient}
						permitCancelOrder={permitCancelOrder}
						permitUpdateOrder={permitUpdateOrder}
					/>}
				{clientView && <Clients
					userToken={userToken}
					permitDeleteClient={permitDeleteClient} />}
			</div>
		</>
	)
}

export default NavigationBar