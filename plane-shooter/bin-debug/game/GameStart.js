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
        _this.isPlaySound = true;
        _this.skinName = "resource/eui_skins/gameSkin/start.exml";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.init, _this);
        return _this;
    }
    GameStart.prototype.init = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.about_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aboutGame, this);
        this.hornGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switch, this);
        this.sound = RES.getRes("menu_mp3");
        this.channel = this.sound.play();
        this.hornOn = new eui.Image(RES.getRes("hornOn_png"));
        this.hornOff = new eui.Image(RES.getRes("hornOff_png"));
        this.hornGroup.addChild(this.hornOn);
    };
    GameStart.prototype.startGame = function () {
        this.isPlaySound = false;
        if (this.channel != null) {
            this.channel.stop();
            this.channel = null;
        }
        this.sound = null;
        SceneManager.switchScene(SceneManager.instance._gameMain);
    };
    GameStart.prototype.switch = function () {
        this.isPlaySound = !this.isPlaySound;
        if (this.isPlaySound) {
            this.channel = this.sound.play();
            this.hornGroup.removeChildren();
            this.hornGroup.addChild(this.hornOn);
        }
        else {
            this.channel.stop();
            this.channel = null;
            this.hornGroup.removeChildren();
            this.hornGroup.addChild(this.hornOff);
        }
    };
    GameStart.prototype.aboutGame = function () {
        this.about.visible = !this.about.visible;
    };
    return GameStart;
}(eui.Component));
__reflect(GameStart.prototype, "GameStart");
