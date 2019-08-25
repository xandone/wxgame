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
var ScorePanel = (function (_super) {
    __extends(ScorePanel, _super);
    function ScorePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/gameSkin/score.exml";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.init, _this);
        return _this;
    }
    ScorePanel.prototype.init = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
        this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
    };
    ScorePanel.prototype.restart = function () {
        SceneManager.instance._gameMain.restart();
    };
    return ScorePanel;
}(eui.Component));
__reflect(ScorePanel.prototype, "ScorePanel");
