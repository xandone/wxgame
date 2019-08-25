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
        _this._hole = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameMap.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.distance = 0;
        this.score = 0;
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
        this.createScore();
        this.createBall();
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
        this.distance += this.speed;
        if (this.distance % 100 == 0 && this.distance != 0) {
            this.score++;
            this.scoreLabel.text = String(this.score);
        }
        for (var i = 0; i < this.rowCount; i++) {
            var bg = this.bmpArr[i];
            bg.x -= this.speed;
            if (bg.x < -this.textureW) {
                bg.x = this.bmpArr[this.bmpArr.length - 1].x + this.textureW;
                this.bmpArr.shift();
                this.bmpArr.push(bg);
            }
        }
        // 洞运动
        var holeLen = this._hole.length;
        for (var i = 0; i < holeLen; i++) {
            var hole = this._hole[i];
            if (hole.x < -hole.width) {
                try {
                    this.removeChild(hole);
                }
                catch (error) {
                }
                Hole.destroy(hole);
                this._hole.splice(i, 1);
                i--;
                holeLen--;
            }
            hole.x -= this.speed;
        }
    };
    GameMap.prototype.getScore = function () {
        return String(this.score);
    };
    GameMap.prototype.createBall = function () {
        var shape = Hole.produce("myhole");
        this._hole.push(shape);
        this.addChild(shape);
    };
    GameMap.prototype.createScore = function () {
        var label = new egret.TextField();
        label.text = "0";
        label.x = 80;
        label.y = 50;
        label.size = 50;
        label.textColor = 0x000000;
        this.scoreLabel = label;
        this.addChild(this.scoreLabel);
    };
    GameMap.prototype.reset = function () {
        this.removeChildren();
        for (var i = 0; i < this._hole.length; i++) {
            try {
                this.removeChild(this._hole[i]);
            }
            catch (error) {
            }
        }
        this._hole = [];
    };
    GameMap.prototype.clearScore = function () {
        try {
            this.removeChild(this.scoreLabel);
        }
        catch (error) {
        }
    };
    return GameMap;
}(egret.DisplayObjectContainer));
__reflect(GameMap.prototype, "GameMap");
