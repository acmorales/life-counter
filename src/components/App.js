import React, { Component } from 'react';
import { Button, TextField, FormGroup } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import _ from 'lodash';

import Test from './Test.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      name: '',
      life: 40,
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit = () => {
    const { players, name, life } = this.state;
    const newPlayers = [...players, {
      name,
      life
    }];
    console.log(newPlayers);
    
    this.setState({
      players: newPlayers,
    });
  }

  render() {
    const { players, name } = this.state;
    const isReady = name.length > 0;

    const SmallField = withStyles({
      root: {
        width: 50,
        margin: 10,
      },
    })(TextField);

    return (
      <div className="App">
        <header className="App-header">
          <p>
          <SmallField id="life" helper='Starting life' type="number" defaultValue={40} padding="5px" onChange={this.handleChange}></SmallField>
          </p>
          <FormGroup className="form">
              {_.map(players, (player) => 
                <Test name={player.name}></Test>
              )}
            {players.length < 4 && (
              <li>
                <TextField id="name" className="form-item" placeholder="Enter name" onChange={this.handleChange}></TextField>
                <Button disabled={!isReady} onClick={this.handleSubmit}>Submit</Button>
              </li>
            )}
          </FormGroup>
        </header>
      </div>
    );
  }
}

export default App;
