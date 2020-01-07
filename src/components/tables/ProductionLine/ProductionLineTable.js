import React from 'react'
import { FaSyncAlt, FaPlus, FaPencilAlt, FaSearch, FaCheck } from 'react-icons/fa';
import { Dropdown, DropdownButton } from 'react-bootstrap'

const ProductionLineTable = props => (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Reference</th>
                <th scope="col">Machines</th>
            </tr>
        </thead>
        <tbody>
            {props.productionLines.map(productionLine => (
                <ProductionLineRow
                    productionLine={productionLine}
                    machines={props.machines}
                    editProductionLineRow={props.editProductionLineRow}
                    showUpdate={props.showUpdate} />
            ))}
        </tbody>
    </table>
)

const ProductionLineRow = props => {
    let listMachines = []
    props.productionLine.machines.forEach(machine => {
        props.machines.find(function (element) {
            if (element.id === machine) {
                listMachines.push(element)
            }
        })
    })

    const handleUpdate = event => {
        const newProductionLine = {
            id: props.productionLine.id,
            description: props.productionLine.description == null ? "" : props.productionLine.description,
            machine: props.productionLine.machine == null ? "" : props.productionLine.machine,
        }
        props.editProductionLineRow(newProductionLine)
        props.showUpdate()
    }

    return (
        <tr>
            <td>{props.productionLine.description}</td>
            <td>
                <DropdownButton alignCenter id="dropdown-menu-align-right" title="Machines" size="sm">
                    {listMachines.map(machine => (
                        <Dropdown.Item as="button" key={machine.id}>{machine.machineBrand} - {machine.machineModel}</Dropdown.Item>
                    ))}
                </DropdownButton>
            </td>
        </tr>
    )
}

export default ProductionLineTable;
