var oG = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);
console.log(oG);

// 广场 div添加到body
oG.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.backgroundColor = '#ff0';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';

    //二维数组      
    this.SquareTable = [];

    //双重for循环
    for (var i = 0; i < YLEN; i ++) {
        this.SquareTable[i] = new Array(XLEN);
        for (var j = 0; j < XLEN; j ++) {
            var newSquare = null;
            // 进入if 创建围墙
            // 传值对应关系   坐标(x,y) => (j, i)   this.x = x; this.y = y; 
            // 使用工厂模式
            if (j == 0 || i == 0 || j == XLEN - 1 || i == YLEN - 1) {
                newSquare = SquareFatory.create('Stone', j, i, 'black')
            }else {
                newSquare = SquareFatory.create('Floor', j, i, 'orange')
            };
            this.SquareTable[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        };

        console.log(this.SquareTable)

    }
    

    document.body.appendChild(this.viewContent);
};


// 拆方块   传坐标(x,y) => (j, i)
oG.remove = function (x, y) {
    var square = this.SquareTable[y][x];
    // 从视觉去掉div
    this.viewContent.removeChild( square.viewContent );
    // 从方块对象中去掉
    this.SquareTable[y][x] = null;
    
}

 
// 补方块 传SquareFatory.create('SnakeHead', j, i, 'red')
oG.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.SquareTable[square.y][square.x] = square;
};



// 让 Game.js 管控游戏进程
// oG.init()
