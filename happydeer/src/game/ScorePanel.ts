class ScorePanel extends eui.Component {
	private restart_btn: eui.Button;
	private score: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/gameskin/score.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
	}

	private init() {
		this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
		this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
	}

	public setScore() {
		this.score.text = SceneManager.instance._gameMap.getScore();
	}

	private restart() {
		SceneManager.switchScene(SceneManager.instance._gameMain);
		SceneManager.instance._gameMain.restart();
	}
}