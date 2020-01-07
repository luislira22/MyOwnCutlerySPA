import React from 'react'
import { shallow, configure } from 'enzyme'
import { expect } from 'chai'
import MachineTypeTable from '../../components/tables/MachineType/MachineTypeTable'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<MachineTypeTable />', () => {
    it('Row criada', () => {
        const wrapper = shallow(<MachineTypeTable
            machineTypes={[]}
            operations={[]} />)
        expect(wrapper.find('tr')).to.have.lengthOf(1)
    })


    it('Type present in the table', () => {
        const wrapper = shallow(<MachineTypeTable
            machineTypes={[]}
            operations={[]} />)
        expect(wrapper.find('table').text()).to.contain('Type')
    })

    it('Operations present in the table', () => {
        const wrapper = shallow(<MachineTypeTable
            machineTypes={[]}
            operations={[]} />)
        expect(wrapper.find('table').text()).to.contain('Operations')
    })
})