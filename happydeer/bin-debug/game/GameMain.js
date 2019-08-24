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
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        var _this = _super.call(this) || this;
        _this.speed = 5;
        _this.maxHeight = 80;
        _this.currentOffset = 0;
        _this.isJumpUp = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameMain.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.createMain();
    };
    GameMain.prototype.createMain = function () {
        SceneManager.addScene(SceneManager.instance._gameMap, this);
        this.initEvent();
        this.initJump();
        this.startGame();
    };
    GameMain.prototype.initEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchMove, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.updateGameView, this);
    };
    GameMain.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchMove, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.updateGameView, this);
    };
    GameMain.prototype.startGame = function () {
        this.touchEnabled = true;
        this.jump(this.bombMc, Constant.stageW / 2 - this.bombMc.width / 2, Constant.stageH - this.bombMc.height * Constant.zomScale - Constant.zomStatyYOffset);
    };
    GameMain.prototype.touchMove = function (event) {
        if (this.isGameOver) {
            return;
        }
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            SceneManager.instance._gameMap.start();
        }
        else if (event.type == egret.TouchEvent.TOUCH_END) {
            SceneManager.instance._gameMap.pause();
        }
    };
    GameMain.prototype.updateGameView = function () {
        var _this = this;
        if (this.isGameOver) {
            return;
        }
        if (this.currentOffset <= this.maxHeight && this.isJumpUp) {
            console.log(this.bombMc.y + "   " + (this.bomnMcY - this.maxHeight));
            this.bombMc.y -= this.speed;
            this.currentOffset = this.currentOffset + this.speed;
            if (this.bombMc.y == this.bomnMcY - this.maxHeight) {
                console.log(123);
                this.playBombAudio("jump_wav");
            }
            if (this.currentOffset >= this.maxHeight) {
                this.isJumpUp = false;
            }
        }
        else {
            this.currentOffset = this.currentOffset - this.speed;
            this.bombMc.y += this.speed;
            if (this.currentOffset <= 0) {
                this.isJumpUp = true;
            }
        }
        if (SceneManager.dropHole(this.bombMc, SceneManager.instance._gameMap._hole, this.bomnMcY)) {
            console.log("碰撞");
            this.isGameOver = true;
            this.stopJump(this.bombMc);
            SceneManager.instance._gameMap.pause();
            this.touchEnabled = false;
            this.removeEvent();
            this.playBombAudio("gameover_mp3");
            this.t();
            setTimeout(function () {
                _this.animhole();
            }, 500);
        }
    };
    GameMain.prototype.animhole = function () {
        var _this = this;
        var bTween = egret.Tween.get(this.bombMc);
        bTween.to({ y: 1200 }, 1200, egret.Ease.circIn).call(function () {
            _this.removeChild(_this.bombMc);
        });
    };
    GameMain.prototype.initJump = function () {
        var data = RES.getRes("zom_json");
        var txtr = RES.getRes("zom_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.bombMc = new egret.MovieClip(mcFactory.generateMovieClipData("zom"));
        this.bombMc.scaleX = Constant.zomScale;
        this.bombMc.scaleY = Constant.zomScale;
    };
    GameMain.prototype.jump = function (mc1, x, y) {
        mc1.x = x;
        mc1.y = y;
        this.bomnMcY = y;
        this.addChild(mc1);
        mc1.gotoAndPlay(1, -1);
    };
    GameMain.prototype.stopJump = function (mc1) {
        mc1.gotoAndStop(1);
        mc1.stop();
    };
    GameMain.prototype.playBombAudio = function (resName) {
        var sound = RES.getRes(resName);
        sound.play(0, 1);
    };
    GameMain.prototype.t = function () {
        //画一个红色的正方形
        var square = new egret.Shape();
        square.graphics.beginFill(0xff0000);
        square.graphics.drawRect(0, 0, this.bombMc.width * Constant.zomScale, this.bombMc.height * Constant.zomScale);
        square.graphics.endFill();
        square.x = this.bombMc.x;
        square.y = this.bombMc.y;
        this.addChild(square);
        this.bombMc.mask = square;
    };
    return GameMain;
}(egret.DisplayObjectContainer));
__reflect(GameMain.prototype, "GameMain");
