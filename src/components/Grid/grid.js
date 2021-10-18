import React, { Component } from 'react';
import Cell from '../Cell/Cell.js';
import './grid.css';

class Grid extends Component {
    constructor() {
        super()
        this.state = {
            sudokuArray: new Array(81).fill(0)
        };
    }

    cellClicked(event) {
        const {id, innerHTML: contentHtmlValue} = event.target;
        /**
         * TODOs:
         * 
         * 1. When a cell is clicked, it should be highlighted so that user knows where they are
         * 2. For now, allow entries from 1 to 9 (keydown) and check that keycode characters are valid 1-9
         */
        console.log('ID -> ', id);
        console.log('contentHtmlValue-> ', contentHtmlValue);
    }

    render() {
        let rowNum = '0';
        let colNum = '0';
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
                                rowNum = (parseInt(rowNum) + 1).toString();
                                colNum = '0';
                            } else {
                                colNum = idxModulus.toString();
                            }
                            return (
                                <Cell 
                                    key={`${rowNum}-${colNum}`}
                                    rowNum={rowNum}
                                    colNum={colNum}
                                    cellClicked={this.cellClicked}
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