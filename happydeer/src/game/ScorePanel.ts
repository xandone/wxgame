class ScorePanel extends eui.Component {

	private restart_btn: eui.Button;

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/gameSkin/score.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
	}

	private init() {
	}
}