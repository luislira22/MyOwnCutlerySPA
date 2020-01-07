const ENDPOINTS_DEV = {
    masterdatafactory: "https://localhost:5001/",
    masterdataproduct: "https://localhost:5002/",
    ordermanagment: "http://localhost:5000/"
}

const ENDPOINTS_PROD = {
    masterdatafactory: "https://masterdatafactory.azurewebsites.net/",
    masterdataproduct: "https://masterdataproduct.azurewebsites.net/",
    ordermanagment: "https://myowncutlery-om-lapr5.herokuapp.com/"
}

const ENDPOINTS = process.env.NODE_ENV !== 'development' ? ENDPOINTS_DEV : ENDPOINTS_PROD
console.log(process.env.NODE_ENV)

export default {
    endpoints: ENDPOINTS,
    routes: {
        machines: {
            getAll: `${ENDPOINTS.masterdatafactory}api/machine`,
            create: `${ENDPOINTS.masterdatafactory}api/machine`,
            filterByMachineType: `${ENDPOINTS.masterdatafactory}api/machine/machinetype/`,
            updateMachineType: `${ENDPOINTS.masterdatafactory}api/machine/`,
            activate: `${ENDPOINTS.masterdatafactory}api/machine/activate/`,
            deactivate: `${ENDPOINTS.masterdatafactory}api/machine/deactivate/`
        },
        machinetypes: {
            getAll: `${ENDPOINTS.masterdatafactory}api/machinetype`,
            create: `${ENDPOINTS.masterdatafactory}api/machinetype`,
            updateMachineTypeOperations: `${ENDPOINTS.masterdatafactory}api/machinetype/operations/`
        },
        products: {
            getAll: `${ENDPOINTS.masterdataproduct}api/product`,
            create: `${ENDPOINTS.masterdataproduct}api/product`,
        },    
        operations:{
            getById: `${ENDPOINTS.masterdatafactory}api/operation/`,
            getAll: `${ENDPOINTS.masterdatafactory}api/operation`,
            createOperation: `${ENDPOINTS.masterdatafactory}api/operation`
        },
        productionlines:{
            getAll: `${ENDPOINTS.masterdatafactory}api/productionline`,
            createProductionLine: `${ENDPOINTS.masterdatafactory}api/productionline`,
            productionLines: `${ENDPOINTS.masterdatafactory}api/productionline/`
        },
        users:{
            createClient: `${ENDPOINTS.ordermanagment}api/client`,
            consultClient: `${ENDPOINTS.ordermanagment}api/client`,
            deleteMyAccount: `${ENDPOINTS.ordermanagment}api/client`,
            login: `${ENDPOINTS.ordermanagment}api/login`,
            updateMyData: `${ENDPOINTS.ordermanagment}api/client`,
            getAllClients: `${ENDPOINTS.ordermanagment}api/admin/clients`,
            deleteClient: `${ENDPOINTS.ordermanagment}api/admin/client/`,
            updateClient: `${ENDPOINTS.ordermanagment}api/admin/client/`
        },
        orders:{
            getMyOrders: `${ENDPOINTS.ordermanagment}api/client/orders`,
            getAllOrders: `${ENDPOINTS.ordermanagment}api/admin/orders`,
            createOrder: `${ENDPOINTS.ordermanagment}api/client/order`,
            deleteOrderFromClient : `${ENDPOINTS.ordermanagment}api/admin/order/`,
            deleteOrder: `${ENDPOINTS.ordermanagment}api/client/order/`,
            updateOrderQuantity: `${ENDPOINTS.ordermanagment}api/client/order/`,
            mostQuantityItems: `${ENDPOINTS.ordermanagment}api/orders/productsQuantity`,
            mostQuantityOrders: `${ENDPOINTS.ordermanagment}api/orders/ordersQuantity`,
            calculate: `${ENDPOINTS.ordermanagment}api/admin/createProductionPlanning`
        },
        pp:{
            getMakespan: "https://vs-gate.dei.isep.ipp.pt:26318/api/products/makespan"
        }
    }
}

