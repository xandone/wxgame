class StartPanel extends eui.Component {
	private btn: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/gameskin/startpanel.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
	}

	private init() {
		this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
		this.btn = new eui.Image(RES.getRes("startbtn_png"));
		this.btn.width = 160;
		this.btn.height = 60;
		this.btn.x = 240 - 80;
		this.btn.y = 580;
		this.addChild(this.btn);
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
	}

	private start() {
		SceneManager.switchScene(SceneManager.instance._gameMain);
	}
}