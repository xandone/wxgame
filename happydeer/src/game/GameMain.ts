class GameMain extends egret.DisplayObjectContainer {
	private bombMc: egret.MovieClip;
	private bomnMcY: number;
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
		console.log("初始化/..");
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

	private removeEvent() {
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchMove, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchMove, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.updateGameView, this);
	}

	private startGame() {
		this.touchEnabled = true;
		this.jump(this.bombMc, Constant.stageW / 2 - this.bombMc.width / 2, Constant.stageH - this.bombMc.height * Constant.zomScale - Constant.zomStatyYOffset);
	}

	public restart() {
		this.isJumpUp = true;
		this.currentOffset = 0;
		this.isGameOver = false;
		this.removeChildren();
		SceneManager.instance._gameMap = null;
		SceneManager.instance.createNewMap();
		this.createMain();
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
		if (this.isGameOver) {
			return;
		}
		if (this.currentOffset <= this.maxHeight && this.isJumpUp) {
			this.bombMc.y -= this.speed;
			this.currentOffset = this.currentOffset + this.speed;
			if (this.bombMc.y == this.bomnMcY - this.maxHeight) {
				this.playBombAudio("jump_wav");
			}
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
		//判断是否掉到洞里
		let holeLen = SceneManager.instance._gameMap._hole.length;
		for (let i: number = 0; i < holeLen; i++) {
			let hole = SceneManager.instance._gameMap._hole[i];
			if (SceneManager.dropHole(this.bombMc, hole, this.bomnMcY)) {
				console.log("碰撞");
				this.isGameOver = true;
				this.stopJump(this.bombMc);
				SceneManager.instance._gameMap.pause();
				this.touchEnabled = false;
				this.removeEvent();
				this.playBombAudio("gameover_mp3");
				this.deathMask();
				setTimeout(() => {
					this.animhole();
				}, 500)
				break;
			} else if (hole.x < this.bombMc.x && holeLen < 2) {
				SceneManager.instance._gameMap.createBall();
			}

		}

	}

	private animhole() {
		var bTween = egret.Tween.get(this.bombMc);
		bTween.to({ y: 1200 }, 1200, egret.Ease.circIn).call(() => {
			this.removeChild(this.bombMc);
			SceneManager.instance._gameMap.clearScore();
			SceneManager.addScene(SceneManager.instance._scorePanel);
			SceneManager.instance._scorePanel.setScore();
		});
	}

	private initJump() {
		var data = RES.getRes("zom_json");
		var txtr = RES.getRes("zom_png");
		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		this.bombMc = new egret.MovieClip(mcFactory.generateMovieClipData("zom"));
		this.bombMc.scaleX = Constant.zomScale;
		this.bombMc.scaleY = Constant.zomScale;
	}

	private jump(mc1: egret.MovieClip, x: number, y: number) {
		mc1.x = x;
		mc1.y = y;
		this.bomnMcY = y;
		this.addChild(mc1);
		mc1.gotoAndPlay(1, -1);
	}

	private stopJump(mc1: egret.MovieClip) {
		mc1.gotoAndStop(1);
		mc1.stop();
	}

	private playBombAudio(resName: string) {
		var sound: egret.Sound = RES.getRes(resName);
		sound.play(0, 1);
	}


	private deathMask() {
		//画一个红色的正方形
		var square: egret.Shape = new egret.Shape();
		square.graphics.beginFill(0xff0000);
		square.graphics.drawRect(0, 0, this.bombMc.width * Constant.zomScale, this.bombMc.height * Constant.zomScale);
		square.graphics.endFill();
		square.x = this.bombMc.x;
		square.y = this.bombMc.y;
		this.addChild(square);
		this.bombMc.mask = square;
	}

}