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
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameOver.prototype.init = function () {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.initShape();
        var texture = RES.getRes("restart_png");
        this.restartbtn = new eui.Image(texture);
        this.restartbtn.x = Constant.stageW / 2 - 100;
        this.restartbtn.y = Constant.stageH - 120;
        this.addChild(this.restartbtn);
        this.restartbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
    };
    GameOver.prototype.restart = function () {
        this.restartbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
        SceneManager.switchScene(SceneManager.instance._gameMain);
        SceneManager.instance._gameMain.restart();
    };
    GameOver.prototype.initShape = function () {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xFFFFFF);
        shape.alpha = 0.8;
        shape.graphics.drawRect(0, 0, Constant.stageW, Constant.stageH);
        shape.graphics.endFill();
        this.addChild(shape);
        var data = RES.getRes("win_json");
        var txtr = RES.getRes("win_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.bombMc = new egret.MovieClip(mcFactory.generateMovieClipData("win"));
        this.jump(this.bombMc, 100, 145);
        var hurt = new egret.Bitmap(RES.getRes("hurt_png"));
        hurt.x = 500;
        hurt.y = 200;
        this.addChild(hurt);
        this.label1 = new eui.Label();
        this.label1.text = "你和媳妇";
        this.label1.textColor = 0x000000;
        this.label1.size = 30;
        this.label1.bold = true;
        this.label1.x = 120;
        this.label1.y = 140;
        this.label2 = new eui.Label();
        this.label2.text = "妈";
        this.label2.textColor = 0x000000;
        this.label2.size = 30;
        this.label2.bold = true;
        this.label2.x = 520;
        this.label2.y = 140;
        this.label3 = new eui.Label();
        this.label3.text = "GAME OVER";
        this.label3.textColor = 0x000000;
        this.label3.size = 40;
        this.label3.bold = true;
        this.label3.x = 300;
        this.label3.y = 50;
        this.addChild(this.label1);
        this.addChild(this.label2);
        this.addChild(this.label3);
    };
    GameOver.prototype.jump = function (mc1, x, y) {
        mc1.x = x;
        mc1.y = y;
        this.addChild(mc1);
        mc1.gotoAndPlay(1, -1);
    };
    return GameOver;
}(egret.DisplayObjectContainer));
__reflect(GameOver.prototype, "GameOver");
