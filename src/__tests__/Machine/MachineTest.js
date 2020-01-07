import React from 'react'
import { shallow, configure } from 'enzyme'
import Machine from '../../components/Machine'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Machine /> with no props', () => {
    const container = shallow(<Machine />)
    it('should match the snapshot', () => {
        console.log("test")
    });
})

