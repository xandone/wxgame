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
var MainPanel = (function (_super) {
    __extends(MainPanel, _super);
    function MainPanel() {
        var _this = _super.call(this) || this;
        _this.factor = 50;
        /**
         * 等分
         */
        _this.goldScore = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    MainPanel.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.gameBmp = new egret.Bitmap(RES.getRes("gamebg_png"));
        this.addChild(this.gameBmp);
        this.createScore();
        this.init2();
    };
    MainPanel.prototype.init2 = function () {
        //创建world
        var world = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;
        //创建plane
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body();
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        world.addBody(planeBody);
        egret.Ticker.getInstance().register(function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            world.step(dt / 1000);
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            for (var i = 0; i < l; i++) {
                var boxBody = world.bodies[i];
                if (boxBody.displays[0]) {
                    var box = boxBody.displays[0];
                    if (box) {
                        box.x = boxBody.position[0] * self.factor;
                        box.y = stageHeight - boxBody.position[1] * self.factor;
                        box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
                        if (boxBody.sleepState == p2.Body.SLEEPING) {
                            box.alpha = 0.8;
                        }
                        else {
                            box.alpha = 1;
                        }
                    }
                }
            }
        }, this);
        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, stopTween, this);
        var self = this;
        var display;
        addBlock();
        self.drawLine();
        function stopTween() {
            var _this = this;
            self.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, stopTween, this);
            egret.Tween.removeTweens(display);
            egret.Tween.removeTweens(self);
            self.lineShape.graphics.clear();
            //添加方形刚体
            var positionX = display.x / self.factor;
            var positionY = (egret.MainContext.instance.stage.stageHeight - display.y) / self.factor;
            var boxShape = new p2.Box({ width: 1, height: 1 });
            var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });
            boxBody.addShape(boxShape);
            world.addBody(boxBody);
            //物理系中的旋转用的弧度
            boxBody.angle = 2 * Math.PI - (display.rotation / 180) * Math.PI;
            // console.log("角度===" + display.rotation + "弧度===" + boxBody.angle);
            boxBody.displays = [display];
            setTimeout(function () {
                addBlock();
                self.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, stopTween, _this);
                self.countScore(world.bodies);
                // self.y = 25;
            }, 2000);
        }
        function addBlock() {
            display = self.createBitmapByName("rect_png");
            display.width = self.factor;
            display.height = self.factor;
            display.anchorOffsetX = display.width / 2;
            display.anchorOffsetY = display.height / 2;
            display.x = 100;
            display.y = 300;
            display.rotation = 45;
            self.display = display;
            self.addChild(display);
            rightRo();
        }
        function leftRo() {
            egret.Tween.get(display, { loop: false }).to({ rotation: 45 }, 3000, egret.Ease.sineInOut).call(function () {
                egret.Tween.removeTweens(display);
                rightRo();
            });
            egret.Tween.get(self).to({ fact2: 1 }, 3000).call(function () {
            });
        }
        function rightRo() {
            egret.Tween.get(display, { loop: false }).to({ rotation: -45 }, 3000, egret.Ease.sineInOut).call(function () {
                egret.Tween.removeTweens(display);
                leftRo();
            });
            egret.Tween.get(self).to({ fact: 1 }, 3000).call(function () {
            });
        }
        // function addOneBox(event: egret.TouchEvent): void {
        //     var display: egret.DisplayObject;
        //     display = self.createBitmapByName("rect_png");
        //     display.width = factor;
        //     display.height = factor;
        //     display.anchorOffsetX = display.width / 2;
        //     display.anchorOffsetY = display.height / 2;
        //     display.x = event.stageX;
        //     display.y = event.stageY;
        //     self.addChild(display);
        // self.addEventListener(egret.Event.ENTER_FRAME, () => {
        //     if (ralaote)
        //         display.rotation += 1;
        // }, self);
        // egret.Tween.get(display, { loop: true }).to({ rotation: 40 }, 1000, egret.Ease.sineIn).call(() => {
        //添加方形刚体
        // var positionX: number = display.x / factor;
        // var positionY: number = (egret.MainContext.instance.stage.stageHeight - display.y) / factor;
        // var boxShape: p2.Shape = new p2.Box({ width: 1, height: 1 });
        // var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });
        // boxBody.addShape(boxShape);
        // world.addBody(boxBody);
        // //物理系中的旋转用的弧度
        // boxBody.angle = (40 / 180) * Math.PI;
        // boxBody.displays = [display];
        // });
        // }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    MainPanel.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Object.defineProperty(MainPanel.prototype, "fact", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.display.x = (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 240 + value * value * 380;
            this.display.y = (1 - value) * (1 - value) * 300 + 2 * value * (1 - value) * 400 + value * value * 300;
            this.lineShape.graphics.clear();
            this.lineShape.graphics.lineStyle(2, 0xfcee5c);
            this.lineShape.graphics.moveTo(240, 0);
            this.lineShape.graphics.lineTo(this.display.x, this.display.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainPanel.prototype, "fact2", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.display.x = (1 - value) * (1 - value) * 380 + 2 * value * (1 - value) * 240 + value * value * 100;
            this.display.y = (1 - value) * (1 - value) * 300 + 2 * value * (1 - value) * 400 + value * value * 300;
            this.lineShape.graphics.clear();
            this.lineShape.graphics.lineStyle(1, 0xfcee5c);
            this.lineShape.graphics.moveTo(240, 0);
            this.lineShape.graphics.lineTo(this.display.x, this.display.y);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 画绳子
     */
    MainPanel.prototype.drawLine = function () {
        this.lineShape = new egret.Shape();
        this.addChild(this.lineShape);
        return this.lineShape;
    };
    /**
     * 计算分数
     */
    MainPanel.prototype.countScore = function (bodys) {
        var tempY = 800;
        var tempScore = 1;
        //找到出去最后一个box的y坐标最小值，因为最后一个可能还在空中
        for (var i = 0; i < bodys.length - 1; i++) {
            if (bodys[i].displays[0]) {
                var y = bodys[i].displays[0].y;
                if (y < tempY) {
                    tempY = y;
                }
            }
        }
        tempScore = Math.ceil((800 - tempY) / this.factor);
        if (this.goldScore < tempScore) {
            this.goldScore = tempScore;
        }
        if (this.goldScore <= 0) {
            this.goldScore = 1;
        }
        this.scoreLabel.text = (String(this.goldScore));
        this.setScore(36);
    };
    MainPanel.prototype.createScore = function () {
        var label = new egret.TextField();
        label.text = "0";
        label.x = 80;
        label.y = 50;
        label.size = 50;
        label.textColor = 0x000000;
        this.scoreLabel = label;
        this.addChild(this.scoreLabel);
    };
    MainPanel.prototype.setScore = function (num) {
        this.myGroup = new eui.Group();
        this.myGroup.x = 80;
        this.myGroup.y = 100;
        this.myGroup.removeChildren();
        this.myGroup.layout = new eui.BasicLayout();
        var arr = this.digitize(num);
        for (var i = 0; i < arr.length; i++) {
            var score = new eui.Image(RES.getRes("score_json." + arr[i]));
            this.myGroup.addChild(score);
        }
        var hLayout = new eui.HorizontalLayout();
        hLayout.paddingTop = 20;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.myGroup.layout = hLayout; /// 水平布局
        this.addChild(this.myGroup);
    };
    MainPanel.prototype.digitize = function (num) {
        var str = num + "";
        var arr = [];
        str.split("").forEach(function (item) {
            arr.push(parseInt(item));
        });
        return arr;
    };
    return MainPanel;
}(egret.DisplayObjectContainer));
__reflect(MainPanel.prototype, "MainPanel");
