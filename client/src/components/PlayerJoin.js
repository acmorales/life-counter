import React, { Component } from 'react';

import { getRandomColor } from '../shared/helpers';
import '../styles/Landing.css';

class PlayerJoin extends Component {
  constructor(props) {
    super(props);

    const color = getRandomColor();

    this.state = {
      color,
    };
  }

  handleColorChange = () => {
    const color = getRandomColor();
    this.setState({
      color,
    });
  }

  render() {
    const { color } = this.state;
    const styles = {
      backgroundColor: color,
    };

    return (
      <div className="page" style={styles}>
        <div className="background" onClick={this.handleColorChange} role="button" tabIndex={0} />
        <form className="playerForm">
          <input className="lifeInput" defaultValue={40} type="number" />
          <input className="nameInput" placeholder="Enter name" autoFocus type="text" />
        </form>
      </div>
    );
  }
}

export default PlayerJoin;
