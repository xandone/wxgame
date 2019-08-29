class StartPanel extends eui.Component {
	private start_btn: eui.Button;

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/gameskin/startpanel.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
	}

	private init() {
		this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
		this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
	}

	private start() {

	}

}