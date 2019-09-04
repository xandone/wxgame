class GameOver extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}


	private init() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.x = 0;
		this.y = 0;
		this.width = Constant.stageW;
		this.height = Constant.stageH;
		let shape = new egret.Shape();
		shape.graphics.drawRect(0, 0, this.width, this.height);
		shape.graphics.beginFill(0xffffff);
		shape.graphics.endFill();
		shape.alpha = 0.5;
		this.addChild(shape);
	}
}