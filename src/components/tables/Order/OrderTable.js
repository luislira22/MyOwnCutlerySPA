import React from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai'
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap'

const OrderTable = props => (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Date</th>
                <th scope="col">Requested Delivery Date</th>
                <th scope="col">Estimated Delivery Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {props.orders.map(order => (
                <OrderRow
                    key={order.id}
                    order={order}
                    products={props.products}
                    deleteOrder={props.deleteOrder}
                    permitCancelOrder={props.permitCancelOrder}
                    updateOrder={props.updateOrder}
                    showUpdate={props.showUpdate}
                    editOrderRow={props.editOrderRow}
                    updateOrder={props.updateOrder}
                    permitUpdateOrder={props.permitUpdateOrder}
                    userToken={props.userToken}
                />
            ))}
        </tbody>
    </table>
)

const OrderRow = props => {

    const handleUpdate = event => {
        props.editOrderRow(props.order)
        props.showUpdate();
    }

    const handleDelete = event => {
        props.deleteOrder(props.order.id, props.userToken)
    }

    const product = props.products.find(function (product) {
        if (product.id === props.order.productID) {
            return product;
        }
    });

    return (
        <tr>
            <td>{product ? product.ref : "Product Deleted"}</td>
            <td>{props.order.quantity}</td>
            <td>{props.order.date}</td>
            <td>{props.order.requestDeliveryDate}</td>
            <td>{props.order.deliveryDate ? props.order.deliveryDate : "not calculated"}</td>
            <td>{props.order.status}</td>
            <td>
                <ButtonToolbar style={{ float: "right" }}>
                    {props.permitUpdateOrder &&
                        <Button size="sm" variant="light" style={{ marginRight: "10px" }} onClick={handleUpdate}>
                            <FaPencilAlt />
                        </Button>}
                    {props.permitCancelOrder &&
                        <Button size="sm" variant="light" onClick={handleDelete} disabled={(props.order.status == "CANCELLED") ? true : false}>
                            <AiFillDelete />
                        </Button>
                    }
                </ButtonToolbar>
            </td>
        </tr>
    )
}

export default OrderTable;