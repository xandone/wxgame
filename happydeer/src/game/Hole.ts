class Hole extends egret.Shape {

	private static cacheDict: Object = {};
	private tName: string;

	public constructor(tName: string, w: number, h: number) {
		super();
		this.tName = tName;
		this.graphics.beginFill(0x444446);
		this.graphics.drawEllipse(0, 0, w, h);
		this.graphics.endFill();
		this.x = Constant.stageW + w + Math.random() * 300;
		this.y = 785 - Constant.zomStatyYOffset;
	}

	public static produce(name: string) {
		if (Hole.cacheDict[name] = null) {
			Hole.cacheDict[name] = [];
		}
		let dict: Hole[] = Hole.cacheDict[name];
		let hole: Hole;
		if (dict && dict.length > 0) {
			hole = dict.pop();
		} else {
			hole = new Hole(name, 60, 20);
		}
		return hole;
	}


	public static destroy(hole: Hole) {
		let name: string = hole.tName;
		if (Hole.cacheDict[name] == null) {
			Hole.cacheDict[name] = [];
		}
		let dict: Hole[] = Hole.cacheDict[name];
		if (dict.indexOf(hole) == -1) {
			dict.push(hole);
		}
	}

}