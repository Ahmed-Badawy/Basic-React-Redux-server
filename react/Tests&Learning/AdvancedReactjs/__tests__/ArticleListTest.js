import React from 'react';
import renderer from "react-test-renderer";

import ArticleList, { Comp2, Comp3 } from "../ArticleList";  //this means ArticleList is the default export & the Comp2 is just a normal export...


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
        expect(tree.children.length).toBe(5);
    })
})



// enzyme gives you shallow rendering, that means render the component without rendering it's subComponents. 
// there are also mount rendering, it supports rendering all subComponents.
// Shallow Testing With Enzyme
import {shallow, configure, mount} from "enzyme"; 
import Adapter from 'enzyme-adapter-react-16';
import toJson from "enzyme-to-json";
configure({ adapter: new Adapter() });

const wrapper = shallow(<ArticleList {...testProps} />);

//you can update the enzyme snapshot pressing the (u) button.
describe("ArticleList Shallow Testing", ()=>{
    test("ArticleList Renders Correctly with Shallow Snapshots", ()=>{
        // console.log(wrapper.debug()); //this will debug the wrapper content

        //Now we will test the snapshot feature:- 
           //this will create a snapshot folder & test it to match the last snapshot. press u to update the snapshot taken.
        expect(wrapper).toMatchSnapshot(); 
        expect(wrapper.getElement().props.children.length).toBe(4);
    });
    //if you want a more readable test snapshot you can use the toJson from the enzyme-to-json lib. it saves the snapshot in a more readable format.
    test("json snapshot", ()=>{ expect(toJson(wrapper)).toMatchSnapshot() })
    test("Contain one Comp1 Element", ()=>{
        expect(wrapper.find("Comp1").length).toBe(1); // this means find only one <Comp1> tag
        expect(wrapper.find(".class1").exists()).toBe(true); // this means find only one .class1 className
        expect(wrapper.find({href: "google.com"}).exists()).toBe(true);
    });
});

describe("Testing Some Stuff", ()=>{
    test("testing Component Props", ()=>{
        //this is how we test the passed props of a wrapper
        expect(wrapper.instance().props.articles).toBe(testProps.articles);

//there are a deference between testing the passed props & testing the existing properties on the item it self:-
    //as you can see in here first test is on the passed address passed prop. but the second one is on the rendered href property....
        const wrapper2 = shallow(<Comp2 text="Hello World" address="google.com" />);
        expect(wrapper2.instance().props.address).toBe("google.com"); //testing passed address
        expect(wrapper2.props().href).toBe("google.com"); //testing rendered href

//now we are going to set the hide to true & test if the component returns null:-
        wrapper2.setProps({hide:true}); //setProps({}) helps you render the wrapper again with new props...
        expect(wrapper2.get(0)).toBeNull(); // .toBeNull() is the same as .toBe(null)
    });
});


describe("Mount Rendering", ()=>{
    test("mount rendering 1", ()=>{
        let wrapper3 = mount(<ArticleList {...testProps} />);
        expect(toJson(wrapper3)).toMatchSnapshot();
        wrapper3.unmount();
    })
    test("mount rendering 2", ()=>{
        let wrapper3 = mount(<Comp2 text="Hello World from mount" address="mount.com" />);
        expect(wrapper3.find('a').text()).toBe("Hello World from mount");
        wrapper3.unmount();
    })
});


describe("Advanced Features", ()=>{
    const wrapper4 = shallow(<Comp3 />)
    test("Testing Actions", ()=>{

    //testing button click:- 
        expect(wrapper4.find('.button-state').text()).toBe("No"); //the init value is No
        const button = wrapper4.find("button");
        button.simulate('click'); //this simulate a click event on the button.
        expect(wrapper4.find('.button-state').text()).toBe("Yes");      

    //testing input change event:-
        const input = wrapper4.find("input");
        expect(wrapper4.find('h2').text()).toBe("");   
        input.simulate('change', {currentTarget: {value:"Taylor"}}); //simulate( "change", eventToPassToComponent )
        expect(wrapper4.find('h2').text()).toBe("Taylor");   
    })

    test("Testing Methods",()=>{
        expect(wrapper4.instance().method1("one")).toBe("two");
    })
    // check testing with redux: https://egghead.io/lessons/react-test-redux-connect-components-with-enzyme
    // check testing forms here: https://egghead.io/lessons/react-testing-react-forms-with-enzyme


    
//-----------------------------------------------------------------------------
//This Section is not working, don't know why. please check this video: https://egghead.io/lessons/react-test-react-component-lifecycle-methods-with-enzyme
    // test("Calls ComponentDidMount", ()=>{
    //     jest.spyOn(Comp3.prototype, "componentDidMount");
    //     const wrapper5 = mount(<Comp3 />);
    //     // console.error(Comp3.prototype.componentDidMount);
    //     // expect(Comp3.prototype.componentDidMount.mock.calls.length).toBe(1);
    //     expect(wrapper5.find(".lifeCycle").text()).toBe('cdm');
    // })
    // test("Calls ComponentWillReceiveProps", ()=>{
    //     const spy = jest.spyOn(Comp3.prototype, "componentWillReceiveProps");
    //     const wrapper5 = mount(<Comp3 />);
    //     // console.error(Comp3.prototype.componentDidMount);
    //     // expect(Comp3.prototype.componentDidMount.mock.calls.length).toBe(1);
    //     expect(wrapper5.find(".lifeCycle").text()).toBe('cwrp');
    //     wrapper5.instance().componentWillReceiveProps();
    //     expect(spy).toHaveBeenCalled();
    // })
//--------------------------------------------------------------------------------
})



/*
- shallow can take second params to pass context & bypass the ComponentDidMount method, EX:
        const wrapper = shallow(<ArticleList {...testProps} />, { context:{}, disableLifecycleMethods:true });
- in the .find() you can use these tings:-
        - css selectors EX: 
                - Tag name  ("Comp1")
                - Class name  (".class1")
                - ID ("#id1")
                - attribute ("[href='google.com']")
                - attrubutes the second way ({href: "google.com"})
                - compinations ("Comp1 > .class1")
*/




