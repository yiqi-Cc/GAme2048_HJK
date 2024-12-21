class Game2048 {
    static SIZE = 4;
    constructor() {
        this.board = Array.from({ length: Game2048.SIZE }, () => Array(Game2048.SIZE).fill(0));
        this.random = Math.random;
        this.addNewNumber();
        this.addNewNumber();
    }
    getBoard() {
        return this.board;
    }
    moveLeft() {
        let needAddNumber = false;
        for (let i = 0; i < Game2048.SIZE; i++) {
            let newRow = Array(Game2048.SIZE).fill(0);
            let pos = 0;
            for (let j = 0; j < Game2048.SIZE; j++) {
                if (this.board[i][j] !== 0) {
                    if (pos > 0 && newRow[pos - 1] === this.board[i][j]) {
                        newRow[pos - 1] *= 2;
                        needAddNumber = true;
                    } else {
                        newRow[pos++] = this.board[i][j];
                        if (j !== pos - 1) {
                            needAddNumber = true;
                        }
                    }
                }
            }
            this.board[i] = newRow;
        }
        if (needAddNumber) {
            this.addNewNumber();
        }
    }
    moveRight() {
        this.rotateBoard();
        this.rotateBoard();
        this.moveLeft();
        this.rotateBoard();
        this.rotateBoard();
    }
    moveUp() {
        this.rotateBoard();
        this.rotateBoard();
        this.rotateBoard();
        this.moveLeft();
        this.rotateBoard();
    }
    moveDown() {
        this.rotateBoard();
        this.moveLeft();
        this.rotateBoard();
        this.rotateBoard();
        this.rotateBoard();
    }
    addNewNumber() {
        let x, y;
        do {
            x = Math.floor(this.random() * Game2048.SIZE);
            y = Math.floor(this.random() * Game2048.SIZE);
        } while (this.board[x][y] !== 0);
        this.board[x][y] = this.random() < 0.1 ? 4 : 2;
    }
    canMove() {
        for (let i = 0; i < Game2048.SIZE; i++) {
            for (let j = 0; j < Game2048.SIZE; j++) {
                if (this.board[i][j] === 0) {
                    return true;
                }
                if (i < Game2048.SIZE - 1 && this.board[i][j] === this.board[i + 1][j]) {
                    return true;
                }
                if (j < Game2048.SIZE - 1 && this.board[i][j] === this.board[i][j + 1]) {
                    return true;
                }
            }
        }
        return false;
    }
    isGameOver() {
        return !this.canMove();
    }
    rotateBoard() {
        let newBoard = Array.from({ length: Game2048.SIZE }, () => Array(Game2048.SIZE).fill(0));
        for (let i = 0; i < Game2048.SIZE; i++) {
            for (let j = 0; j < Game2048.SIZE; j++) {
                newBoard[j][Game2048.SIZE - 1 - i] = this.board[i][j];
            }
        }
        this.board = newBoard;
    }
}
