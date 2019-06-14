var oSnake = new Snake();
oSnake.head = null;
oSnake.tail = null;

oSnake.init = function (oGround) {
    var SnakeHead = SquareFatory.create('SnakeHead', 3, 1, 'red');
    var SnakeBody1 = SquareFatory.create('SnakeBody', 2, 1, 'blue');
    var SnakeBody2 = SquareFatory.create('SnakeBody', 1, 1, 'blue');

    // 蛇是整体  形成链表（截图） 顺着next找（单向）  顺着next向后 和 prev向前找（双向）
    SnakeHead.next = SnakeBody1;
    SnakeHead.prev = null;

    SnakeBody1.next = SnakeBody2;
    SnakeBody1.prev = SnakeHead;

    SnakeBody2.next = null;
    SnakeBody2.prev = SnakeBody1;


    // render 渲染
    oGround.remove(SnakeHead.x, SnakeHead.y);
    oGround.append(SnakeHead);

    oGround.remove(SnakeBody1.x, SnakeBody1.y);
    oGround.append(SnakeBody1);

    oGround.remove(SnakeBody2.x, SnakeBody2.y);
    oGround.append(SnakeBody2);

    this.head = SnakeHead;
    this.tail = SnakeBody2;


    // 默认的方向
    this.direction = DIRECTIONENUM.RIGHT;

};


// 策略模式
oSnake.strategies = {
    MOVE: function (snake, square, oGround, fromEat) {
        
        // 1.  创建一个新的身体, 出现在蛇头的位置上
        var newBody = SquareFatory.create('SnakeBody', snake.head.x, snake.head.y, 'blue');
        newBody.next = snake.head.next;
        newBody.prev = null;
        newBody.next.prev = newBody;     // 让newBody1的pre指向newbody
       
        // 放到场景中, 先拆再放
        oGround.remove(snake.head.x, snake.head.y);
        oGround.append(newBody);

      
        // 2.  新建蛇头；   蛇头是单例，所以在intVar.js写了个.upDate方法（才能真正作用上，并且相应的位置也发生变化）
        var newHead = SquareFatory.create('SnakeHead', square.x, square.y, 'red');
        newHead.next = newBody;
        newHead.prev = null;
        newBody.prev = newHead;

        oGround.remove(square.x, square.y);
        oGround.append(newHead);
        snake.head = newHead;               // 每次都要记一下上一次的值，赋给新的值；  
        

        // 3. 蛇尾操作  
        // fromEat为true，代表是吃来的，则不进入判断，不删除蛇尾；
        // 为false时，代表没吃东西，移动要去掉蛇尾
        if ( !fromEat ) {
            var floor = SquareFatory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            oGround.remove(snake.tail.x, snake.tail.y);
            oGround.append(floor);  
            snake.tail = snake.tail.prev;      
        }


        // 3. 去掉蛇尾
        // var floor = SquareFatory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
        // oGround.remove(snake.tail.x, snake.tail.y);
        // oGround.append(floor);  
        // snake.tail = snake.tail.prev;       // 每次都要记一下上一次的值，赋给新的值；
        
    },

    EAT: function (snake, square, oGround) {
        // console.log('eat')
        this.MOVE(snake, square, oGround, true);
        oGame.score++;  
        // 加完分数要重新生成食物
        createFood(oGround, snake);
    },

    DIE: function () {
        // 在Game.js里有over()方法
        oGame.over();  
        alert(oGame.score);   
    }
}
  



//蛇运动
oSnake.move = function (oGround) {
    // 下一个碰到的方块
    var square = oGround.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // move 做预判
    //console.log( square.touch() );                // 在Ground.js里继承了touch方法  
        // 控制台：
        // oSnake.direction = DIRECTIONENUM.UP      //改变方向，坐标也会改变  继承的touch方法那些可能也变
        // {x: 0, y: -1}
        // oSnake.move(oG)
        // Snake.js:48 DIE

    // 判断square有没有touch方法
    if (typeof square.touch == 'function') {
        this.strategies[ square.touch() ](this, square, oGround);    //square.touch()执行会返回一个结果
    }

};






// 让 Game.js 管控游戏进程
// oSnake.init(oG);





// 方块继承关系       单例模式
// 生产方块           工厂模式
// 蛇的运动           策略模式

// 策略模式是指对一系列的算法定义，并将每一个算法封装起来，而且使它们还可以相互替换。
// 策略模式让算法独立于使用它的客户而独立变化。
