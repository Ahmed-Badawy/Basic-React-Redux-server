import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleMoneyChange = this.handleMoneyChange.bind(this);
        this.handleCreditChange = this.handleCreditChange.bind(this);
        this.ratio = 1.42857142857;
    }

    handleMoneyChange(e){
        e.preventDefault();
        let value = e.target.value;
        let credit = (value / this.ratio).toFixed(2);
        this.props.dispatch( {type:"updateValue",data:{ money:value,credit }} );
    }
    handleCreditChange(e){
        e.preventDefault();
        let value = e.target.value;
        let money = (value * this.ratio).toFixed(2);
        this.props.dispatch( {type:"updateValue",data:{ credit:value, money }} );
    }

    render() {
        return (
            <div className='container'>
                <h1>Phone Credit Calculator</h1>
                <br />
                <form>
                <div className="form-group row">
                    <label htmlFor="money" className="col-sm-2 col-form-label col-form-label-lg">Money</label>
                    <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" id="money" onChange={this.handleMoneyChange} value={this.props.money} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="credit" className="col-sm-2 col-form-label col-form-label-lg">Credit</label>
                    <div className="col-sm-10">
                    <input type="number" className="form-control form-control-lg" id="credit" onChange={this.handleCreditChange} value={this.props.credit} />
                    </div>
                </div>
                </form>     
            </div>
        )
    }
}

MainComponent.propTypes = {
    // field: PropTypes.number.isRequired
}

export default connect((state, props) => {
    return {
        money: state.money,
        credit: state.credit,
    }
  })(MainComponent);








