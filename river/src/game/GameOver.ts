class GameOver extends egret.DisplayObjectContainer {
	private restartbtn: eui.Image;
	private bombMc: egret.MovieClip;
	private label1: eui.Label;
	private label2: eui.Label;
	private label3: eui.Label;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this)
	}

	private init() {
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this)

		this.initShape();

		let texture = RES.getRes("restart_png");
		this.restartbtn = new eui.Image(texture);
		this.restartbtn.x = Constant.stageW / 2 - 100;
		this.restartbtn.y = Constant.stageH - 120;
		this.addChild(this.restartbtn);
		this.restartbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
	}

	private restart() {
		this.restartbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
		SceneManager.switchScene(SceneManager.instance._gameMain);
		SceneManager.instance._gameMain.restart();
	}


	private initShape() {
		let shape: egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0xFFFFFF);
		shape.alpha = 0.8;
		shape.graphics.drawRect(0, 0, Constant.stageW, Constant.stageH);
		shape.graphics.endFill();
		this.addChild(shape);

		let data = RES.getRes("win_json");
		let txtr = RES.getRes("win_png");
		let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		this.bombMc = new egret.MovieClip(mcFactory.generateMovieClipData("win"));
		this.jump(this.bombMc, 100, 145);


		let hurt = new egret.Bitmap(RES.getRes("hurt_png"));
		hurt.x = 500;
		hurt.y = 200;
		this.addChild(hurt);

		this.label1 = new eui.Label();
		this.label1.text = "你和媳妇"
		this.label1.textColor = 0x000000;
		this.label1.size = 30;
		this.label1.bold = true;
		this.label1.x = 120;
		this.label1.y = 140;

		this.label2 = new eui.Label();
		this.label2.text = "妈"
		this.label2.textColor = 0x000000;
		this.label2.size = 30;
		this.label2.bold = true;
		this.label2.x = 520;
		this.label2.y = 140;

		this.label3 = new eui.Label();
		this.label3.text = "GAME OVER"
		this.label3.textColor = 0x000000;
		this.label3.size = 40;
		this.label3.bold = true;
		this.label3.x = 300;
		this.label3.y = 50;

		this.addChild(this.label1);
		this.addChild(this.label2);
		this.addChild(this.label3);
	}

	private jump(mc1: egret.MovieClip, x: number, y: number) {
		mc1.x = x;
		mc1.y = y;
		this.addChild(mc1);
		mc1.gotoAndPlay(1, -1);
	}
}