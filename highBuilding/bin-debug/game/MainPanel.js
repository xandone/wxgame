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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    MainPanel.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
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
                            box.alpha = 0.5;
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
            egret.Tween.removeTweens(display);
            egret.Tween.removeTweens(self);
            this.shape.graphics.clear();
            //添加方形刚体
            var positionX = display.x / self.factor;
            var positionY = (egret.MainContext.instance.stage.stageHeight - display.y) / self.factor;
            var boxShape = new p2.Box({ width: 1, height: 1 });
            var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });
            boxBody.addShape(boxShape);
            world.addBody(boxBody);
            //物理系中的旋转用的弧度
            boxBody.angle = 2 * Math.PI - (display.rotation / 180) * Math.PI;
            console.log("角度===" + display.rotation + "弧度===" + boxBody.angle);
            boxBody.displays = [display];
            setTimeout(function () {
                addBlock();
                // self.y = 25;
            }, 1500);
        }
        function addBlock() {
            display = self.createBitmapByName("rect_png");
            display.width = self.factor;
            display.height = self.factor;
            display.anchorOffsetX = display.width / 2;
            display.anchorOffsetY = display.height / 2;
            display.x = 100;
            display.y = 400;
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
            this.display.y = (1 - value) * (1 - value) * 400 + 2 * value * (1 - value) * 500 + value * value * 400;
            this.shape.graphics.clear();
            this.shape.graphics.lineStyle(1, 0xfcee5c);
            this.shape.graphics.moveTo(240, 0);
            this.shape.graphics.lineTo(this.display.x, this.display.y);
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
            this.display.y = (1 - value) * (1 - value) * 400 + 2 * value * (1 - value) * 500 + value * value * 400;
            this.shape.graphics.clear();
            this.shape.graphics.lineStyle(1, 0xfcee5c);
            this.shape.graphics.moveTo(240, 0);
            this.shape.graphics.lineTo(this.display.x, this.display.y);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 画绳子
     */
    MainPanel.prototype.drawLine = function () {
        this.shape = new egret.Shape();
        // shape.graphics.beginFill(0xff0000);
        // this.shape.graphics.lineStyle(2, 0x444446);
        // this.shape.graphics.moveTo(200, 0);
        // this.shape.graphics.lineTo(100 + this.display.width / 2, 100 - this.display.height / 2);
        // shape.graphics.endFill();
        this.addChild(this.shape);
        return this.shape;
    };
    return MainPanel;
}(egret.DisplayObjectContainer));
__reflect(MainPanel.prototype, "MainPanel");
