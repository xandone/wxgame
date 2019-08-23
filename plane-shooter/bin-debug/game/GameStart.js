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
        _this.isRankClick = false;
        _this.skinName = "resource/eui_skins/gameSkin/start.exml";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.init, _this);
        return _this;
    }
    GameStart.prototype.init = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.about_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aboutGame, this);
        this.ranking_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obBtnRankingClick, this);
        this.hornGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switch, this);
        this.sound = RES.getRes("menu_mp3");
        this.channel = this.sound.play();
        this.hornOn = new eui.Image(RES.getRes("hornOn_png"));
        this.hornOff = new eui.Image(RES.getRes("hornOff_png"));
        this.hornGroup.addChild(this.hornOn);
    };
    /**
     * 开始游戏
     */
    GameStart.prototype.startGame = function () {
        this.isPlaySound = false;
        if (this.channel != null) {
            this.channel.stop();
            this.channel = null;
        }
        this.sound = null;
        SceneManager.switchScene(SceneManager.instance._gameMain);
    };
    /**
     * 声音切换
     */
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
    /**
     * 关于游戏
     */
    GameStart.prototype.aboutGame = function () {
        this.about.visible = !this.about.visible;
    };
    //显示微信排行榜
    GameStart.prototype.obBtnRankingClick = function (e) {
        console.log("点击排行榜");
        var platform = window.platform;
        if (!this.isRankClick) {
            //处理遮罩,避免开放域数据影响主域
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.4;
            //设置为true,以免触摸到下面的按钮
            this.rankingListMask.touchEnabled = true;
            this.addChildAt(this.rankingListMask, 999);
            //显示开放域数据
            this.bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.addChild(this.bitmap);
            //让排行榜按钮显示在容器内
            this.addChild(this.ranking_btn);
            //主域向子域发送数据
            platform.openDataContext.postMessage({
                isRanking: this.isRankClick,
                text: "egret",
                year: (new Date()).getFullYear(),
                score: 101,
                command: "open"
            });
            this.isRankClick = true;
        }
        else {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.isRankClick = false;
            platform.openDataContext.postMessage({
                isRanking: this.isRankClick,
                text: "30",
                year: (new Date()).getFullYear(),
                command: "close"
            });
        }
    };
    return GameStart;
}(eui.Component));
__reflect(GameStart.prototype, "GameStart");
//# sourceMappingURL=GameStart.js.map