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
var StartPanel = (function (_super) {
    __extends(StartPanel, _super);
    function StartPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/gameskin/startpanel.exml";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.init, _this);
        return _this;
    }
    StartPanel.prototype.init = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
        this.btn = new eui.Image(RES.getRes("startbtn_png"));
        this.btn.width = 160;
        this.btn.height = 60;
        this.btn.x = 240 - 80;
        this.btn.y = 580;
        this.addChild(this.btn);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
    };
    StartPanel.prototype.start = function () {
        SceneManager.switchScene(SceneManager.instance._gameMain);
    };
    return StartPanel;
}(eui.Component));
__reflect(StartPanel.prototype, "StartPanel");
//# sourceMappingURL=StartPanel.js.map