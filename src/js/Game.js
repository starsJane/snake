// 管控游戏进程

var oGame = new Game();
oGame.timer = null;
oGame.score = 0;
oGame.Interval = 400;


oGame.init = function () {

    // 这两个执行分别在Ground.js 和 Snake.js里
    oG.init();
    oSnake.init(oG);
    createFood(oG, oSnake);

    // 绑定键盘事件
    // next hit delay    trottle节流，延迟，防止过快转换方向(这里不说了，晚点加回去)
    // 37 left 38 top 39 right 40 down
    // 如果蛇正在往右走，则蛇不能往左走； 蛇如果往上走，则不能往下走

    document.onkeydown = function (e) {
        if (e.which == 37 && oSnake.direction != DIRECTIONENUM.RIGHT) {
            oSnake.direction = DIRECTIONENUM.LEFT;
        }else if (e.which == 38 && oSnake.direction != DIRECTIONENUM.DOWN) {
            oSnake.direction = DIRECTIONENUM.UP;
        }else if (e.which == 39 && oSnake.direction != DIRECTIONENUM.LEFT) {
            oSnake.direction = DIRECTIONENUM.RIGHT;
        }else if (e.which == 40 && oSnake.direction != DIRECTIONENUM.UP) {
            oSnake.direction = DIRECTIONENUM.DOWN;
        }
    };

};


oGame.start = function () {
    clearInterval(oGame.timer);
    oGame.timer = setInterval(function () {
        oSnake.move(oG);
    }, oGame.Interval);   
};

oGame.over = function () {
    clearInterval(oGame.timer);
}

oGame.init();

  

// 动态随机创建蛇的食物 
// 作业1： 老师建议换种写法优化食物：用数组动态记录下当前哪些坐标是可以使用的，从那里拿出来变成食物
function createFood (oGround, oSnake) {     
    
    var x = null;
    var y = null;
    var flag = true;
    while (flag) {

        // 随机产生坐标   
        x = 1 + Math.floor( Math.random() * 28 );
        y = 1 + Math.floor( Math.random() * 28 );
        var ok = true;
        for (var node = oSnake.head; node; node = node.next) {    
            // 循环完node = node.next； node变成了蛇头的下一个蛇身
            if (x == node.x && y == node.y) {   // 食物的位置在蛇头上
                ok = false;
                break;
            }        
        };

        if (ok) {
            flag = false;   
            // 食物不在蛇头上，代表蛇没吃到食物；flag为false，不能接着随机产生食物
        }
    };

    // x y 
    var food = SquareFatory.create('Food', x, y, 'green');
    oGround.remove(food.x, food.y);
    oGround.append(food);
};

// 写上边 init() 时候 


oGame.start()





