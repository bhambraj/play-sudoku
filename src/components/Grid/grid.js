import React, { Component } from 'react';
import Cell from '../Cell/Cell.js';
import './grid.css';
import puzzle from '../../samplePuzzleData/puzzle__1';
class Grid extends Component {
    constructor() {
        super()
        const sudokuArray = [];
        const disabledIndicesForSudoku = []
        puzzle.forEach((elm) => {
            elm.forEach((val) => {
                sudokuArray.push(val);
                if (val) {
                    disabledIndicesForSudoku.push(sudokuArray.length-1)
                }
            });
        });
        this.state = {
            sudokuArray,
            disabledIndicesForSudoku
        };
    }

    cellClicked(event) {
        // If a cell is filled in with a value from the puzzle itself, there should be no further action allowed
        const isDisabledCell = event.target.className.toString().indexOf('disabled') !== -1;
        if (isDisabledCell) return;
        /**
         * Cells active state should change to the recently clicked cell
         * Removes previously selected section
         */
        const highlightedCells = document.getElementsByClassName('activeCell');
        for (let item of highlightedCells) {
            const classNames = item.className;
            item.className = classNames.replace(' activeCell', '');
        }
        event.target.className += ' activeCell';
    }

    render() {
        let rowNum = 0;
        let colNum = 0;
        return (
            <div className="container">
                <div className="grid">
                    {
                        this.state.sudokuArray.map((elem, idx) => {
                            /**
                             * If we are the end of the row, that means we need to move to next row
                             * and first column
                             */
                            const idxModulus = idx % 9;
                            if (idxModulus === 0 && idx !== idxModulus) {
                                rowNum = parseInt(rowNum) + 1;
                                colNum = 0;
                            } else {
                                colNum = idxModulus;
                            }
                            return (
                                <Cell 
                                    key={idx}
                                    rowNum={rowNum}
                                    colNum={colNum}
                                    cellValue={elem}
                                    cellClicked={this.cellClicked}
                                    sudokuIdx = {idx}
                                    disabled={this.state.disabledIndicesForSudoku.includes(idx)}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Grid;