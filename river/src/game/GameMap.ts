class GameMap extends egret.DisplayObjectContainer {
	private textureW: number;
	private rowCount: number;
	private bmpArr: egret.Bitmap[];
	private speed: number = 3;
	private isMoving: boolean;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("bg_png"));
		bg.height = Constant.stageH;
		this.addChild(bg);

		let texture: egret.Texture = RES.getRes("water_png");
		this.textureW = texture.textureWidth;
		this.rowCount = Math.ceil(Constant.stageW / this.textureW) + 1;
		this.bmpArr = [];
		for (let i: number = 0; i < this.rowCount; i++) {
			let water: egret.Bitmap = new egret.Bitmap(RES.getRes("water_png"));
			water.x = -this.textureW * i;
			water.y = Constant.stageH - water.height - 2;
			this.bmpArr.push(water);
			this.addChild(water);
		}
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
		for (let i: number = 0; i < this.rowCount; i++) {
			let water: egret.Bitmap = this.bmpArr[i];
			water.x += this.speed;
			if (water.x > this.textureW) {
				water.x = this.bmpArr[this.bmpArr.length - 1].x - this.textureW;
				this.bmpArr.shift();
				this.bmpArr.push(water);
			}
		}
	}


}