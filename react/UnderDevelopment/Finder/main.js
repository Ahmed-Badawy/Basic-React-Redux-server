import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './stores/configureStore';

import MainComponent from './containers/MainComponent';

import SASS from "./sass/1.scss";



ReactDOM.render(<Provider store={store}><MainComponent /></Provider>, document.getElementById('container'));
