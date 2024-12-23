class Game2048UI extends HTMLElement 
{
    constructor(game) 
    {
        super();
        this.game = game;
        this.attachShadow({ mode: 'open' });
        this.canvas = document.createElement('canvas');
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.shadowRoot.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.TILE_SIZE = 80;
        this.TILE_MARGIN = 10;
        this.startPoint = null;
        this.addEventListener('keydown', this.handleKey.bind(this));
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.render();
    }
    // 当组件被添加到DOM时调用
    connectedCallback() 
    {
        this.tabIndex = 0;
        this.focus();
    }
    // 处理键盘事件
    handleKey(e) 
    {
        switch (e.key) 
        {
            case 'ArrowLeft':
                this.game.moveLeft();
                break;
            case 'ArrowRight':
                this.game.moveRight();
                break;
            case 'ArrowUp':
                this.game.moveUp();
                break;
            case 'ArrowDown':
                this.game.moveDown();
                break;
        }
        this.render();
        if (this.game.isGameOver()) 
        {
            alert('Game Over!');
        }
    }
    // 处理鼠标按下事件
    handleMouseDown(e) 
    {
        this.startPoint = { x: e.offsetX, y: e.offsetY };
    }
    // 处理鼠标松开事件
    handleMouseUp(e) 
    {
        const endPoint = { x: e.offsetX, y: e.offsetY };
        this.handleSwipe(this.startPoint, endPoint);
    }
    // 处理鼠标移动事件
    handleMouseMove(e) 
    {
        if (e.buttons !== 1) return;
        const endPoint = { x: e.offsetX, y: e.offsetY };
        this.handleSwipe(this.startPoint, endPoint);
    }
    // 处理触摸开始事件
    handleTouchStart(e) 
    {
        const touch = e.touches[0];
        this.startPoint = { x: touch.clientX, y: touch.clientY };
    }
    // 处理触摸结束事件
    handleTouchEnd(e) 
    {
        const touch = e.changedTouches[0];
        const endPoint = { x: touch.clientX, y: touch.clientY };
        this.handleSwipe(this.startPoint, endPoint);
    }
    // 处理滑动事件
    handleSwipe(start, end) 
    {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        if (Math.abs(dx) > Math.abs(dy)) 
        {
            if (dx > 0) 
            {
                this.game.moveRight();
            } else 
            {
                this.game.moveLeft();
            }
        } else 
        {
            if (dy > 0) 
            {
                this.game.moveDown();
            } else 
            {
                this.game.moveUp();
            }
        } 
        this.render();
        if (this.game.isGameOver()) 
        {
            alert('Game Over!');
        }
    }
    // 渲染游戏界面
    render() 
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#faf8ef';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let y = 0; y < Game2048.SIZE; y++) 
        {
            for (let x = 0; x < Game2048.SIZE; x++) 
            {
                this.drawTile(this.ctx, this.game.getBoard()[y][x], x, y);
            }
        }
    }
    // 绘制单个方块
    drawTile(ctx, value, x, y) 
    {
        const xOffset = this.offsetCoors(x);
        const yOffset = this.offsetCoors(y);
        ctx.fillStyle = this.getTileColor(value);
        ctx.fillRect(xOffset, yOffset, this.TILE_SIZE, this.TILE_SIZE);
        ctx.fillStyle = this.getTextColor(value);
        const size = value < 100 ? 36 : value < 1000 ? 32 : 24;
        ctx.font = `bold ${size}px Arial`;
        const s = String(value);
        const textWidth = ctx.measureText(s).width;
        const textHeight = size;
        if (value !== 0) 
        {
            ctx.fillText(s, xOffset + (this.TILE_SIZE - textWidth) / 2, yOffset + (this.TILE_SIZE + textHeight) / 2 - 2);
        }
    }
    // 获取方块颜色
    getTileColor(value) 
    {
        switch (value) 
        {
            case 2: return '#eee4da';
            case 4: return '#ede0c8';
            case 8: return '#f2b179';
            case 16: return '#f59563';
            case 32: return '#f67c5f';
            case 64: return '#f65e3b';
            case 128: return '#edcf72';
            case 256: return '#edcc61';
            case 512: return '#edc850';
            case 1024: return '#edc53f';
            case 2048: return '#edc22e';
        }
        return '#cdc1b4';
    }
    // 获取文字颜色
    getTextColor(value) 
    {
        return value < 16 ? '#776e65' : '#f9f6f2';
    }
    // 计算方块的偏移量
    offsetCoors(arg) 
    {
        return arg * (this.TILE_MARGIN + this.TILE_SIZE) + this.TILE_MARGIN;
    }
}

customElements.define('game-2048-ui', Game2048UI);
