import React, { Component } from 'react';

import _ from 'lodash';

import PlayerCard from './PlayerCard';
import '../styles/LifeDisplay.css';

class LifeDisplay extends Component {
  getRandomColor = () => {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    return `rgb(${x}, ${y}, ${z})`;
  }

  render() {
    const test = [
      { name: 'Test', life: 23 },
      { name: 'Longer Name', life: 8 },
      { name: 'Andrew', life: 46 },
      { name: 'Test', life: 18 },
      { name: 'Test', life: 100 },
    ];

    return (
      <div className="board">
        {_.map(test, (player) => {
          const color = this.getRandomColor();
          const styles = {
            backgroundColor: color,
          };

          return (
            <div style={styles}>
              <PlayerCard name={player.name.toUpperCase()} life={player.life} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default LifeDisplay;
