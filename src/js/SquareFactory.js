function SquareFatory () {

};

SquareFatory.create = function (type, x, y, color) {
    if (typeof SquareFatory.prototype[type] == undefined) {
        throw 'no this type';
    };

    // 继承自SquareFatory
    if(SquareFatory.prototype[type].prototype.__proto__ !== SquareFatory.prototype) {
        SquareFatory.prototype[type].prototype = new SquareFatory();
    };

    var newSquare = new SquareFatory.prototype[type](x, y, color);

    return newSquare;
};


SquareFatory.prototype.init = function (square, color, ms) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.backgroundColor = color;
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    // 定位是坐标乘以每个小方块的宽高
    square.viewContent.style.left = square.x * square.width + 'px';
    square.viewContent.style.top = square.y* square.height + 'px';   

    square.touch = function () {
        return ms
    }

}
SquareFatory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH)
    // 出场前先初始化 包装 viewContent div 使其有具体样式
    this.init(floor, color, STRATEGYENUM.move);
    return floor;
};
SquareFatory.prototype.Stone = function (x, y, color) {
    var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(stone, color, STRATEGYENUM.die);
    return stone;   
};

// 单例
SquareFatory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(food, color, STRATEGYENUM.eat);
    food.upDate(x, y);
    return food;
}
// 单例
SquareFatory.prototype.SnakeHead = function (x, y, color) {
    var osn = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(osn, color, STRATEGYENUM.die);
    osn.upDate(x, y);
    return osn;
}

SquareFatory.prototype.SnakeBody = function (x, y, color) {
    var osb = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(osb, color, STRATEGYENUM.die);
    return osb;
}



// 工厂方法模式：不再有一个唯一的工厂类就创建产品，而是将不同的产品交给对应的工厂子类去实现。
// 每个产品由负责生产的子工厂来创造。
// 如果添加新的产品，需要做的是添加新的子工厂和产品，而不需要修改其他的工厂代码。
// （贪吃蛇创建很多小方块）
