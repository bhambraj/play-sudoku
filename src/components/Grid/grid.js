import React, { Component } from 'react';
import Cell from '../Cell/Cell.js';
import './grid.css';

class Grid extends Component {
    constructor(props) {
        super(props)
    }

    cellClicked = e => {
        // If a cell is filled in with a value from the puzzle itself, there should be no further action allowed
        const isDisabledCell = e.target.className.toString().indexOf('disabled') !== -1;
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
        e.target.className += ' activeCell';
    }

    render() {
        return (
            <div className="container">
                <div className="grid">
                    {
                        this.props.sudokuBoard.map((cell) => {
                            return (
                                <Cell
                                    key={`${cell.positionIdx}`}
                                    rowNum={cell.positionIdx.substr(0, 1)}
                                    colNum={cell.positionIdx.substr(1, 1)}
                                    cellValue={cell.value}
                                    cellClicked={this.cellClicked}
                                    disabled={cell.disabled}
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