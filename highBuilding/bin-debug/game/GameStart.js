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
var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameStart.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        var box = new egret.Bitmap(RES.getRes("rect_png"));
        box.width = 50;
        box.height = 50;
        box.x = 50;
        box.y = -50;
        var bg = new egret.Bitmap(RES.getRes("gamebg_png"));
        this.addChild(bg);
        this.addChild(box);
        this.startAnim(box);
    };
    GameStart.prototype.startAnim = function (box) {
        console.log(44444);
        egret.Tween.get(box, { loop: false }).to({ y: 750 }, 2000, egret.Ease.cubicInOut).call(function () {
        });
    };
    return GameStart;
}(egret.DisplayObjectContainer));
__reflect(GameStart.prototype, "GameStart");
