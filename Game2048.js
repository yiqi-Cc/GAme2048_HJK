class Game2048 {
    static SIZE = 4;
    constructor() {
        this.board = Array.from({ length: Game2048.SIZE }, () => Array(Game2048.SIZE).fill(0));
        this.random = Math.random;
        this.addNewNumber();
        this.addNewNumber();
    }
    // 获取当前棋盘状态
    getBoard() {
        return this.board;
    }
    // 向左移动
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
    // 向右移动
    moveRight() {
        this.rotateBoard();
        this.rotateBoard();
        this.moveLeft();
        this.rotateBoard();
        this.rotateBoard();
    }
    // 向上移动
    moveUp() {
        this.rotateBoard();
        this.rotateBoard();
        this.rotateBoard();
        this.moveLeft();
        this.rotateBoard();
    }
    // 向下移动
    moveDown() {
        this.rotateBoard();
        this.moveLeft();
        this.rotateBoard();
        this.rotateBoard();
        this.rotateBoard();
    }
    // 添加一个新的数字（2或4）到棋盘上
    addNewNumber() {
        let x, y;
        do {
            x = Math.floor(this.random() * Game2048.SIZE);
            y = Math.floor(this.random() * Game2048.SIZE);
        } while (this.board[x][y] !== 0);
        this.board[x][y] = this.random() < 0.1 ? 4 : 2;
    }
    // 检查是否可以移动
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
    // 检查游戏是否结束
    isGameOver() {
        return !this.canMove();
    }
    // 旋转棋盘90度
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
