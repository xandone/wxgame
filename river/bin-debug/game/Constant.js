var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Constant = (function () {
    function Constant() {
    }
    /**
    * 屏幕宽
    */
    Constant.stageW = 800;
    /**
     * 屏幕高
     */
    Constant.stageH = 480;
    /**
     * 掉到河里的人的最小y轴
     */
    Constant.human_min_y = 360;
    return Constant;
}());
__reflect(Constant.prototype, "Constant");
