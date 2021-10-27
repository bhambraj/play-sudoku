import './App.css';
import Grid from '../components/Grid/grid';
import ActionRow from '../components/ActionRow/ActionRow';
import {version} from '../../package.json';

import React, { Component } from 'react';

import puzzle from '../samplePuzzleData/puzzle__1';
const SudokuService = require('../shared/SudokuService.js');
const {solver, isValidInput} = require('../shared/solver3.js');

class App extends Component {
	constructor(props) {
		super(props);
		this.solveSudoku = this.solveSudoku.bind(this);
		this.onActionRowClicked = this.onActionRowClicked.bind(this);
		this.sudokuSrv = new SudokuService(puzzle);
		this.state = {
			sudokuBoard: this.sudokuSrv.generateInitialPuzzle(puzzle),
		};
	}
  
  onActionRowClicked = e => {
    const valueToSet = parseInt(e.target.id.substr(4), 10);
    const highlightedCells = document.getElementsByClassName('activeCell');
    if (highlightedCells.length < 1 || highlightedCells.length > 1) return;
    const activeCellIndex = highlightedCells[0].id.substr(5);
	const parsedRowIdx = parseInt(activeCellIndex.substr(0, 1), 10);
	const parsedColIdx = parseInt(activeCellIndex.substr(1, 1), 10);
	const parsedValueToSet = parseInt(valueToSet, 10);
	const boardAtTheMoment = this.sudokuSrv.generate2D(this.state.sudokuBoard);
	const isValid = isValidInput(boardAtTheMoment, parsedValueToSet, parsedRowIdx, parsedColIdx);
 
	if (isValid) {
		this.setState((prevState) => {
			const solvedSudokuBoard = prevState.sudokuBoard.map((obj) => {
				const ridx = obj.positionIdx.substr(0, 1);
				const cidx = obj.positionIdx.substr(1, 1);
				const activeCell_ridx = parseInt(activeCellIndex.substr(0,1), 10);
				const activeCell_cidx = parseInt(activeCellIndex.substr(1,1), 10);
				if (activeCell_ridx === ridx && activeCell_cidx === cidx) {
					obj.value = valueToSet;
				}
				return obj;
			});
			return {sudokuBoard: solvedSudokuBoard}
		});
	} else {
		alert('Invalid Input');
	}
  }

  solveSudoku() {
	const {status, boardHashMap} = solver(puzzle);
	if (status === 'SUCCESS') {
		console.log('Sudoku Solved')
		this.setState((prevState) => {
			const solvedBoard = prevState.sudokuBoard.map((obj) => {
				const ridx = obj.positionIdx.substr(0, 1);
				const cidx = obj.positionIdx.substr(1, 1);
				const shouldUpdateCell = !!boardHashMap[`${ridx}${cidx}`];
				if (!shouldUpdateCell) return obj;
				obj.value = boardHashMap[`${ridx}${cidx}`];
				return obj;
			});
			return {sudokuBoard: solvedBoard};
		});
	} else {
		console.log('Error occured while solving Sudoku');
	}
  }

  render() {
    return (
      <div className="App">
        <h1><b>Play Sudoku</b></h1>
        <p className="version-info">{`(${version})`}</p>
        <div className="sudokuboard-container">
          <Grid sudokuBoard={this.state.sudokuBoard} />
          <ActionRow onBtnClicked={this.onActionRowClicked}/>
		  <button onClick={this.solveSudoku}>Solve Me</button>
        </div>
      </div>
    );
  }
}

export default App;
