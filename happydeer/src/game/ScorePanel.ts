class ScorePanel extends eui.Component {

	private restart_btn: eui.Button;

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/gameSkin/score.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
	}

	private init() {
		this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
		this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
	}

	private restart() {
		SceneManager.instance._gameMain.restart();
	}
}