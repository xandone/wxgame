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
var GameScore = (function (_super) {
    __extends(GameScore, _super);
    function GameScore() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/gameSkin/score.exml";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.init, _this);
        return _this;
    }
    GameScore.prototype.init = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
        this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
    };
    GameScore.prototype.restart = function () {
        SceneManager.switchScene(SceneManager.instance._gameMain);
        SceneManager.instance._gameMain.restart();
    };
    GameScore.prototype.setScore = function (num) {
        this.myGroup.removeChildren();
        this.myGroup.layout = new eui.BasicLayout();
        var arr = this.digitize(num);
        for (var i = 0; i < arr.length; i++) {
            var score = new eui.Image(RES.getRes("score_json.imgFont" + arr[i]));
            score.scaleX = Constant.scoreNum;
            score.scaleY = Constant.scoreNum;
            this.myGroup.addChild(score);
        }
        var hLayout = new eui.HorizontalLayout();
        hLayout.paddingTop = 20;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.myGroup.layout = hLayout; /// 水平布局
    };
    GameScore.prototype.digitize = function (num) {
        var str = num + "";
        var arr = [];
        str.split("").forEach(function (item) {
            arr.push(parseInt(item));
        });
        return arr;
    };
    return GameScore;
}(eui.Component));
__reflect(GameScore.prototype, "GameScore");
