import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MainComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        console.log(this.myRef);
        let myVal = await new Promise( resolve=>setTimeout(_=>resolve("Await Sync Done"), 2000) );
        console.log(myVal);
    }

    handleChange(e){
        e.preventDefault();
        let value = e.target.value;
        this.props.dispatch( {type:"ActionOne",data:{field:value}} );
    }

    render() {
        return (
            <div className='container'>
                <h1>Fuel Calculator</h1>
                <form>
                    <input ref={input=>this.myRef=input} onChange={this.handleChange} value={this.props.field} />
                </form>                
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
    }
  })(MainComponent);
