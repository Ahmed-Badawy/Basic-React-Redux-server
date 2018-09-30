import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import MainComponent from './MainComponent';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';


//reducer
var defaultState = {
    mul200: 0,
    mul100: 0,
    mul50: 0,
    mul20: 0,
    mul10: 0,
    mul5: 0,
    mul1: 0,
};
function mainReducer(state = defaultState, action) {
    if(!action.data) return state;
    let obj = {};
    obj[action.data.mulName] = action.data.mulValue;
    switch (action.type) {
        case ("addMultiplier"): return { ...state, ...obj }
        default: return state;
    }
}
//--------------------------------------

//Store & middlewares
var logger = createLogger({ collapsed: true });
var store = createStore( mainReducer, applyMiddleware(thunk, logger) );
//--------------------------------------


ReactDOM.render(<Provider store={store}><MainComponent /></Provider>, document.getElementById('container'));
