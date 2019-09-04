class GameMain extends egret.DisplayObjectContainer {
    private bombMc: egret.MovieClip;
    private bomnMcY: number;
    private isGameOver;
    private hero: egret.Bitmap;
    private lifebuoy: egret.Bitmap;
    private lineShape: egret.Shape;
    private swingx: number[] = [];
    private swingy: number[] = [];
    private isSwingRight: boolean = true;
    private stillnessX: number;
    private stillnessY: number;
    private moveSpeed: number = 5;
    private scalePush: number;
    private pullHumanScale: number;
    private humanArr: Human[] = [];
    private pullMan: Human;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this)
    }

    private init() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.createMain();
    }

    private createMain() {
        this.initMap();
        this.initSelf();
        this.initHuman();
        this.initLifebuoy();

        this.start();
    }

    private start() {
        this.rightSwing();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stopTween, this);
    }

    private initMap() {
        SceneManager.addScene(SceneManager.instance._gameMap, this);
        SceneManager.instance._gameMap.start();
    }

    private initSelf() {
        let self: egret.Bitmap = new egret.Bitmap(RES.getRes("self_png"));
        self.x = Constant.stageW / 2 - self.width / 2;
        self.y = Constant.stageH - 280;
        this.hero = self;
        this.addChild(self);
    }

    private initHuman() {
        let human = new Human();
        human.create("self_png");
        this.addChild(human);
        this.humanArr.push(human);
    }

    private initLifebuoy() {
        let life: egret.Bitmap = new egret.Bitmap(RES.getRes("lifebuoy_png"));
        this.swingx[0] = this.hero.x - life.width / 2;
        this.swingx[1] = this.hero.x + this.hero.width / 2 - life.width / 2;
        this.swingx[2] = this.hero.x + this.hero.width - life.width / 2;

        this.swingy[0] = this.hero.y + this.hero.height / 2;
        this.swingy[1] = this.hero.y + this.hero.height;
        this.swingy[2] = this.hero.y + this.hero.height / 2;

        life.x = this.swingx[0];
        life.y = this.swingy[0];
        this.lifebuoy = life;

        this.drawLine();
        this.addChild(life);
    }

    private drawLine(): egret.Shape {
        this.lineShape = new egret.Shape();
        this.addChild(this.lineShape);
        return this.lineShape;
    }

    private rightSwing() {
        egret.Tween.get(this).to({ fact: 1 }, 2000).call(() => {
            this.leftSwing();
        });
    }

    private leftSwing() {
        egret.Tween.get(this).to({ fact2: 1 }, 2000).call(() => {
            this.rightSwing();
        });
    }

    private stopTween() {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stopTween, this);
        egret.Tween.removeTweens(this);

        let x = Math.abs(this.stillnessX - (this.hero.x + 50));
        let y = this.stillnessY - (this.hero.y + this.hero.height / 2 + 2);
        this.scalePush = y / x;
        this.isSwingRight = this.stillnessX > (this.hero.x + 50);
        this.addEventListener(egret.Event.ENTER_FRAME, this.movingLife, this);
    }

    /**
     * 推救生圈
     */
    private movingLife() {
        let speedy: number;
        if (this.scalePush > 1) {
            speedy = this.moveSpeed / this.scalePush;
        } else {
            speedy = this.moveSpeed * this.scalePush;
        }

        if (this.isSwingRight) {
            if (this.scalePush > 1) {
                this.lifebuoy.x += speedy;
                this.lifebuoy.y += this.moveSpeed;
            } else {
                this.lifebuoy.x += this.moveSpeed;
                this.lifebuoy.y += speedy;
            }

        } else {
            if (this.scalePush > 1) {
                this.lifebuoy.x -= speedy;
                this.lifebuoy.y += this.moveSpeed;
            } else {
                this.lifebuoy.x -= this.moveSpeed;
                this.lifebuoy.y += speedy;
            }
        }

        this.lineShape.graphics.clear();
        this.lineShape.graphics.lineStyle(1, 0x393B3A);
        this.lineShape.graphics.moveTo(this.hero.x + 50, this.hero.y + this.hero.height / 2 + 2);
        this.lineShape.graphics.lineTo(this.lifebuoy.x + this.lifebuoy.width / 2, this.lifebuoy.y + 20);

        if (SceneManager.rescuedTest(this.lifebuoy, this.humanArr[0])) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.movingLife, this);
            this.humanArr[0].switchChild();

            this.lifebuoy.visible = false;

            this.lineShape.graphics.clear();
            this.lineShape.graphics.lineStyle(1, 0x393B3A);
            this.lineShape.graphics.moveTo(this.hero.x + 50, this.hero.y + this.hero.height / 2 + 2);
            this.lineShape.graphics.lineTo(this.humanArr[0].x + this.humanArr[0].width / 2, this.humanArr[0].y + 50);
            this.stillnessX = this.humanArr[0].x + this.humanArr[0].width / 2;
            this.stillnessY = this.humanArr[0].y + 50;

            this.startPullHuman();
        }

        //出界
        if (this.lifebuoy.y + this.lifebuoy.height / 2 > Constant.stageH ||
            this.lifebuoy.x + this.lifebuoy.width / 2 < 0 ||
            this.lifebuoy.x + this.lifebuoy.width / 2 > Constant.stageW) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.movingLife, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.movingLifePull, this);
        }

    }


    private movingLifePull() {
        let speedy: number;
        if (this.scalePush > 1) {
            speedy = this.moveSpeed / this.scalePush;
        } else {
            speedy = this.moveSpeed * this.scalePush;
        }

        if (this.isSwingRight) {
            if (this.scalePush > 1) {
                this.lifebuoy.x -= speedy;
                this.lifebuoy.y -= this.moveSpeed;
            } else {
                this.lifebuoy.x -= this.moveSpeed;
                this.lifebuoy.y -= speedy;
            }

        } else {
            if (this.scalePush > 1) {
                this.lifebuoy.x += speedy;
                this.lifebuoy.y -= this.moveSpeed;
            } else {
                this.lifebuoy.x += this.moveSpeed;
                this.lifebuoy.y -= speedy;
            }
        }
        this.lineShape.graphics.clear();
        this.lineShape.graphics.lineStyle(1, 0x393B3A);
        this.lineShape.graphics.moveTo(this.hero.x + 50, this.hero.y + this.hero.height / 2 + 2);
        this.lineShape.graphics.lineTo(this.lifebuoy.x + this.lifebuoy.width / 2, this.lifebuoy.y + 20);

        if (this.lifebuoy.y <= this.hero.y + this.hero.height / 2) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.movingLifePull, this);

            this.lifebuoy.x = this.swingx[0];
            this.lifebuoy.y = this.swingy[0];
            this.start();
        }
    }

    private startPullHuman() {
        this.pullMan = this.humanArr[0];
        this.addEventListener(egret.Event.ENTER_FRAME, this.pullHuman, this);

        let x = Math.abs(this.stillnessX - (this.hero.x + 50));
        let y = this.stillnessY - (this.hero.y + this.hero.height / 2 + 2);
        this.pullHumanScale = y / x;
        this.isSwingRight = this.stillnessX > (this.hero.x + 50);

    }

    private pullHuman() {
        let speedy: number;
        if (this.pullHumanScale > 1) {
            speedy = this.moveSpeed / this.scalePush;
        } else {
            speedy = this.moveSpeed * this.scalePush;
        }

        if (this.isSwingRight) {
            if (this.pullHumanScale > 1) {
                this.pullMan.x -= speedy;
                this.pullMan.y -= this.moveSpeed;
            } else {
                this.pullMan.x -= this.moveSpeed;
                this.pullMan.y -= speedy;
            }

        } else {
            if (this.pullHumanScale > 1) {
                this.pullMan.x += speedy;
                this.pullMan.y -= this.moveSpeed;
            } else {
                this.pullMan.x += this.moveSpeed;
                this.pullMan.y -= speedy;
            }
        }

        this.lineShape.graphics.clear();
        this.lineShape.graphics.lineStyle(1, 0x393B3A);
        this.lineShape.graphics.moveTo(this.hero.x + 50, this.hero.y + this.hero.height / 2 + 2);
        this.lineShape.graphics.lineTo(this.pullMan.x + this.pullMan.width / 2, this.pullMan.y + 50);

        if (this.pullMan.y <= this.hero.y) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.pullHuman, this);
            this.pullMan.x = this.hero.x + this.hero.width;
            this.pullMan.y = this.hero.y;
            this.lineShape.visible = false;

        }
    }



    public get fact(): number {
        return 0;
    }

    public set fact(value: number) {
        this.lifebuoy.x = (1 - value) * (1 - value) * this.swingx[0] + 2 * value * (1 - value) * this.swingx[1] + value * value * this.swingx[2];
        this.lifebuoy.y = (1 - value) * (1 - value) * this.swingy[0] + 2 * value * (1 - value) * this.swingy[1] + value * value * this.swingy[2];

        this.lineShape.graphics.clear();
        this.lineShape.graphics.lineStyle(2, 0x393B3A);
        this.lineShape.graphics.moveTo(this.hero.x + 50, this.hero.y + this.hero.height / 2 + 2);
        this.lineShape.graphics.lineTo(this.lifebuoy.x + this.lifebuoy.width / 2, this.lifebuoy.y + 20);

        this.stillnessX = this.lifebuoy.x + this.lifebuoy.width / 2;
        this.stillnessY = this.lifebuoy.y + 20;
    }

    public get fact2(): number {
        return 0;
    }
    public set fact2(value: number) {
        this.lifebuoy.x = (1 - value) * (1 - value) * this.swingx[2] + 2 * value * (1 - value) * this.swingx[1] + value * value * this.swingx[0];
        this.lifebuoy.y = (1 - value) * (1 - value) * this.swingy[2] + 2 * value * (1 - value) * this.swingy[1] + value * value * this.swingy[0];

        this.lineShape.graphics.clear();
        this.lineShape.graphics.lineStyle(1, 0x393B3A);
        this.lineShape.graphics.moveTo(this.hero.x + 50, this.hero.y + this.hero.height / 2 + 2);
        this.lineShape.graphics.lineTo(this.lifebuoy.x + this.lifebuoy.width / 2, this.lifebuoy.y + 20);

        this.stillnessX = this.lifebuoy.x + this.lifebuoy.width / 2;
        this.stillnessY = this.lifebuoy.y + 20;
    }

}