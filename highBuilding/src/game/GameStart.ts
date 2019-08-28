class GameStart extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

		let box: egret.Bitmap = new egret.Bitmap(RES.getRes("rect_png"));
		box.width = 50;
		box.height = 50;
		box.x = 50;
		box.y = -50;

		let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("gamebg_png"));
		this.addChild(bg);

		this.addChild(box);

		this.startAnim1(box);
	}

	/**
	 *
	 */
	private startAnim1(box: egret.Bitmap) {
		egret.Tween.get(box, { loop: false }).to({ y: 750 }, 1400, egret.Ease.cubicInOut).call(() => {

		});
	}

	private startAnim2(box: egret.Bitmap) {
		egret.Tween.get(box, { loop: false }).to({ y: 750 }, 1600, egret.Ease.cubicInOut).call(() => {

		});
	}

	private startAnim3(box: egret.Bitmap) {
		egret.Tween.get(box, { loop: false }).to({ y: 750 }, 1800, egret.Ease.cubicInOut).call(() => {

		});
	}

	private startAnim4(box: egret.Bitmap) {
		egret.Tween.get(box, { loop: false }).to({ y: 750 }, 2000, egret.Ease.cubicInOut).call(() => {

		});
	}
}