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
        _this.box1 = [];
        _this.box2 = [];
        _this.box3 = [];
        _this.box4 = [];
        _this.startX = 50;
        _this.startY = -50;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameStart.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        var bg = new egret.Bitmap(RES.getRes("gamebg_png"));
        bg.width = Constant.stageW;
        bg.height = Constant.stageH;
        this.addChild(bg);
        this.initBox();
        SceneManager.addScene(SceneManager.instance._startPanel);
    };
    GameStart.prototype.initBox = function () {
        var texture = RES.getRes("rect_png");
        var box = new egret.Bitmap();
        box.texture = texture;
        box.width = 50;
        box.height = 50;
        box.x = this.startX;
        box.y = this.startY;
        this.box1[0] = box;
        this.addChild(this.box1[0]);
        this.startAnim1(this.box1[0]);
        for (var i = 0; i < 2; i++) {
            var box_1 = new egret.Bitmap();
            box_1.texture = texture;
            box_1.width = 50;
            box_1.height = 50;
            box_1.x = this.startX * 2;
            box_1.y = (i + 1) * this.startY;
            this.addChild(box_1);
            this.box2[i] = box_1;
            this.startAnim2(this.box2[i], 750 + this.startY * i, 1600 + i * 200);
        }
        for (var i = 0; i < 3; i++) {
            var box_2 = new egret.Bitmap();
            box_2.texture = texture;
            box_2.width = 50;
            box_2.height = 50;
            box_2.x = this.startX * 3;
            box_2.y = (i + 1) * this.startY;
            this.addChild(box_2);
            this.box3[i] = box_2;
            this.startAnim2(this.box3[i], 750 + this.startY * i, 1800 + i * 200);
        }
        for (var i = 0; i < 4; i++) {
            var box_3 = new egret.Bitmap();
            box_3.texture = texture;
            box_3.width = 50;
            box_3.height = 50;
            box_3.x = this.startX * 4;
            box_3.y = (i + 1) * this.startY;
            this.addChild(box_3);
            this.box4[i] = box_3;
            this.startAnim2(this.box4[i], 750 + this.startY * i, 2000 + i * 200);
        }
        for (var i = 0; i < 5; i++) {
            var box_4 = new egret.Bitmap();
            box_4.texture = texture;
            box_4.width = 50;
            box_4.height = 50;
            box_4.x = this.startX * 5;
            box_4.y = (i + 1) * this.startY;
            this.addChild(box_4);
            this.startAnim2(box_4, 750 + this.startY * i, 2200 + i * 200);
        }
        for (var i = 0; i < 6; i++) {
            var box_5 = new egret.Bitmap();
            box_5.texture = texture;
            box_5.width = 50;
            box_5.height = 50;
            box_5.x = this.startX * 6;
            box_5.y = (i + 1) * this.startY;
            this.addChild(box_5);
            this.startAnim2(box_5, 750 + this.startY * i, 2400 + i * 200);
        }
        for (var i = 0; i < 7; i++) {
            var box_6 = new egret.Bitmap();
            box_6.texture = texture;
            box_6.width = 50;
            box_6.height = 50;
            box_6.x = this.startX * 7;
            box_6.y = (i + 1) * this.startY;
            this.addChild(box_6);
            this.startAnim2(box_6, 750 + this.startY * i, 2600 + i * 200);
        }
        for (var i = 0; i < 8; i++) {
            var box_7 = new egret.Bitmap();
            box_7.texture = texture;
            box_7.width = 50;
            box_7.height = 50;
            box_7.x = this.startX * 8;
            box_7.y = (i + 1) * this.startY;
            this.addChild(box_7);
            this.startAnim2(box_7, 750 + this.startY * i, 2800 + i * 200);
        }
    };
    /**
     *下滑
     */
    GameStart.prototype.startAnim1 = function (box) {
        egret.Tween.get(box, { loop: false }).to({ y: 750 }, 1400, egret.Ease.cubicInOut).call(function () {
        });
    };
    /**
     *下滑运动
     */
    GameStart.prototype.startAnim2 = function (box, endy, interval) {
        egret.Tween.get(box, { loop: false }).to({ y: endy }, interval, egret.Ease.cubicInOut).call(function () {
        });
    };
    return GameStart;
}(egret.DisplayObjectContainer));
__reflect(GameStart.prototype, "GameStart");
//# sourceMappingURL=GameStart.js.map