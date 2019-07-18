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
var AirPlane = (function (_super) {
    __extends(AirPlane, _super);
    function AirPlane(texture, fireDelay, textureName, scale) {
        var _this = _super.call(this) || this;
        _this.fireDelay = fireDelay;
        _this.bmp = new egret.Bitmap(texture);
        _this.bmp.scaleX = scale;
        _this.bmp.scaleY = scale;
        _this.textureName = textureName;
        _this.fireTimer = new egret.Timer(fireDelay);
        _this.addChild(_this.bmp);
        _this.fireTimer.addEventListener(egret.TimerEvent.TIMER, _this.createBullet, _this);
        _this.blood = 30;
        return _this;
    }
    AirPlane.produce = function (tName, fireDelay) {
        if (AirPlane.cacheDict[tName] == null) {
            AirPlane.cacheDict[tName] = [];
        }
        var dict = AirPlane.cacheDict[tName];
        var newPlane;
        if (dict.length > 0) {
            newPlane = dict.pop();
        }
        else {
            newPlane = new AirPlane(RES.getRes(tName), fireDelay, "tName", Constant.enemyScale_1);
        }
        newPlane.blood = 10;
        return newPlane;
    };
    AirPlane.destory = function (plane) {
        var name = plane.textureName;
        if (AirPlane.cacheDict[name] == null) {
            AirPlane.cacheDict[name] = [];
        }
        var dict = AirPlane.cacheDict[name];
        if (dict.indexOf(plane) == -1) {
            dict.push(plane);
        }
    };
    AirPlane.prototype.createBullet = function () {
        this.dispatchEventWith(Constant.createBullet);
    };
    AirPlane.prototype.fire = function () {
        this.fireTimer.start();
    };
    AirPlane.prototype.stopFire = function () {
        this.fireTimer.stop();
    };
    AirPlane.cacheDict = [];
    return AirPlane;
}(egret.DisplayObjectContainer));
__reflect(AirPlane.prototype, "AirPlane");
