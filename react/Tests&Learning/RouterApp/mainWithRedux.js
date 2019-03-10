import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import MainComponent from './MainComponent';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

const BasicExample = () => (
  <Router>
    <div className="container">
      <h1>Router</h1>
      <ul>
        <li> <NavLink to='/learn/routerAppWithRedux/router' activeClassName='btn btn-primary'>Home</NavLink> </li>
        <li> <NavLink to='/learn/routerAppWithRedux/about' activeClassName='btn btn-primary'>About</NavLink> </li>
        <li> <NavLink to='/learn/routerAppWithRedux/topics' activeClassName='btn btn-primary'>Topics</NavLink> </li>
        <li> <NavLink to='/learn/routerAppWithRedux/main' activeClassName='btn btn-primary'>Main Comp</NavLink> </li>
      </ul>
      <hr />
      <Route exact path="/learn/routerAppWithRedux/router" component={Home} />
      <Route path="/learn/routerAppWithRedux/about" component={About} />
      <Route path="/learn/routerAppWithRedux/topics" component={Topics} />
      <Route path="/learn/routerAppWithRedux/main" component={MainComponent} />
    </div>
  </Router>
);

const Home = () => ( <div> <h2>Home</h2> </div> );
const About = () => ( <div> <h2>About</h2> </div> );
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li> <Link to={`${match.url}`} exact>null it</Link> </li>
      <li> <Link to={`${match.url}/rendering`}>Rendering with React</Link> </li>
      <li> <Link to={`${match.url}/components`}>Components</Link> </li>
      <li> <Link to={`${match.url}/props-v-state`}>Props v. State</Link> </li>
    </ul>

    <Route exact path={match.url} render={() => <h3>Please select a topic.</h3>} />
    <Route path={`${match.url}/:topicId`} component={Topic} />
  </div>
);

const Topic = ({ match }) => ( <div> <h3>{match.params.topicId}</h3> </div> );


//reducer
var defaultState = {
    field: "tanta",
};
function mainReducer(state = defaultState, action) {
    switch (action.type) {
        case ("ActionOne"): return { ...state, field: action.data.field }
        default: return state;
    }
}
//--------------------------------------

//Store & middlewares
var logger = createLogger({ collapsed: true });
var store = createStore( mainReducer, applyMiddleware(thunk, logger) );
//--------------------------------------


const Root = () => (
      <Router>
        <BasicExample />
      </Router>
  )


// ReactDOM.render(<Root store={store}></Root>, document.getElementById('container'));
ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('container'));




