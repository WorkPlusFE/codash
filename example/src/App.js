import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Base from './pages/Base';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/base/:hook/:action" component={Base} />
        </div>
      </Router>
    );
  }
}

export default App;
