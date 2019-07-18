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
        _this.skinName = "resource/eui_skins/gameSkin/start.exml";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.init, _this);
        return _this;
    }
    GameStart.prototype.init = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
    };
    GameStart.prototype.start = function () {
        SceneManager.switchScene(SceneManager.instance._gameMain);
    };
    return GameStart;
}(eui.Component));
__reflect(GameStart.prototype, "GameStart");
