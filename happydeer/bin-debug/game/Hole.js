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
var Hole = (function (_super) {
    __extends(Hole, _super);
    function Hole(tName, w, h) {
        var _this = _super.call(this) || this;
        _this.tName = tName;
        _this.graphics.beginFill(0x444446);
        _this.graphics.drawEllipse(0, 0, w, h);
        _this.graphics.endFill();
        _this.x = Constant.stageW + w + Math.random() * 300;
        _this.y = 785 - Constant.zomStatyYOffset;
        return _this;
    }
    Hole.produce = function (name) {
        if (Hole.cacheDict[name] = null) {
            Hole.cacheDict[name] = [];
        }
        var dict = Hole.cacheDict[name];
        var hole;
        if (dict && dict.length > 0) {
            hole = dict.pop();
        }
        else {
            hole = new Hole(name, 60, 20);
        }
        return hole;
    };
    Hole.destroy = function (hole) {
        var name = hole.tName;
        if (Hole.cacheDict[name] == null) {
            Hole.cacheDict[name] = [];
        }
        var dict = Hole.cacheDict[name];
        if (dict.indexOf(hole) == -1) {
            dict.push(hole);
        }
    };
    Hole.cacheDict = {};
    return Hole;
}(egret.Shape));
__reflect(Hole.prototype, "Hole");
