class GameMap extends egret.DisplayObjectContainer {
    private textureH: number;
    private rowCount: number;
    private bmpArr: egret.Bitmap[];
    private speed: number = 2;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        let texture: egret.Texture = RES.getRes("bg_jpg");
        this.textureH = texture.textureHeight;
        this.rowCount = Math.ceil(Constant.stageW / this.textureH) + 1;
        this.bmpArr = [];
        for (let i: number = 0; i < this.rowCount; i++) {
            let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("bg_jpg"));
            bg.y = this.textureH * i - (this.textureH * this.rowCount - Constant.stageH);
            this.bmpArr.push(bg);
            this.addChild(bg);
        }

    }
    public start() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    }
    public pause() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    }

    private enterFrame() {
        for (let i: number = 0; i < this.rowCount; i++) {
            let bg: egret.Bitmap = this.bmpArr[i];
            bg.y += this.speed;
            if (bg.y > Constant.stageH) {
                bg.y = this.bmpArr[0].y - this.textureH;
                this.bmpArr.pop();
                this.bmpArr.unshift(bg);
            }
        }
    }

}