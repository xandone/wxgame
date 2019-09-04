var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Human = (function (_super) {
    __extends(Human, _super);
    function Human() {
        return _super.call(this) || this;
    }
    Human.prototype.create = function (name) {
        var bmp = new egret.Bitmap(RES.getRes(name));
        this.addChild(bmp);
        this.x = Math.random() * (Constant.stageW - this.width);
        this.y = Math.random() * (Constant.stageH - Constant.human_min_y - this.height / 2) + Constant.human_min_y;
        this.addMask(bmp);
        this.bmp = bmp;
    };
    Human.prototype.addMask = function (human) {
        //画一个红色的正方形
        var square = new egret.Shape();
        square.graphics.beginFill(0xff0000);
        square.graphics.drawRect(0, 0, human.width, human.height / 2 + 10);
        square.graphics.endFill();
        square.x = human.x;
        square.y = human.y;
        this.addChild(square);
        human.mask = square;
    };
    Human.prototype.switchChild = function () {
        var x = this.bmp.x;
        var y = this.bmp.y;
        var bmp = new egret.Bitmap(RES.getRes("rescued_png"));
        bmp.x = x;
        bmp.y = y;
        this.removeChild(this.bmp);
        this.addChild(bmp);
    };
    return Human;
}(egret.DisplayObjectContainer));
__reflect(Human.prototype, "Human");
