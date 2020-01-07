import React from 'react'
import { shallow, configure } from 'enzyme'
import { expect } from 'chai'
import OperationTable from '../../components/tables/Operation/OperationTable'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<OperationTable />', () => {
    it('Row criada', () => {
        const wrapper = shallow(<OperationTable
            operations={[]}/>)
        expect(wrapper.find('tr')).to.have.lengthOf(1)
    })

    it('Description present in the table', () => {
        const wrapper = shallow(<OperationTable
            operations={[]}/>)
        expect(wrapper.find('table').text()).to.contain('Description')
    })

    it('Duration present in the table', () => {
        const wrapper = shallow(<OperationTable
            operations={[]}/>)
        expect(wrapper.find('table').text()).to.contain('Duration')
    })

    it('Tool present in the table', () => {
        const wrapper = shallow(<OperationTable
            operations={[]}/>)
        expect(wrapper.find('table').text()).to.contain('Tool')
    })
})