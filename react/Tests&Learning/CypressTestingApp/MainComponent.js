import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';


class MainComponent extends React.Component {

    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        // console.log(this.myRef);
        let tasks_promise = await axios.get("/api/tasks");
        this.props.dispatch({ type: "ActionOne", data: { tasks: tasks_promise.data.tasks } });
    }

    // handleChange(e){
    //     e.preventDefault();
    //     let value = e.target.value;
    //     this.props.dispatch( {type:"ActionOne",data:{field:value}} );
    // }

    render() {
        console.log(this.props.tasks);
        return (
            <div className='container'>
                <h1>Tasks</h1>
                <ul>
                    {this.props.tasks.map(item =>
                        <li key={item.id}>{item.name}</li>
                    )}
                </ul>
            </div>
        )
    }
}

MainComponent.propTypes = {
    // field: PropTypes.number.isRequired
    //custom validators
    // field: function(props, propName, componentName){ if(props[propName]<5) throw new Error(`${propName} must be greater than 5`) }
}

export default connect((state, props) => {
    return {
        field: state.field,
        tasks: state.tasks
    }
})(MainComponent);
