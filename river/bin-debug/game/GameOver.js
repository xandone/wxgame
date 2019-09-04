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
        _this.skinName = "resource/eui_skins/gameskin/score.exml";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.init, _this);
        return _this;
    }
    GameOver.prototype.init = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
        this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
        this.initShape();
    };
    GameOver.prototype.restart = function () {
        // SceneManager.switchScene(SceneManager.instance._gameMain);
        // SceneManager.instance._gameMain.restart();
    };
    GameOver.prototype.initShape = function () {
        var data = RES.getRes("win_json");
        var txtr = RES.getRes("win_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.bombMc = new egret.MovieClip(mcFactory.generateMovieClipData("win"));
        this.jump(this.bombMc, 100, 145);
        var hurt = new egret.Bitmap(RES.getRes("hurt_png"));
        hurt.x = 500;
        hurt.y = 200;
        this.addChild(hurt);
    };
    GameOver.prototype.jump = function (mc1, x, y) {
        mc1.x = x;
        mc1.y = y;
        this.addChild(mc1);
        mc1.gotoAndPlay(1, -1);
    };
    return GameOver;
}(eui.Component));
__reflect(GameOver.prototype, "GameOver");
