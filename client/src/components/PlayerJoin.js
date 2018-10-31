import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import socketClient from 'socket.io-client';
import uuidv4 from 'uuid/v4';

import { getRandomColor } from '../shared/helpers';
import '../styles/Landing.css';

class PlayerJoin extends Component {
  constructor(props) {
    super(props);

    const id = uuidv4();
    const color = getRandomColor();
    const socket = socketClient('http://localhost:5000');


    this.state = {
      socket,
      color,
      id,
      name: null,
      life: 40,
    };
  }

  handleColorChange = () => {
    const color = getRandomColor();
    this.setState({
      color,
    });
  }

  handleChange = (e, field) => {
    const newVal = e.target.value;

    this.setState({
      [field]: newVal,
    });
  }

  handleSubmit = () => {
    const {
      socket,
      id,
      color,
      name,
      life,
    } = this.state;
    const payload = {
      id,
      name,
      life,
      color,
    };

    socket.emit('playerJoin', payload);
  }

  render() {
    const { id, color, life } = this.state;
    const styles = {
      backgroundColor: color,
    };

    return (
      <div className="page" style={styles}>
        <div className="background" onClick={this.handleColorChange} role="button" tabIndex={0} />
        <form className="playerForm">
          <input className="lifeInput" onChange={(e) => this.handleChange(e, 'life')} defaultValue={life} type="number" />
          <input className="nameInput" onChange={(e) => this.handleChange(e, 'name')} placeholder="Enter name" autoFocus type="text" />
          <Link to={`/dashboard/${id}`}><button type="button" onClick={this.handleSubmit}>Submit</button></Link>
        </form>
      </div>
    );
  }
}

export default PlayerJoin;
