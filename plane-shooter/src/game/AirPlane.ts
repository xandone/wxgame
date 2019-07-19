class AirPlane extends egret.DisplayObjectContainer {
    private fireDelay: number;
    private bmp: egret.Bitmap;
    private textureName: string;
    private fireTimer: egret.Timer;
    private static cacheDict: Object = [];
    //血量
    public blood: number;
    //飞行速度
    public speed: number;
    //奖品数
    public awardCount: number = 0;
    public constructor(texture: egret.Texture, fireDelay: number, textureName: string, scale: number) {
        super();
        this.fireDelay = fireDelay;
        this.bmp = new egret.Bitmap(texture);
        this.bmp.scaleX = scale;
        this.bmp.scaleY = scale;
        this.textureName = textureName;
        this.fireTimer = new egret.Timer(fireDelay);
        this.addChild(this.bmp);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
        this.blood = 30;
    }

    public static produce(tName: string, fireDelay: number, speed: number) {
        if (AirPlane.cacheDict[tName] == null) {
            AirPlane.cacheDict[tName] = [];
        }
        let dict: AirPlane[] = AirPlane.cacheDict[tName];
        let newPlane: AirPlane;
        if (dict.length > 0) {
            newPlane = dict.pop();
        } else {
            newPlane = new AirPlane(RES.getRes(tName), fireDelay, "tName", Constant.enemyScale_1);
        }

        newPlane.blood = 10;
        newPlane.speed = speed;
        return newPlane;
    }

    public static destory(plane: AirPlane) {
        let name: string = plane.textureName;
        if (AirPlane.cacheDict[name] == null) {
            AirPlane.cacheDict[name] = [];
        }
        let dict: AirPlane[] = AirPlane.cacheDict[name];
        if (dict.indexOf(plane) == -1) {
            dict.push(plane);
        }
    }

    private createBullet(): void {
        this.dispatchEventWith(Constant.createBullet);
    }

    public fire() {
        this.fireTimer.start();
    }

    public stopFire() {
        this.fireTimer.stop();
    }
}
