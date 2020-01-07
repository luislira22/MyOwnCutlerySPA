import React, { useState, useEffect } from 'react'
import axios from "axios";
import config from '../Config'

/* MACHINES */
export const getAllMachinesFromAPI = async (userToken) => {
    return await axios({
        method: "get",
        url: config.routes.machines.getAll,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export const createMachine = async (machine, userToken) => {
    console.log(machine)
    await axios({
        method: "post",
        url: config.routes.machines.create,
        data: machine,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export const updateMachine = async (machine, userToken) => {
    await axios({
        method: "put",
        url: config.routes.machines.updateMachineType + machine.id,
        data: '"' + machine.machinetype + '"',
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log("INTERNAL SERVER ERROR 500", error);
        throw error;
    });
};

export const activateMachine = async (id, userToken) => {
    return await axios({
        method: "post",
        url: config.routes.machines.activate + id,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        throw error;
    });
};

export const deactivateMachine = async (id, userToken) => {
    return await axios({
        method: "post",
        url: config.routes.machines.deactivate + id,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        throw error;
    });
};

/* MACHINE TYPES */
export const getAllMachineTypesFromAPI = async (userToken) => {
    return await axios({
        method: "get",
        url: config.routes.machinetypes.getAll,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        throw error;
    })
}

export const filterByMachineType = async (machineTypeId, userToken) => {
    return await axios({
        method: "get",
        url: config.routes.machines.filterByMachineType + machineTypeId,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        throw error;
    })
}

export const createMachineType = async (machineType, userToken) => {
    return await axios({
        method: "post",
        url: config.routes.machinetypes.create,
        data: machineType,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        throw error;
    })
}

export const updateMachineType = async (machineType, userToken) => {
    return await axios({
        method: "put",
        url: config.routes.machinetypes.updateMachineTypeOperations + machineType.id,
        data: '{"operations":' + JSON.stringify(machineType.operations) + '}',
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        throw error;
    })
}

/* PRODUCTS */
export const createProduct = async (product, userToken) => {
    return await axios({
        method: "post",
        url: config.routes.products.create,
        data: product,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        throw error;
    })
}

export const getAllProductsFromAPI = async (userToken) => {
    return await axios({
        method: "get",
        url: config.routes.products.getAll,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        throw error;
    })
}

export const getMostOrdererQuantityItemsFromAPI = async (userToken) => {
    return await axios({
        method: "get",
        url: config.routes.orders.mostQuantityItems,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}


export const getMostOrdererQuantityOrdersFromAPI = async (userToken) => {
    return await axios({
        method: "get",
        url: config.routes.orders.mostQuantityOrders,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

/* OPERATIONS */

export const getAllOperationsFromAPI = async (userToken) => {
    return await axios({
        method: "get",
        url: config.routes.operations.getAll,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export const CreateOperation = async (operation, userToken) => {
    const result = {description: operation.description,duration: operation.execTime.hours+":"+operation.execTime.minutes+":"+operation.execTime.seconds,setupTime:operation.setupTime.hours+":"+operation.setupTime.minutes+":"+operation.setupTime.seconds,tool: operation.tool}
    return await axios({
        method: "post",
        url: config.routes.operations.createOperation,
        data: result,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

/*PRODUCTION LINE */
export const getAllProductionLinesFromAPI = async (userToken) => {
    return await axios({
        method: "get",
        url: config.routes.productionlines.getAll,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export const createProductionLine = async (productionLine, userToken) => {
    return await axios({
        method: "post",
        url: config.routes.productionlines.createProductionLine,
        data: productionLine,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export const updateProductionLine = async (productionLine, userToken) => {
    return await axios({
        method: "put",
        url: config.routes.productionLines + productionLine.id,
        data: productionLine,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": "bearer " + userToken },
    }).then((result) => {
        return result
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

/* ORDERS */
export const getOrders = async (userToken, allOrderView) => {
    return await axios({
        method: "get",
        url: allOrderView ? config.routes.orders.getAllOrders : config.routes.orders.getMyOrders,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken },
    }).then((result) => {
        return result;
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export const CreateOrder = async (order,userToken) => {
    const result = {
        quantity: order.quantity,
        deliveryDate: order.deliveryDate,
        status: order.status,
        productID: order.productID
    };
    return await axios({
        method: "post",
        url: config.routes.orders.createOrder,
        data: result,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken },
    }).then((result) => {
        return result;
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export const updateOrder = async (order, userToken) => {
    console.log(userToken)
    console.log(order.quantity)
    return await axios({
        method: "put",
        url: config.routes.orders.updateOrderQuantity + order.id,
        data: { "quantity": order.quantity },
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken }
    }).then(response => {
        return response;
    }).catch((error) => {
        console.log(error);
        return error.response;
    })
}

export const updateOrderFromAClient = async (order, userToken) => {
    console.log(order)
    return await axios({
        method: "put",
        url: config.routes.orders.updateOrderQuantity + order.id,
        data: { "quantity": order.quantity },
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken }
    }).then(response => {
        return response;
    }).catch((error) => {
        console.log(error);
        return error.response;
    })
}

export const deleteOrderFromClient = async (orderId, userToken) => {
    return await axios({
        method: "delete",
        url: config.routes.orders.deleteOrderFromClient + orderId,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken },
    }).then(response => {
        return response;
    }).catch((error) => {
        return error.response;
    })
}

export const deleteOrder = async (orderId, userToken) => {
    return await axios({
        method: "delete",
        url: config.routes.orders.deleteOrder + orderId,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken },
    }).then(response => {
        return response;
    }).catch((error) => {
        console.log(error);
        return error.response;
    })
}

/*Clients*/
export const getClients = async (userToken) => {
    return await axios({
        method: "get",
        url: config.routes.users.getAllClients,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken },
    }).then((result) => {
        return result;
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export const createClient = async (user) => {
    return await axios({
        method: "post",
        url: config.routes.users.createClient,
        data: user,
        headers: { "Content-Type": "application/json;charset=UTF-8"},
    }).then(response => {
        return response;
    }).catch((error) => {
        return error.response;
    })
}

export const deleteMyAccount = async (userToken) => {
    return await axios({
        method: "delete",
        url: config.routes.users.deleteMyAccount,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken },
    }).then(response => {
        if (response.status == 204) {
            return response;
        }
        throw "Failed"
    }).catch((error) => {
        throw error;
    })
}

export const logInClient = async user => {
    return await axios({
        method: "post",
        url: config.routes.users.login,
        data: user,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
    }).then(response => {
        return response;
    }).catch((error) => {
        throw error;
    })
}

export const updateClient = async (user, userToken) => {
    return await axios({
        method: "put",
        url: config.routes.users.updateMyData,
        data: user,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": userToken },
    }).then(response => {
        return response;
    }).catch((error) => {
        throw error;
    })
}

/*PRODUCTION PLANNING */

export const createProductionPlanning = async () => {
    return await axios({
        method: "put",
        url: config.routes.orders.calculate,
        headers: { "Content-Type": "application/json;charset=UTF-8"},
    }).then((result) => {
        return result;
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export const bestMakespan = async () => {
    return await axios({
        method: "get",
        url: config.routes.pp.getMakespan,
        headers: { "Content-Type": "application/json;charset=UTF-8"},
    }).then((result) => {
        return result;
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}

export default getAllMachinesFromAPI;
