class SceneManager {
    /**根场景 */
    public _stage: egret.DisplayObjectContainer;
    public _gameMain: GameMain;
    public _gameMap: GameMap;

    constructor() {
        this._gameMap = new GameMap();
        this._gameMain = new GameMain();
    }

    /**实例对象 */
    static sceneManager: SceneManager
    /**获取实例 */
    static get instance() {
        if (!SceneManager.sceneManager) {
            SceneManager.sceneManager = new SceneManager()
        }
        return SceneManager.sceneManager
    }
    /**
     * 设置根场景
     * @param main 根场景
     */
    public setStage(main: egret.DisplayObjectContainer) {
        this._stage = main
    }

    /**
     * 切换场景
     * @param scene 切换到的目标场景
     * @param parentScene 需要切换到的父场景, 会移除该场景下所有的其他场景.  为空的时候, 默认为根场景
     */
    static switchScene(scene: egret.DisplayObjectContainer, parentScene?: egret.DisplayObjectContainer) {
        if (parentScene) {
            parentScene.removeChildren()
            parentScene.addChild(scene)
        } else {
            this.sceneManager._stage.removeChildren()
            this.sceneManager._stage.addChild(scene)
        }
    }

    /**
     * 添加场景
     * @param scene 添加的场景
     * @param parentScene 需要添加到的场景.  为空的时候, 默认为根场景
     */
    static addScene(scene: egret.DisplayObjectContainer, parentScene?: egret.DisplayObjectContainer) {
        if (parentScene) {
            parentScene.addChild(scene)
        } else {
            this.sceneManager._stage.addChild(scene)
        }
    }


	/**
     * 移除场景
     * @param scene 移除的场景
     * @param parentScene 父级场景.  为空的时候, 默认为根场景
     */
    static removeScene(scene: egret.DisplayObjectContainer, parentScene?: egret.DisplayObjectContainer) {
        if (parentScene) {
            parentScene.removeChild(scene)
        } else {
            this.sceneManager._stage.removeChild(scene)
        }
    }


    /**碰撞检测 */
    static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        var rect1: egret.Rectangle = obj1.getBounds();
        var rect2: egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    }

    static rescuedTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject) {
        let x1 = obj1.x + obj1.width / 2;
        let y1 = obj1.y + obj1.height / 2;

        let humanx1 = obj2.x;
        let humanx2 = humanx1 + obj2.width;
        let humany1 = obj2.y;
        let humany2 = humany1 + obj2.height;

        if (x1 > humanx1 && x1 < humanx2 && y1 > humany1 && y1 < humany2) {
            return true;
        }

        return false;

    }

}