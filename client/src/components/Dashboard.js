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
      timer: null,
      longPressActivated: false,
    };

    socket.on('listUpdate', (list) => {
      const currUser = _.find(list, (user) => user.id === userId);
      this.setState({
        life: currUser.life,
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

  handleIncrement = () => {
    const { socket, userId, life } = this.state;

    socket.emit('increment', { userId, life });
  }

  handleDecrement = () => {
    const { socket, userId, life } = this.state;

    socket.emit('decrement', { userId, life });
  }

  handleButtonPress = (func) => {
    this.setState({
      timer: setInterval(() => this.interval(func), 500),
    });
  }

  handleButtonRelease = () => {
    const { timer } = this.state;
    clearTimeout(timer);
  }

  captureClick = (e) => {
    const { longPressActivated } = this.state;
    if (longPressActivated) {
      e.stopPropagation(); // do not fire onClick if press and hold
      this.setState({
        longPressActivated: false,
      });
    }
  }

  interval = (func) => {
    const { socket, userId, life } = this.state;

    this.setState({
      longPressActivated: true,
    });

    socket.emit(func, { userId, life });
  }

  render() {
    const { opponents, userId, life } = this.state;

    return (
      <div className="page">
        {opponents.length > 0 && (
          <div className="opponentData">
            {_.map(opponents, (player) => (<OpponentCard key={userId} color={player.color} life={player.life} />))}
          </div>
        )}
        <div className="dashboard" onClickCapture={this.captureClick}>
          <div className="life">{life}</div>
          <div className="updateButtons">
            <div
              onClick={this.handleDecrement}
              onTouchStart={() => this.handleButtonPress('decrementFive')}
              onTouchEnd={this.handleButtonRelease}
              onMouseDown={() => this.handleButtonPress('decrementFive')}
              onMouseUp={this.handleButtonRelease}
              role="button"
              tabIndex={0}
            />
            <div
              onClick={this.handleIncrement}
              onTouchStart={() => this.handleButtonPress('incrementFive')}
              onTouchEnd={this.handleButtonRelease}
              onMouseDown={() => this.handleButtonPress('incrementFive')}
              onMouseUp={this.handleButtonRelease}
              role="button"
              tabIndex={0}
            />
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
