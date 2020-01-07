import React from 'react'
import { shallow, configure } from 'enzyme'
import { expect } from 'chai'
import ProductionLineTable from '../../components/tables/ProductionLine/ProductionLineTable'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<ProductionLineTable />', () => {

    it('Row criada', () => {
        const wrapper = shallow(<ProductionLineTable
            machines={[]}
            productionLines={[]} />)
        expect(wrapper.find('tr')).to.have.lengthOf(1)
    })

    it('Reference present in the table', () => {
        const wrapper = shallow(<ProductionLineTable
            machines={[]}
            productionLines={[]} />)
        expect(wrapper.find('table').text()).to.contain('Reference')
    })

    it('Machines present in the table', () => {
        const wrapper = shallow(<ProductionLineTable
            machines={[]}
            productionLines={[]} />)
        expect(wrapper.find('table').text()).to.contain('Machines')
    })

})