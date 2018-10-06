import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";

import StateAPI from "server/api/StateAPI";
import App from "react/Tests&Learning/AdvancedReactjs/App";

const ReactServerRenderer = async ()=>{
    const rawData = await axios.get("http://localhost:3000/api/articlesApi");
    const store = new StateAPI(rawData.data);
    console.log("--------init----------")
    /*
        because we are loading the data in both backend & frontend again for the server render to work. 
        instead we can just pass the initData to the frontend using the Window object.
    */
    return {
        markup: ReactDOMServer.renderToString(<App store={store} />),
        initData: rawData.data,
        store
    }
}

// -------------------------------------------------------------------------------------------------------------------------
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainComponent from "react/Tests&Learning/AdvancedRedux/containers/MainComponent";
import ReduxReducers from 'react/Tests&Learning/AdvancedRedux/reducers';

const ReduxServerRenderer = async ()=>{
    const rawData = await axios.get("http://localhost:3000/api/articlesApi");
// TODO: inject the rawData into a reducer to use this thunk as it should be
// DAMN: hello world
    const store = createStore(ReduxReducers);
    let new_state = store.getState();
    new_state.finder.articlesArray = rawData.data;

    console.log("--------init----------");
    return {
        markup: ReactDOMServer.renderToString(<Provider store={store}><MainComponent /></Provider>),
        initData: new_state
    }
}


// -------------------------------------------------------------------------------------------------------------------------
export default {
    ReactServerRenderer,
    ReduxServerRenderer
};



