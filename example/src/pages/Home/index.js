import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (<div className="home-page">
      <ul>
        <li>
          <Link to="/about" data={x:1}>About</Link>
        </li>
      </ul>
    </div>);
  }
}
