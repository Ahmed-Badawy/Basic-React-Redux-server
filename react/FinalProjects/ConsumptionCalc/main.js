import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import MainComponent from './MainComponent';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';


//reducer
var defaultState = {
    consumptionType: "2018Home",
    consumption: 0,
    totalCost: 0,
    addedcost: 0,
    accumulative: []
};
function mainReducer(state = defaultState, action) {
    switch (action.type) {
        case ("changeConsumption"): return { ...state, consumption: action.data.consumption }
        case ("changeConsumptionType"): return { ...state, consumptionType: action.data.consumptionType }
        case ("updateResults"): return { ...state, totalCost: action.data.totalCost, addedCost: action.data.addedCost, accumulative: action.data.accumulative }
        default: return state;
    }
}
//--------------------------------------

//Store & middlewares
var logger = createLogger({ collapsed: true });
var store = createStore( mainReducer, applyMiddleware(thunk, logger) );
//--------------------------------------


ReactDOM.render(<Provider store={store}><MainComponent /></Provider>, document.getElementById('container'));
