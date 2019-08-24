class GameMap extends egret.DisplayObjectContainer {
	private textureW: number;
	private rowCount: number;
	private bmpArr: egret.Bitmap[];
	private speed: number = 5;
	public _hole: egret.Shape;
	private isMoving: boolean;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		let texture: egret.Texture = RES.getRes("bg_png");
		this.textureW = texture.textureWidth;
		this.rowCount = Math.ceil(Constant.stageW / this.textureW) + 1;
		this.bmpArr = [];
		for (let i: number = 0; i < this.rowCount; i++) {
			let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("bg_png"));
			bg.x = this.textureW * i
			bg.height = Constant.stageH;
			this.bmpArr.push(bg);
			this.addChild(bg);
		}
		this._hole = this.createBall(60, 20);
		this.addChild(this._hole);
	}
	public start() {
		this.isMoving = true;
		this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
	}
	public pause() {
		this.isMoving = false;
		this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
	}

	private enterFrame() {
		this._hole.x -= this.speed;
		for (let i: number = 0; i < this.rowCount; i++) {
			let bg: egret.Bitmap = this.bmpArr[i];
			bg.x -= this.speed;
			if (bg.x < -this.textureW) {
				bg.x = this.bmpArr[this.bmpArr.length - 1].x + this.textureW;
				this.bmpArr.shift();
				this.bmpArr.push(bg);
			}
		}
	}

	private createBall(w: number, h: number): egret.Shape {
		var shape = new egret.Shape();
		shape.graphics.beginFill(0x444446);
		shape.graphics.drawEllipse(0, 0, w, h);
		shape.graphics.endFill();
		shape.x = 400;
		shape.y = 785 - Constant.zomStatyYOffset;
		return shape;
	}

}