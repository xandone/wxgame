class MainPanel extends egret.DisplayObjectContainer {

	private factor: number = 50;
	private display: egret.DisplayObject;
	private offset: number;
	private gameBmp: egret.Bitmap;
	/**
	 *绳子shape
	 */
	private lineShape: egret.Shape;
	/**
	 * 等分
	 */
	private goldScore: number = 0;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
		this.gameBmp = new egret.Bitmap(RES.getRes("gamebg_png"));
		this.addChild(this.gameBmp);
		this.createScore();
		this.init2();
	}

	private init2() {
		//创建world
		var world: p2.World = new p2.World();
		world.sleepMode = p2.World.BODY_SLEEPING;

		//创建plane
		var planeShape: p2.Plane = new p2.Plane();
		var planeBody: p2.Body = new p2.Body();
		planeBody.addShape(planeShape);
		planeBody.displays = [];
		world.addBody(planeBody);

		egret.Ticker.getInstance().register(function (dt) {
			if (dt < 10) {
				return;
			}
			if (dt > 1000) {
				return;
			}
			world.step(dt / 1000);

			var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
			var l = world.bodies.length;
			for (var i: number = 0; i < l; i++) {
				var boxBody: p2.Body = world.bodies[i];
				if (boxBody.displays[0]) {
					var box: egret.DisplayObject = boxBody.displays[0];
					if (box) {
						box.x = boxBody.position[0] * self.factor;
						box.y = stageHeight - boxBody.position[1] * self.factor;
						box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
						if (boxBody.sleepState == p2.Body.SLEEPING) {
							box.alpha = 0.8;
						}
						else {
							box.alpha = 1;
						}
					}
				}
			}
		}, this);

		//鼠标点击添加刚体
		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, stopTween, this);
		var self = this;
		var display: egret.DisplayObject;

		addBlock();
		self.drawLine();

		function stopTween() {
			self.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, stopTween, this);
			egret.Tween.removeTweens(display);
			egret.Tween.removeTweens(self);
			self.lineShape.graphics.clear();
			//添加方形刚体
			var positionX: number = display.x / self.factor;
			var positionY: number = (egret.MainContext.instance.stage.stageHeight - display.y) / self.factor;

			var boxShape: p2.Shape = new p2.Box({ width: 1, height: 1 });
			var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });
			boxBody.addShape(boxShape);
			world.addBody(boxBody);

			//物理系中的旋转用的弧度
			boxBody.angle = 2 * Math.PI - (display.rotation / 180) * Math.PI;
			// console.log("角度===" + display.rotation + "弧度===" + boxBody.angle);
			boxBody.displays = [display];

			setTimeout(() => {
				addBlock();
				self.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, stopTween, this);
				self.countScore(world.bodies);
				// self.y = 25;
			}, 2000);
		}

		function addBlock() {
			display = self.createBitmapByName("rect_png");

			display.width = self.factor;
			display.height = self.factor;
			display.anchorOffsetX = display.width / 2;
			display.anchorOffsetY = display.height / 2;
			display.x = 100;
			display.y = 300;
			display.rotation = 45;
			self.display = display;

			self.addChild(display);

			rightRo();

		}

		function leftRo() {
			egret.Tween.get(display, { loop: false }).to({ rotation: 45 }, 3000, egret.Ease.sineInOut).call(() => {
				egret.Tween.removeTweens(display);
				rightRo();
			});
			egret.Tween.get(self).to({ fact2: 1 }, 3000).call(() => {

			});

		}

		function rightRo() {
			egret.Tween.get(display, { loop: false }).to({ rotation: -45 }, 3000, egret.Ease.sineInOut).call(() => {
				egret.Tween.removeTweens(display);
				leftRo();
			});

			egret.Tween.get(self).to({ fact: 1 }, 3000).call(() => {

			});

		}


		// function addOneBox(event: egret.TouchEvent): void {
		//     var display: egret.DisplayObject;

		//     display = self.createBitmapByName("rect_png");
		//     display.width = factor;
		//     display.height = factor;
		//     display.anchorOffsetX = display.width / 2;
		//     display.anchorOffsetY = display.height / 2;
		//     display.x = event.stageX;
		//     display.y = event.stageY;

		//     self.addChild(display);

		// self.addEventListener(egret.Event.ENTER_FRAME, () => {
		//     if (ralaote)
		//         display.rotation += 1;
		// }, self);

		// egret.Tween.get(display, { loop: true }).to({ rotation: 40 }, 1000, egret.Ease.sineIn).call(() => {
		//添加方形刚体
		// var positionX: number = display.x / factor;
		// var positionY: number = (egret.MainContext.instance.stage.stageHeight - display.y) / factor;

		// var boxShape: p2.Shape = new p2.Box({ width: 1, height: 1 });
		// var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 0 });
		// boxBody.addShape(boxShape);
		// world.addBody(boxBody);
		// //物理系中的旋转用的弧度
		// boxBody.angle = (40 / 180) * Math.PI;
		// boxBody.displays = [display];
		// });
		// }
	}

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
	private createBitmapByName(name: string): egret.Bitmap {
		var result: egret.Bitmap = new egret.Bitmap();
		var texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}

	public get fact(): number {
		return 0;
	}

	public set fact(value: number) {
		this.display.x = (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 240 + value * value * 380;
		this.display.y = (1 - value) * (1 - value) * 300 + 2 * value * (1 - value) * 400 + value * value * 300;

		this.lineShape.graphics.clear();
		this.lineShape.graphics.lineStyle(2, 0xfcee5c);
		this.lineShape.graphics.moveTo(240, 0);
		this.lineShape.graphics.lineTo(this.display.x, this.display.y);
	}

	public get fact2(): number {
		return 0;
	}
	public set fact2(value: number) {
		this.display.x = (1 - value) * (1 - value) * 380 + 2 * value * (1 - value) * 240 + value * value * 100;
		this.display.y = (1 - value) * (1 - value) * 300 + 2 * value * (1 - value) * 400 + value * value * 300;

		this.lineShape.graphics.clear();
		this.lineShape.graphics.lineStyle(1, 0xfcee5c);
		this.lineShape.graphics.moveTo(240, 0);
		this.lineShape.graphics.lineTo(this.display.x, this.display.y);
	}

    /**
     * 画绳子
     */
	private drawLine(): egret.Shape {
		this.lineShape = new egret.Shape();
		this.addChild(this.lineShape);
		return this.lineShape;
	}

	/**
	 * 计算分数
	 */
	private countScore(bodys: p2.Body[]) {
		var tempY: number = 800;
		var tempScore: number = 1;
		//找到出去最后一个box的y坐标最小值，因为最后一个可能还在空中
		for (var i = 0; i < bodys.length - 1; i++) {
			if (bodys[i].displays[0]) {
				var y = bodys[i].displays[0].y;
				if (y < tempY) {
					tempY = y;
				}
			}
		}
		tempScore = Math.ceil((800 - tempY) / this.factor);
		if (this.goldScore < tempScore) {
			this.goldScore = tempScore;
		}
		if (this.goldScore <= 0) {
			this.goldScore = 1;
		}

		this.scoreLabel.text = (String(101 - bodys.length));
		this.setScore(this.goldScore, this.myGroup);
	}


	private createScore() {
		let labelIc: egret.Bitmap = new egret.Bitmap(RES.getRes("allgold_png"));
		let label: egret.TextField = new egret.TextField();
		label.text = "100";
		label.size = 26;
		label.x = 35;
		label.y = 3;
		label.textColor = 0xfff000;
		this.scoreLabel = label;
		this.addChild(this.scoreLabel);

		this.myGroup = new eui.Group();
		this.myGroup.x = 50;
		this.myGroup.y = 30;
		this.myGroup.removeChildren();
		this.myGroup.layout = new eui.BasicLayout();

		this.allGoldGroup = new eui.Group();
		this.allGoldGroup.x = 360;
		this.allGoldGroup.y = 30;
		this.allGoldGroup.removeChildren();
		this.allGoldGroup.layout = new eui.BasicLayout();

		let hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
		hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
		this.myGroup.layout = hLayout;   /// 水平布局
		this.allGoldGroup.layout = hLayout;

		this.allGoldGroup.addChild(labelIc);
		this.allGoldGroup.addChild(label);

		this.addChild(this.myGroup);
		this.addChild(this.allGoldGroup);

		this.setScore(0, this.myGroup);
	}

	private scoreLabel: egret.TextField;
	private myGroup: eui.Group;
	private allGoldGroup: eui.Group;

	public setScore(num: number, group: eui.Group) {
		group.removeChildren();
		let arr = this.digitize(num);
		for (let i: number = 0; i < arr.length; i++) {
			let score: eui.Image = new eui.Image(RES.getRes("score_json." + arr[i]));
			group.addChild(score);
		}

	}

	private digitize(num: number) {
		let str = num + "";
		let arr = [];
		str.split("").forEach(function (item) {
			arr.push(parseInt(item));
		})
		return arr;
	}

}