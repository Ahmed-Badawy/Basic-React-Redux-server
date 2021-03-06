
//this is mainly the middleware functionality. Middlewares are a pass by step between actions & reducers... 

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

import { createLogger } from 'redux-logger';
let logger = createLogger({ collapsed: true })


// Famous Redux Middlewares: Redux Thunk, Redux Logger, Redux Saga, Redux Promise, Redux Reporter, Redux Undo
let customMiddleWare = store=>next=>action=>{
    console.group("Custom Middleware");
        console.log('Dispatching', action)
        console.log('Next State:', store.getState())
    console.groupEnd();
    let result = next(action); 
    return result;
}


let store = createStore(
    rootReducer,
    applyMiddleware(customMiddleWare, thunk, logger)
);

export default store;
