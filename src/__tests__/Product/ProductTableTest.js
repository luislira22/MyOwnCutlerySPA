import React from 'react'
import { shallow, configure } from 'enzyme'
import { expect } from 'chai'
import ProductTable from '../../components/tables/Product/ProductTable'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('<Product Table />', () => {
    it('Row criada', () => {
        const wrapper = shallow(<ProductTable 
            products={[]}/>)
        expect(wrapper.find('tr')).to.have.lengthOf(1)
    })

    it('Reference present in the table', () => {
        const wrapper = shallow(<ProductTable
            products={[]} />)
        expect(wrapper.find('table').text()).to.contain('Reference')
    })

    it('Manufacturing Plan Type present in the table', () => {
        const wrapper = shallow(<ProductTable
            products={[]} />)
        expect(wrapper.find('table').text()).to.contain('Manufacturing Plan')
    })

})