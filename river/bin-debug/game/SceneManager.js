var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
        this._gameMap = new GameMap();
        this._gameMain = new GameMain();
    }
    Object.defineProperty(SceneManager, "instance", {
        /**获取实例 */
        get: function () {
            if (!SceneManager.sceneManager) {
                SceneManager.sceneManager = new SceneManager();
            }
            return SceneManager.sceneManager;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置根场景
     * @param main 根场景
     */
    SceneManager.prototype.setStage = function (main) {
        this._stage = main;
    };
    /**
     * 切换场景
     * @param scene 切换到的目标场景
     * @param parentScene 需要切换到的父场景, 会移除该场景下所有的其他场景.  为空的时候, 默认为根场景
     */
    SceneManager.switchScene = function (scene, parentScene) {
        if (parentScene) {
            parentScene.removeChildren();
            parentScene.addChild(scene);
        }
        else {
            this.sceneManager._stage.removeChildren();
            this.sceneManager._stage.addChild(scene);
        }
    };
    /**
     * 添加场景
     * @param scene 添加的场景
     * @param parentScene 需要添加到的场景.  为空的时候, 默认为根场景
     */
    SceneManager.addScene = function (scene, parentScene) {
        if (parentScene) {
            parentScene.addChild(scene);
        }
        else {
            this.sceneManager._stage.addChild(scene);
        }
    };
    /**
     * 移除场景
     * @param scene 移除的场景
     * @param parentScene 父级场景.  为空的时候, 默认为根场景
     */
    SceneManager.removeScene = function (scene, parentScene) {
        if (parentScene) {
            parentScene.removeChild(scene);
        }
        else {
            this.sceneManager._stage.removeChild(scene);
        }
    };
    /**碰撞检测 */
    SceneManager.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    SceneManager.rescuedTest = function (obj1, obj2) {
        var x1 = obj1.x + obj1.width / 2;
        var y1 = obj1.y + obj1.height / 2;
        var humanx1 = obj2.x;
        var humanx2 = humanx1 + obj2.width;
        var humany1 = obj2.y;
        var humany2 = humany1 + obj2.height;
        if (x1 > humanx1 && x1 < humanx2 && y1 > humany1 && y1 < humany2) {
            return true;
        }
        return false;
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
