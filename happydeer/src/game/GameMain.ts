class GameMain extends egret.DisplayObjectContainer {
	private bombMc: egret.MovieClip;
	private speed: number = 5;
	private maxHeight = 80;
	private currentOffset = 0;
	private isJumpUp: boolean = true;
	private isGameOver;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this)
	}

	private init() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.createMain();
	}

	private createMain() {
		SceneManager.addScene(SceneManager.instance._gameMap, this);

		this.initEvent();
		this.initJump();
		this.startGame();
	}

	private initEvent() {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchMove, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.updateGameView, this);
	}

	private startGame() {
		this.touchEnabled = true;
		this.jump(this.bombMc, Constant.stageW / 2 - this.bombMc.width / 2, Constant.stageH - this.bombMc.height);
	}

	private touchMove(event: egret.TouchEvent) {
		if (this.isGameOver) {
			return;
		}
		if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
			SceneManager.instance._gameMap.start();
		} else if (event.type == egret.TouchEvent.TOUCH_END) {
			SceneManager.instance._gameMap.pause();
		}
	}

	private updateGameView() {
		if (this.currentOffset <= this.maxHeight && this.isJumpUp) {
			this.bombMc.y -= this.speed;
			this.currentOffset = this.currentOffset + this.speed;
			if (this.currentOffset >= this.maxHeight) {
				this.isJumpUp = false;
			}
		} else {
			this.currentOffset = this.currentOffset - this.speed;
			this.bombMc.y += this.speed;
			if (this.currentOffset <= 0) {
				this.isJumpUp = true;
			}
		}

		if (SceneManager.hitTest(this.bombMc, SceneManager.instance._gameMap._hole)) {
			console.log("碰撞");
			this.isGameOver = true;
			this.stopJump(this.bombMc);
			SceneManager.instance._gameMap.pause();
		}
	}

	private initJump() {
		var data = RES.getRes("zom_json");
		var txtr = RES.getRes("zom_png");
		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		this.bombMc = new egret.MovieClip(mcFactory.generateMovieClipData("zom"));
		// this.bombMc.scaleX = 0.5;
		// this.bombMc.scaleY = 0.5;
	}

	private jump(mc1: egret.MovieClip, x: number, y: number) {
		mc1.x = x;
		mc1.y = y;
		this.addChild(mc1);
		mc1.gotoAndPlay(1, -1);
	}

	private stopJump(mc1: egret.MovieClip) {
		mc1.gotoAndStop(1);
		mc1.stop();
	}

}