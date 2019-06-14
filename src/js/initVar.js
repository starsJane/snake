
// 设定游戏场景位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 200;

// 场景宽高系数  都是40个方块
var XLEN = 40;
var YLEN = 40;

// 每个小方块宽
var SQUAREWIDTH = 20;

// 基类 父类
function Square (x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
    
} 

// 给单例用     
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = this.x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = this.y * SQUAREWIDTH + 'px';
};

Square.prototype.touch = function () {
    console.log('touch');
}


// 子类
// 地板方块 橙色
var Floor = tool.extends(Square);
// 障碍物 黑色
var Stone = tool.extends(Square);
// 食物 亮蓝色  单例
var Food = tool.single(Square);
// 蛇头 红色 单例
var SnakeHead = tool.single(Square);
// 蛇身 蓝色
var SnakeBody = tool.extends(Square);

// 广场
var Ground = tool.single(Square);

// 其它
var Snake = tool.single();
var Game = tool.single();


// 蛇的运动方向
var DIRECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },  
    DOWN: {
        x: 0,
        y: 1
    }
}



// 不同的方块使用touch方法时返回不同的信息
var STRATEGYENUM = {
    move: 'MOVE',
    eat: 'EAT',
    die: 'DIE'
}



