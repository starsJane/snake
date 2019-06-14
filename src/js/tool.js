var tool = {

    // 公有属性继承
    inherit: function (target, origin) {
        var temp = function () { };
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },

    // 私有属性
    extends: function (origin) {
        var result = function () {
            origin.apply(this, arguments);
        }
        this.inherit(result, origin);
        return result;
    },

    //单例模式继承
    single: function (origin) {
        var singleResult = (function () {
            var instance;
            return function () {
                if (instance == 'object') {
                    return instance;
                }
                instance = this;
                origin && origin.apply(this, arguments);
                return instance;
            }

        })();
        origin && this.inherit(singleResult, origin);
        return singleResult;
    }

}


// function Square(x, y) {
//     // 里面是私有属性
//     this.x = x;
//     this.y = y;
// }
// Square.prototype.touch = function () {
//     console.log('touch');
// }


// Food = tool.extends(Square);

// var oF = new Food(10, 20);
// console.log(oF.x, oF.y);    // 10, 20
// console.log(oF.touch);
// //ƒ () {
// //     console.log('touch');
// // } 
// oF.touch()                  // touch


// single 返回符合单例模式的子类
// var Food = tool.single(Square);
// var oF = new Food(10, 20);
// var oF2 = new Food(20, 30);
// oF = oF2



//单例模式：
// 在它的核心结构中只包含一个被称为单例的特殊类。
// 通过单例模式可以保证系统中，应用该模式的类一个类只有一个实例。
// 即一个类只有一个对象实例


