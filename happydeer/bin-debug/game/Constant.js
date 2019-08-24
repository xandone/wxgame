var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Constant = (function () {
    function Constant() {
    }
    /**
     * 玩家图片缩放
     */
    Constant.zomScale = 0.6;
    /**
     * 玩家起始位置y轴偏移量
     */
    Constant.zomStatyYOffset = 50;
    return Constant;
}());
__reflect(Constant.prototype, "Constant");
