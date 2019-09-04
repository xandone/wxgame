class Human extends egret.DisplayObjectContainer {
	private bmp: egret.Bitmap;
	public constructor() {
		super();
	}

	public create(name: string) {
		let bmp = new egret.Bitmap(RES.getRes(name));
		this.addChild(bmp);
		this.x = Math.random() * (Constant.stageW - this.width);
		this.y = Math.random() * (Constant.stageH - Constant.human_min_y - this.height / 2) + Constant.human_min_y;
		this.addMask(bmp);
		this.bmp = bmp;
	}

	private addMask(human: egret.Bitmap): void {
		//画一个红色的正方形
		var square: egret.Shape = new egret.Shape();
		square.graphics.beginFill(0xff0000);
		square.graphics.drawRect(0, 0, human.width, human.height / 2 + 10);
		square.graphics.endFill();
		square.x = human.x;
		square.y = human.y;
		this.addChild(square);
		human.mask = square;
	}

	public switchChild() {
		let x = this.bmp.x;
		let y = this.bmp.y;
		let bmp = new egret.Bitmap(RES.getRes("rescued_png"));
		bmp.x = x;
		bmp.y = y;
		this.removeChild(this.bmp);
		this.addChild(bmp);
	}

}