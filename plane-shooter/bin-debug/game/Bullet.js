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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(texture, tName) {
        var _this = _super.call(this, texture) || this;
        _this.texture = texture;
        _this.tName = tName;
        return _this;
    }
    Bullet.produce = function (tName) {
        if (Bullet.cacheDict[tName] == null) {
            Bullet.cacheDict[tName] = [];
        }
        var dict = Bullet.cacheDict[tName];
        var bullet;
        if (dict.length > 0) {
            bullet = dict.pop();
        }
        else {
            bullet = new Bullet(RES.getRes(tName), tName);
            bullet.scaleX = Constant.myBulletS_1;
            bullet.scaleY = Constant.myBulletS_1;
        }
        return bullet;
    };
    Bullet.destroy = function (mybullet) {
        var name = mybullet.tName;
        if (Bullet.cacheDict[name] == null) {
            Bullet.cacheDict[name] = [];
        }
        var dict = Bullet.cacheDict[name];
        if (dict.indexOf(mybullet) == -1) {
            dict.push(mybullet);
        }
    };
    Bullet.cacheDict = {};
    return Bullet;
}(egret.Bitmap));
__reflect(Bullet.prototype, "Bullet");
