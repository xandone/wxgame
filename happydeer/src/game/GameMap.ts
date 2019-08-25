class GameMap extends egret.DisplayObjectContainer {
	private textureW: number;
	private rowCount: number;
	private bmpArr: egret.Bitmap[];
	private speed: number = 5;
	private isMoving: boolean;
	public _hole: Hole[] = [];
	private score: number;
	private distance: number;
	private scoreLabel: egret.TextField;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

		this.distance = 0;
		this.score = 0

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
		this.createScore();
		this.createBall();
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
		this.distance += this.speed;
		if (this.distance % 100 == 0 && this.distance != 0) {
			this.score++;
			this.scoreLabel.text = String(this.score);
		}
		for (let i: number = 0; i < this.rowCount; i++) {
			let bg: egret.Bitmap = this.bmpArr[i];
			bg.x -= this.speed;
			if (bg.x < -this.textureW) {
				bg.x = this.bmpArr[this.bmpArr.length - 1].x + this.textureW;
				this.bmpArr.shift();
				this.bmpArr.push(bg);
			}
		}

		// 洞运动
		let holeLen = this._hole.length
		for (let i: number = 0; i < holeLen; i++) {
			let hole: Hole = this._hole[i];
			if (hole.x < -hole.width) {
				try {
					this.removeChild(hole);
				} catch (error) {

				}
				Hole.destroy(hole);
				this._hole.splice(i, 1);
				i--;
				holeLen--;
			}
			hole.x -= this.speed;
		}
	}

	public getScore() {
		return String(this.score);
	}

	public createBall() {
		let shape = Hole.produce("myhole");
		this._hole.push(shape);
		this.addChild(shape);
	}

	private createScore() {
		let label: egret.TextField = new egret.TextField();
		label.text = "0";
		label.x = 80;
		label.y = 50;
		label.size = 50;
		label.textColor = 0x000000;
		this.scoreLabel = label;
		this.addChild(this.scoreLabel);
	}

	public reset() {
		this.removeChildren();
		for (let i: number = 0; i < this._hole.length; i++) {
			try {
				this.removeChild(this._hole[i]);
			} catch (error) {

			}
		}
		this._hole = [];
	}

	public clearScore() {
		try {
			this.removeChild(this.scoreLabel);
		} catch (error) {

		}
	}

}