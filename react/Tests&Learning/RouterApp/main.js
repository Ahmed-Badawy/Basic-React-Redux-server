import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";


const BasicExample = () => (
  <Router>
    <div className="container">
      <h1>Router</h1>
      <ul>
        <li> <NavLink to='/router' activeClassName='btn btn-primary'>Home</NavLink> </li>
        <li> <NavLink to='/about' activeClassName='btn btn-primary'>About</NavLink> </li>
        <li> <NavLink to='/topics' activeClassName='btn btn-primary'>Topics</NavLink> </li>
      </ul>

      <hr />

      <Route exact path="/router" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);




ReactDOM.render(<BasicExample />, document.getElementById('container'));