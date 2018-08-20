import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './stores/configureStore'



class MainComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}


ReactDOM.render(<Provider store={store}><MainComponent /></Provider>, document.getElementById('container'));
