// Working Solution :-)

const helper = {
    isValidInput(board,val, rowidx, colidx) {
        for (let i = 0; i < 9; i++ ) {
            if (board[rowidx][i] === val) return false; // Row
            if (board[i][colidx] === val) return false; // Col
        };

        const peersTL_rowidx = parseInt((rowidx / 3), 10) * 3;
        const peersTL_colidx = parseInt((colidx / 3), 10) * 3;
        
        // Peers
        for (let k = 0; k < 3; k++) {
            for (let j = 0; j < 3; j++) {
                if (board[peersTL_rowidx + k][peersTL_colidx + j] === val) return false;
            }
        }
        return true;
    },
    solveSudoku(board, boardMap) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === 0) {
                    for (let candidate = 1; candidate <=9; candidate++) {
                        const isValid = helper.isValidInput(board, candidate, i, j);
                        if (isValid) {
                            board[i][j] = candidate;
                            boardMap[`${i}${j}`] = candidate;
                            const isSolvedBoard = helper.solveSudoku(board, boardMap);
                            if (isSolvedBoard) return true; // Recursion break case
                            board[i][j] = 0;
                            boardMap[`${i}${j}`] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    },
    solver(board) {
        const boardHashMap = {};
        const solvedBoard = helper.solveSudoku(board, boardHashMap);
        return {
            status: solvedBoard ? 'SUCCESS': 'ERROR',
            boardHashMap
        };
    }
}

module.exports = helper;


