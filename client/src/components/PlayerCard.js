import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/LifeDisplay.css';

class PlayerCard extends Component {
  render() {
    const { name, life } = this.props;

    return (
      <div className="player_card">
        <div className="player_info">
          <div className="player_life">{life}</div>
          <div className="player_name">{name}</div>
        </div>
      </div>
    );
  }
}

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
};

export default PlayerCard;
