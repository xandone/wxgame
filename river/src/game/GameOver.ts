class GameOver extends eui.Component {
	private restart_btn: eui.Button;
	private score: eui.Label;
	private bombMc: egret.MovieClip;

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/gameskin/score.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
	}

	private init() {
		this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
		this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);

		this.initShape();
	}

	private restart() {
		// SceneManager.switchScene(SceneManager.instance._gameMain);
		// SceneManager.instance._gameMain.restart();
	}


	private initShape() {
		var data = RES.getRes("win_json");
		var txtr = RES.getRes("win_png");
		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		this.bombMc = new egret.MovieClip(mcFactory.generateMovieClipData("win"));
		this.jump(this.bombMc, 100, 145);

		let hurt = new egret.Bitmap(RES.getRes("hurt_png"));
		hurt.x = 500;
		hurt.y = 200;
		this.addChild(hurt);

	}

	private jump(mc1: egret.MovieClip, x: number, y: number) {
		mc1.x = x;
		mc1.y = y;
		this.addChild(mc1);
		mc1.gotoAndPlay(1, -1);
	}
}