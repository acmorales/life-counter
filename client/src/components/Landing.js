import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PlayerJoin from './PlayerJoin';
import { getRandomColor } from '../shared/helpers';

import '../styles/Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="page">
        <div className="menu">
          <Link to="/board/"><button type="button">HOST</button></Link>
          <Link to="/join/"><button type="button">JOIN</button></Link>
        </div>
      </div>
    );
  }
}

export default Landing;
