import React, { Component } from 'react';
import _ from 'lodash';
import socketClient from 'socket.io-client';

import PlayerCard from './PlayerCard';

import '../styles/LifeDisplay.css';

class LifeDisplay extends Component {
  constructor(props) {
    super(props);

    const socket = socketClient('http://localhost:5000');

    this.state = {
      players: [],
    };

    socket.on('listUpdate', (list) => {
      this.setState({
        players: list,
      });
    });
  }

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers = async () => {
    const response = await fetch('/getPlayers');
    const responseJSON = await response.json();

    if (response.status !== 200) throw Error(responseJSON.message);

    this.setState({
      players: responseJSON,
    });
  }

  render() {
    const { players } = this.state;

    return (
      <div className="board">
        {_.map(players, (player) => {
          const { color } = player;
          const styles = {
            backgroundColor: color,
          };

          return (
            <div key={player.id} style={styles}>
              <PlayerCard key={player.id} name={player.name.toUpperCase()} life={player.life} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default LifeDisplay;
