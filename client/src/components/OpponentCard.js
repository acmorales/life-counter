import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OpponentCard extends Component {
  render() {
    const { color, life } = this.props;

    return (
      <div className="card">
        <div className="opponentStripe" style={{ backgroundColor: color }} />
        <div className="opponentLife">{life}</div>
      </div>
    );
  }
}

OpponentCard.propTypes = {
  color: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
};

export default OpponentCard;
