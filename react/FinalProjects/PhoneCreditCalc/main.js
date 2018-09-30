import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import MainComponent from './MainComponent';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';


//reducer
var defaultState = {
    money: 0,
    credit: 0,
};
function mainReducer(state = defaultState, action) {
    switch (action.type) {
        case ("updateValue"): return { ...state, money: action.data.money, credit: action.data.credit }
        default: return state;
    }
}
//--------------------------------------

//Store & middlewares
var logger = createLogger({ collapsed: true });
var store = createStore( mainReducer, applyMiddleware(thunk, logger) );
//--------------------------------------


ReactDOM.render(<Provider store={store}><MainComponent /></Provider>, document.getElementById('container'));
