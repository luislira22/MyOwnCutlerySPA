import React from 'react'
import { shallow, configure } from 'enzyme'
import { expect } from 'chai'
import MachineTable from '../../components/tables/Machine/MachineTable'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const machines = [
    {
        "id": "7ecc878c-e895-462c-8db7-a354be18d074",
        "machineType": "13c24685-c846-4f15-8180-fafcc4ec07a1",
        "machineBrand": "Siemens",
        "machineModel": "QC-450",
        "machineLocation": "Sector 10"
    }
]
const machineTypes = [
    {
        "id": "13c24685-c846-4f15-8180-fafcc4ec07a1",
        "type": "Martelador",
        "operations": [
            "ef6715db-414d-48ed-9032-29bc2b4b13da",
            "6bface2e-d3a9-447f-a093-4a277f533352"
        ]
    }
]

describe('<MachineTable />', () => {
    it('Row criada', () => {
        const wrapper = shallow(<MachineTable
            machines={machines}
            machineTypes={machineTypes} />)
        expect(wrapper.find('tr')).to.have.lengthOf(1)
    })

    it('Row criada', () => {
        const wrapper = shallow(<MachineTable
            machines={machines}
            machineTypes={machineTypes} />)
        expect(wrapper.find('tr')).to.have.lengthOf(1)
    })

    it('Machine Location present in the table', () => {
        const wrapper = shallow(<MachineTable
            machines={machines}
            machineTypes={machineTypes} />)
        expect(wrapper.find('table').text()).to.contain('Location')
    })

    it('Machine Type present in the table', () => {
        const wrapper = shallow(<MachineTable
            machines={machines}
            machineTypes={machineTypes} />)
        expect(wrapper.find('table').text()).to.contain('Machine Type')
    })

    it('Machine Brand present in the table', () => {
        const wrapper = shallow(<MachineTable
            machines={machines}
            machineTypes={machineTypes} />)
        expect(wrapper.find('table').text()).to.contain('Brand')
    })

    it('Machine Model present in the table', () => {
        const wrapper = shallow(<MachineTable
            machines={machines}
            machineTypes={machineTypes} />)
        expect(wrapper.find('table').text()).to.contain('Model')
    })

})