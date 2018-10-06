import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import getStore from './stores/configureStore';

import MainComponent from './containers/MainComponent';
import SASS from "./sass/1.scss";


const preLoadedState = window.__initData__;
const store = getStore(preLoadedState);
delete window.__initData__;

ReactDOM.hydrate(<Provider store={store}><MainComponent /></Provider>, document.getElementById('container'));
