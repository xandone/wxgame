class deer extends egret.DisplayObjectContainer {

	private bmp: egret.Bitmap;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}


	private init() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.bmp = new egret.Bitmap(RES.getRes(""));
	}

}