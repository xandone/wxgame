// TypeScript file
class GameMain extends egret.DisplayObjectContainer {
    private mainPanel: MainPanel;
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.mainPanel = new MainPanel();
        this.addChild(this.mainPanel);
    }
}