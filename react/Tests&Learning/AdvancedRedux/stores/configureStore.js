
//this is mainly the middleware functionality. Middlewares are a pass by step between actions & reducers... 

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './../reducers';

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



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let getStore = function(preLoadedState={}){
    let store = createStore(
        rootReducer,
        preLoadedState,
        composeEnhancers (applyMiddleware(customMiddleWare, thunk, logger))
    );
    return store;
}
export default getStore;

