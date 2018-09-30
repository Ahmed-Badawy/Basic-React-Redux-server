import React from 'react';
import renderer from "react-test-renderer";

import ArticleList from "../ArticleList";


const testProps = {
    articles: {
        a: { id: "a", title:"a" },
        b: { id: "b", title:"b" }
    },
    store: {
        lookupAuthors: jest.fn( ()=>({}) )
    }
}

// react-test-tenderer : snapshot technique to test the property.
describe("ArticleList", ()=>{
    test("ArticleList Renders Correctly", ()=>{
        const tree = renderer.create(<ArticleList {...testProps} />).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.children.length).toBe(2);
    })
})



// Shallow Testing With Enzyme
import {shallow, configure} from "enzyme"; 
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("ArticleList Shallow Testing", ()=>{
    test("ArticleList Renders Correctly with Shallow Snapshots", ()=>{
        const wrapper = shallow(<ArticleList {...testProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.getElement().props.children.length).toBe(2);
    })
})




