import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(multiplier, e){
        e.preventDefault();
        this.props.dispatch( {type:"addMultiplier",data:{mulName: "mul"+multiplier, mulValue:e.target.value }} );
    }

    getInputItem(mul){
        return (<div>
            <input type="number" onChange={this.handleChange.bind(this,mul)} value={this.props['mul'+mul]} /> X {mul} = {this.props['mul'+mul] * mul} <br />
        </div>)
    }

    render() {
        return (
            <div className='container'>
                <h1>Money Calculator</h1>
                <form>
                    {this.getInputItem(200)}
                    {this.getInputItem(100)}
                    {this.getInputItem(50)}
                    {this.getInputItem(20)}
                    {this.getInputItem(10)}
                    {this.getInputItem(5)}
                    {this.getInputItem(1)}
                </form>        
                <hr />
                <h1> Total Sum: 
                    { this.props.mul200*200 + this.props.mul100*100 + this.props.mul50*50 + this.props.mul20*20 + this.props.mul10*10 + this.props.mul5*5 + this.props.mul1*1}
                </h1>     
            </div>
        )
    }
}

MainComponent.propTypes = {
    // mul200: PropTypes.number.isRequired
}

export default connect((state, props) => {
    return {
        mul200: state.mul200,
        mul100: state.mul100,
        mul50: state.mul50,
        mul20: state.mul20,
        mul10: state.mul10,
        mul5: state.mul5,
        mul1: state.mul1,
    }
  })(MainComponent);
