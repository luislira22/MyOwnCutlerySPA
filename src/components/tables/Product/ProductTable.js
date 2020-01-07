import React from 'react'
import { DropdownButton, ButtonToolbar, Button } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa';

const ProductTable = props => (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Reference</th>
                {props.showManufacturingPlan && <th scope="col">Manufacturing Plan</th>}
                {props.showStartOrder && <th scope="col"></th>}
            </tr>
        </thead>
        <tbody>
            {props.products.map(product => (
                <ProductRow
                    key={product.id}
                    product={product}
                    operations={props.operations}
                    showManufacturingPlan={props.showManufacturingPlan}
                    showCreate={props.showCreate}
                    setProduct={props.setProduct}
                    showStartOrder={props.showStartOrder}
                />
            ))}
        </tbody>
    </table>
)

const ProductRow = props => {
    let manufacturingPlanOperations = []

    const handleNewOrder = () => {
        props.setProduct(props.product)
        props.showCreate();
    }

    props.product.plan.operations.forEach(operation => {
        props.operations.find(function (element) {
            if (element.id === operation.id) {
                manufacturingPlanOperations.push(element)
            }
        })
    })

    return (
        <tr>
            <td>{props.product.ref}</td>
            {props.showManufacturingPlan &&
                <td>
                    <DropdownButton alignCenter id="dropdown-menu-align-right" title="Operations" size="sm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Tool</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manufacturingPlanOperations.map(operation => (
                                    <tr key={operation.id}>
                                        <td>{operation.description}</td>
                                        <td>{operation.tool}</td>
                                        <td>{operation.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </DropdownButton>
                </td>
            }
            {props.showStartOrder &&
                <td>
                    <ButtonToolbar style={{ float: "right" }}>
                        <Button size="sm" variant="light" onClick={handleNewOrder}>
                            Create Order <FaPlus />
                        </Button>
                    </ButtonToolbar>
                </td>
            }
        </tr>
    )
}

export default ProductTable
