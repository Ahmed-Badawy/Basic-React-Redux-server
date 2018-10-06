import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import StateAPI from "server/api/StateAPI";
import thunk from 'redux-thunk';

const __initData__ = window.__initData__;
const store = new StateAPI(__initData__);
delete window.__initData__;

ReactDOM.hydrate( <App store={store} />, document.getElementById('container') );



