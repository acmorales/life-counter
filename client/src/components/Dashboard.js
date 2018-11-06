import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import OpponentCard from './OpponentCard';
import '../styles/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    const {
      match: { params },
      socket,
    } = this.props;
    const { userId } = params;
    this.state = {
      socket,
      userId: params.userId,
      life: null,
      opponents: [],
    };

    socket.on('listUpdate', (list) => {
      this.setState({
        opponents: _.filter(list, (player) => player.id !== userId),
      });
    });
  }

  componentDidMount() {
    this.getInfo();
    this.getPlayers();
  }

  getInfo = async () => {
    const { userId } = this.state;
    const response = await fetch(`/user/?userId=${userId}`);
    const responseJSON = await response.json();

    if (response.status !== 200) throw Error(responseJSON.message);

    const { life } = responseJSON;
    this.setState({
      life,
      // color,
      // name,
    });
  }

  getPlayers = async () => {
    const { userId } = this.state;
    const response = await fetch('/getPlayers');
    const responseJSON = await response.json();

    if (response.status !== 200) throw Error(responseJSON.message);

    this.setState({
      opponents: _.filter(responseJSON, (player) => player.id !== userId),
    });
  }

  handleLifeChange = (update) => {
    const { socket, userId, life } = this.state;
    const newVal = life + update;
    const payload = {
      userId,
      life: newVal,
    };

    socket.emit('lifeUpdate', payload);

    this.setState({
      life: newVal,
    });
  }

  render() {
    const { opponents, userId, life } = this.state;

    return (
      <div className="page">
        <div className="opponentData">
          {_.map(opponents, (player) => (<OpponentCard key={userId} color={player.color} life={player.life} />))}
        </div>
        <div className="dashboard">
          <div className="life">{life}</div>
          <div className="updateButtons">
            <div onClick={() => this.handleLifeChange(-1)} role="button" tabIndex={0} />
            <div onClick={() => this.handleLifeChange(1)} role="button" tabIndex={0} />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  match: PropTypes.shape({}).isRequired,
  socket: PropTypes.shape({}).isRequired,
};

export default Dashboard;
