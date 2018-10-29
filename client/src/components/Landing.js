import React, { Component } from 'react';
import { getRandomColor } from '../shared/helpers';

import '../styles/Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlayer: false,
      color: null,
    };
  }

  handleJoin = () => {
    const color = getRandomColor();
    this.setState({
      isPlayer: true,
      color,
    });
  }

  handleColorChange = () => {
    const color = getRandomColor();
    this.setState({
      color,
    });
  }

  render() {
    const { isPlayer, color } = this.state;
    const styles = {
      backgroundColor: color,
    };

    return (
      <div className="page" style={styles}>
        <div className="background" onClick={isPlayer ? this.handleColorChange : null} role="button" tabIndex={0} />
        {!isPlayer && (
          <div className="menu">
            <button type="button" href="https://github.com/acmorales/life-counter">HOST</button>
            <button type="button" onClick={this.handleJoin}>JOIN</button>
          </div>
        )}
        {isPlayer && (
          <div>
            <form className="playerForm">
              <input className="lifeInput" defaultValue={40} type="number" />
              <input placeholder="Enter name" autoFocus type="text" />
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Landing;
