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
        _this.speed = 5;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameMap.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        var texture = RES.getRes("bg_png");
        this.textureW = texture.textureWidth;
        this.rowCount = Math.ceil(Constant.stageW / this.textureW) + 1;
        this.bmpArr = [];
        for (var i = 0; i < this.rowCount; i++) {
            var bg = new egret.Bitmap(RES.getRes("bg_png"));
            bg.x = this.textureW * i;
            bg.height = Constant.stageH;
            this.bmpArr.push(bg);
            this.addChild(bg);
        }
        this._hole = this.createBall(60, 20);
        this.addChild(this._hole);
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
        this._hole.x -= this.speed;
        for (var i = 0; i < this.rowCount; i++) {
            var bg = this.bmpArr[i];
            bg.x -= this.speed;
            if (bg.x < -this.textureW) {
                bg.x = this.bmpArr[this.bmpArr.length - 1].x + this.textureW;
                this.bmpArr.shift();
                this.bmpArr.push(bg);
            }
        }
    };
    GameMap.prototype.createBall = function (w, h) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x444446);
        shape.graphics.drawEllipse(0, 0, w, h);
        shape.graphics.endFill();
        shape.x = 400;
        shape.y = 775;
        return shape;
    };
    return GameMap;
}(egret.DisplayObjectContainer));
__reflect(GameMap.prototype, "GameMap");
