import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

class FinderForm extends React.Component{
    constructor(props) {
      super(props);
      this.state = {};
    }  

    handlePlaceChange(...params){
      let event = params.pop();
      this.props.dispatch(actions.changeSearchPlace(event.target.value));
      this.props.dispatch(actions.updateResultsTable(event.target.value));
    }
    handleResultsNumberChange(...params){
      let event = params.pop();
      this.props.dispatch(actions.changeResultsNumber(event.target.value));
      this.props.dispatch(actions.ajaxCallThunk(this.props.resultsNumber));
    }
    handleCategoryChange(event){ this.props.dispatch(actions.changeCategory(event.target.value)) }

    render(){
        return (
            <form className="row">
            <div className="form-group col-sm">
                <label htmlFor="searchFor">Search For</label>
                <select className='form-control' id='searchFor' onChange={this.handleCategoryChange.bind(this)} value={this.props.searchCategory}>
                  <option value='Hospitals'>Hospitals</option>
                  <option value='Restaurants'>Restaurants</option>
                  <option value='ATM Machines'>ATM Machines</option>
                  <option value='Post Offices'>Post Offices</option>
                </select>
              </div>            
              <div className="form-group col-sm">
                <label htmlFor="searchPlace">Search Place/Town</label>
                <input type="text" className="form-control" id="searchPlace" placeholder="Enter Search Place/Town" onChange={this.handlePlaceChange.bind(this)} value={this.props.searchPlace}/>
              </div>
              <div className="form-group col-sm-1">
                <label htmlFor="ShowedResults">Results</label>
                <select className='form-control' id='ShowedResults' onChange={this.handleResultsNumberChange.bind(this)} value={this.props.resultsNumber}>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                </select>
              </div>
            </form>
        )
    }
}


const mapStateToProps = (state, props) => {
  return {
    searchPlace: state.finder.searchPlace,
    resultsNumber: state.finder.resultsNumber,
    searchCategory: state.finder.searchCategory
  }
}
export default connect(mapStateToProps)(FinderForm);

