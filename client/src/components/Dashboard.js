import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketClient from 'socket.io-client';

import '../styles/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    const { match: { params } } = this.props;
    const socket = socketClient('http://192.168.1.66:5000');

    this.state = {
      socket,
      userId: params.userId,
      life: null,
      color: null,
      name: null,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const { userId } = this.state;
    const response = await fetch(`/user/?userId=${userId}`);
    const responseJSON = await response.json();

    if (response.status !== 200) throw Error(responseJSON.message);

    const { life, color, name } = responseJSON;
    this.setState({
      life,
      color,
      name,
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
    const {
      userId,
      name,
      color,
      life,
    } = this.state;

    return (
      <div className="dashboard">
        <button onClick={() => this.handleLifeChange(-1)} type="button">-</button>
        <p>{life}</p>
        <button onClick={() => this.handleLifeChange(1)} type="button">+</button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Dashboard;
