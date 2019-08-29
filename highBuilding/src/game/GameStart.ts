class GameStart extends egret.DisplayObjectContainer {
private  _startPanel:StartPanel;

	private startX: number = 50;
	private startY: number = -50;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("gamebg_png"));
		this.addChild(bg);
		this.initBox();

	}

	private initBox() {
		var texture: egret.Texture = RES.getRes("rect_png");

		let box: egret.Bitmap = new egret.Bitmap();
		box.texture = texture;
		box.width = 50;
		box.height = 50;
		box.x = this.startX;
		box.y = this.startY;
		this.box1[0] = box;
		this.addChild(this.box1[0]);
		this.startAnim1(this.box1[0]);


		for (let i = 0; i < 2; i++) {
			let box: egret.Bitmap = new egret.Bitmap();
			box.texture = texture;
			box.width = 50;
			box.height = 50;
			box.x = this.startX * 2;
			box.y = (i + 1) * this.startY;
			this.addChild(box);
			this.box2[i] = box;
			this.startAnim2(this.box2[i], 750 + this.startY * i, 1600 + i * 200);
		}

		for (let i = 0; i < 3; i++) {
			let box: egret.Bitmap = new egret.Bitmap();
			box.texture = texture;
			box.width = 50;
			box.height = 50;
			box.x = this.startX * 3;
			box.y = (i + 1) * this.startY;
			this.addChild(box);
			this.box3[i] = box;
			this.startAnim2(this.box3[i], 750 + this.startY * i, 1800 + i * 200);
		}

		for (let i = 0; i < 4; i++) {
			let box: egret.Bitmap = new egret.Bitmap();
			box.texture = texture;
			box.width = 50;
			box.height = 50;
			box.x = this.startX * 4;
			box.y = (i + 1) * this.startY;
			this.addChild(box);
			this.box4[i] = box;
			this.startAnim2(this.box4[i], 750 + this.startY * i, 2000 + i * 200);
		}

		for (let i = 0; i < 5; i++) {
			let box: egret.Bitmap = new egret.Bitmap();
			box.texture = texture;
			box.width = 50;
			box.height = 50;
			box.x = this.startX * 5;
			box.y = (i + 1) * this.startY;
			this.addChild(box);
			this.startAnim2(box, 750 + this.startY * i, 2200 + i * 200);
		}

		for (let i = 0; i < 6; i++) {
			let box: egret.Bitmap = new egret.Bitmap();
			box.texture = texture;
			box.width = 50;
			box.height = 50;
			box.x = this.startX * 6;
			box.y = (i + 1) * this.startY;
			this.addChild(box);
			this.startAnim2(box, 750 + this.startY * i, 2400 + i * 200);
		}

		for (let i = 0; i < 7; i++) {
			let box: egret.Bitmap = new egret.Bitmap();
			box.texture = texture;
			box.width = 50;
			box.height = 50;
			box.x = this.startX * 7;
			box.y = (i + 1) * this.startY;
			this.addChild(box);
			this.startAnim2(box, 750 + this.startY * i, 2600 + i * 200);
		}


		for (let i = 0; i < 8; i++) {
			let box: egret.Bitmap = new egret.Bitmap();
			box.texture = texture;
			box.width = 50;
			box.height = 50;
			box.x = this.startX * 8;
			box.y = (i + 1) * this.startY;
			this.addChild(box);
			this.startAnim2(box, 750 + this.startY * i, 2800 + i * 200);
		}


	}

	/**
	 *
	 */
	private startAnim1(box: egret.Bitmap) {
		egret.Tween.get(box, { loop: false }).to({ y: 750 }, 1400, egret.Ease.cubicInOut).call(() => {

		});
	}

	private startAnim2(box: egret.Bitmap, endy: number, interval: number) {
		egret.Tween.get(box, { loop: false }).to({ y: endy }, interval, egret.Ease.cubicInOut).call(() => {

		});
	}
}