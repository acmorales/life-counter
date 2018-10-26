import React, { Component } from 'react';

import _ from 'lodash';

import PlayerCard from './PlayerCard';
import '../styles/LifeDisplay.css';

class LifeDisplay extends Component {

  getRandomColor = () => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  
    return bgColor;
  }

  render() {
    const test = [{name: 'Test', life: 23 }, {name: 'Andrew', life: 46 }, {name: 'Test', life: 18 }, {name: 'Test', life: 8 }];

    return (
      <div className="board">
        {_.map(test, (player) => {
          const color = this.getRandomColor();
          const styles = {
            backgroundColor: color,
          }

          return (
            <div style={styles}>
              <PlayerCard name={player.name.toUpperCase()} life={player.life} />
            </div>
          )
        })}
      </div>
    );
  }
}

export default LifeDisplay;