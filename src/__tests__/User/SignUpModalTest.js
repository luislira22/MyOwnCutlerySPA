import React from 'react'
import { shallow, configure } from 'enzyme'
import { expect } from 'chai'
import SignUpModal from '../../components/modals/SignUpModal'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<SignUpModal />', () => {

    it('Sign Up Modal Created with all fields', () => {
        const wrapper = shallow(<SignUpModal/>)
        console.log(wrapper)
        expect(wrapper.find('FormGroup')).to.have.lengthOf(10);
    })

})