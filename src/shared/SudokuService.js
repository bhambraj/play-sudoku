const _ = require('lodash');

class SudokuService {
    // accepts initial 2d array that it will create the sudokuBoard problem
    constructor(board) {
        this.initialSudoku = this.generateInitialPuzzle(board);
        this.validCellIndicesToFill = _
            .chain(this.initialSudoku)
            .filter(o => o.disabled)
            .map(o => o.positionIdx)
            .value();
        this.clonedSudoku = [];
    }
    
    generateInitialPuzzle(board) {
        const sudoku = [];
            board.forEach((row, ridx) => {	
                row.forEach((col, cidx) => {
                    sudoku.push({
                        positionIdx: `${ridx}${cidx}`,
                        disabled: col ? true : false,
                        value: col,
                        possibleValuesToFill: [] 
                    });
                });
            });
            return sudoku;
    }

    isValidInput(sudoku, val, posIdx) {
        const ridx = parseInt(posIdx.substr(0, 1), 10);
        const cidx = parseInt(posIdx.substr(1, 1), 10);
        for (let i = 0; i < 9; i++ ) {
            const idxForColumnsInRow = _.findIndex(sudoku, (o) => o.positionIdx === `${ridx}${i}`);
            const idxForRowsInCol = _.findIndex(sudoku, (o) => o.positionIdx === `${i}${cidx}`);
            if (sudoku[`${idxForColumnsInRow}`].value === val) return false; // Row
            if (sudoku[`${idxForRowsInCol}`].value === val) return false; // Col
        };

        const peersTL_rowidx = parseInt((ridx / 3), 10) * 3;
        const peersTL_colidx = parseInt((cidx / 3), 10) * 3;
        
        // Peers
        for (let k = 0; k < 3; k++) {
            for (let j = 0; j < 3; j++) {
                const getIndexToCheckAt = _.findIndex(sudoku, o => o.positionIdx === `${peersTL_rowidx + k}${peersTL_colidx + j}`)
                if (sudoku[`${getIndexToCheckAt}`].value === val) return false;
            }
        }
        return true;
    }

    
    /**
     * 
     * @param {*} sudoku 
     * Data Structure: [{
                    positionIdx: `${ridx}${cidx}`,
                    disabled: col ? true : false,
                    value: col,
                    possibleValuesToFill: [] 
                }, ...]
     */
    solve(sudoku) {
        const self = this;
        this.clonedSudoku = _.cloneDeep(sudoku);
        for (var itr = 0; itr < this.validCellIndicesToFill.length; itr++) {
            const idxInSudoku = _.findIndex(sudoku, o => o.positionIdx === self.validCellIndicesToFill[itr]);
            const canFillValue = sudoku[`${idxInSudoku}`].value !== 0;
            if (canFillValue) {
                for (let candidate = 1; candidate <=9; candidate++) {
                    const isValid = self.isValidInput(sudoku, candidate, sudoku[`${idxInSudoku}`].positionIdx);
                    if (isValid) {
                        sudoku[`${idxInSudoku}`].value = candidate;
                        const isSolved = self.solve(sudoku);
                        if (isSolved) return true;
                        sudoku[`${idxInSudoku}`].value = 0;
                    }
                }
                return false;
            }
        }
        return true;
    }

    findSolution() {
        const isSolved = this.solve(this.initialSudoku);
        if (isSolved) {
            console.log('Sudoku Solved');
            return this.clonedSudoku;
        } else {
            console.log('Sudoku Problem');
        }
    }

    generate2D(sudokuBoard) {
		const TwoD = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
		sudokuBoard.forEach((obj) => {
			const ridx = parseInt(obj.positionIdx.substr(0, 1), 10);
			const cidx = parseInt(obj.positionIdx.substr(1, 1), 10);
			TwoD[ridx][cidx] = obj.value;
		});
		return TwoD;
  	}
};

module.exports = SudokuService;
