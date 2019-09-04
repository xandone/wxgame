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
        _this.speed = 3;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameMap.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        var bg = new egret.Bitmap(RES.getRes("bg_png"));
        bg.height = Constant.stageH;
        this.addChild(bg);
        var texture = RES.getRes("water_png");
        this.textureW = texture.textureWidth;
        this.rowCount = Math.ceil(Constant.stageW / this.textureW) + 1;
        this.bmpArr = [];
        for (var i = 0; i < this.rowCount; i++) {
            var water = new egret.Bitmap(RES.getRes("water_png"));
            water.x = -this.textureW * i;
            water.y = Constant.stageH - water.height - 2;
            this.bmpArr.push(water);
            this.addChild(water);
        }
    };
    GameMap.prototype.start = function () {
        this.isMoving = true;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    };
    GameMap.prototype.pause = function () {
        this.isMoving = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    };
    GameMap.prototype.enterFrame = function () {
        for (var i = 0; i < this.rowCount; i++) {
            var water = this.bmpArr[i];
            water.x += this.speed;
            if (water.x > this.textureW) {
                water.x = this.bmpArr[this.bmpArr.length - 1].x - this.textureW;
                this.bmpArr.shift();
                this.bmpArr.push(water);
            }
        }
    };
    return GameMap;
}(egret.DisplayObjectContainer));
__reflect(GameMap.prototype, "GameMap");
