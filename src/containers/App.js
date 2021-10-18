import './App.css';
import Grid from '../components/Grid/grid';
import Row from '../components/Row/Row';
import {version} from '../../package.json';

import React, { Component } from 'react';

class App extends Component {
  onRowClicked(event) {
    const valueToSet = event.target.id.substr(4);
    const highlightedCells = document.getElementsByClassName('highlightCell');
    if (highlightedCells.length === 1) {
      if (valueToSet === '10') {
        // Clear from highlighted field
        highlightedCells[0].innerHTML = '';
      } else {
        highlightedCells[0].innerHTML = valueToSet;
        // Set the value to the selected cell
      }
      // Check if the logic is valid
    } else return;
  }
  render() {
    return (
      <div className="App">
        <h1><b>Play Sudoku</b></h1>
        <p className="version-info">{`(${version})`}</p>
        <Grid />
        <Row onBtnClicked={this.onRowClicked}/>
      </div>
    )
  }
}

export default App;
