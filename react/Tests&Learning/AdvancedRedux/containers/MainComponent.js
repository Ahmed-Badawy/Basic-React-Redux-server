import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import debounce from 'lodash.debounce';

import FinderForm from './FinderForm'
import ResultsTable from '../components/ResultsTable'
import * as actions from '../actions/actions';


class MainComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='container'>
                <h1>The Finder</h1>
                { this.props.errorMsg && (<div className="errorMsg">{this.props.errorMsg}</div>) }
                <FinderForm />
                <ResultsTable InjectedData={this.props.articlesArray} />
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        errorMsg: state.error.errorMsg,
        articlesArray: state.finder.articlesArray
    }
}
export default connect(mapStateToProps)(MainComponent);
