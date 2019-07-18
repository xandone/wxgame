var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Constant = (function () {
    function Constant() {
    }
    Constant.enemyScale_1 = 0.7;
    Constant.myPlaneScale = 0.5;
    Constant.enemyBulletS_1 = 0.5;
    Constant.myBulletS_1 = 0.5;
    Constant.scoreNum = 0.5;
    Constant.createBullet = "createBullet";
    return Constant;
}());
__reflect(Constant.prototype, "Constant");
