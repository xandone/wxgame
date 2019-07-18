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
var GameMap = (function (_super) {
    __extends(GameMap, _super);
    function GameMap() {
        var _this = _super.call(this) || this;
        _this.speed = 2;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameMap.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        var texture = RES.getRes("bg_jpg");
        this.textureH = texture.textureHeight;
        this.rowCount = Math.ceil(Constant.stageW / this.textureH) + 1;
        this.bmpArr = [];
        for (var i = 0; i < this.rowCount; i++) {
            var bg = new egret.Bitmap(RES.getRes("bg_jpg"));
            bg.y = this.textureH * i - (this.textureH * this.rowCount - Constant.stageH);
            this.bmpArr.push(bg);
            this.addChild(bg);
        }
    };
    GameMap.prototype.start = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    };
    GameMap.prototype.pause = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    };
    GameMap.prototype.enterFrame = function () {
        for (var i = 0; i < this.rowCount; i++) {
            var bg = this.bmpArr[i];
            bg.y += this.speed;
            if (bg.y > Constant.stageH) {
                bg.y = this.bmpArr[0].y - this.textureH;
                this.bmpArr.pop();
                this.bmpArr.unshift(bg);
            }
        }
    };
    return GameMap;
}(egret.DisplayObjectContainer));
__reflect(GameMap.prototype, "GameMap");
