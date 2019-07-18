class Bullet extends egret.Bitmap {

    private tName: string;
    private static cacheDict: Object = {};

    public constructor(texture: egret.Texture, tName: string) {
        super(texture);
        this.texture = texture;
        this.tName = tName;
    }

    public static produce(tName: string) {
        if (Bullet.cacheDict[tName] == null) {
            Bullet.cacheDict[tName] = [];
        }
        let dict: Bullet[] = Bullet.cacheDict[tName];
        let bullet: Bullet;
        if (dict.length > 0) {
            bullet = dict.pop();
        } else {
            bullet = new Bullet(RES.getRes(tName), tName);
            bullet.scaleX=Constant.myBulletS_1;
            bullet.scaleY=Constant.myBulletS_1;
            
        }
        return bullet;
    }

    public static destroy(mybullet: Bullet) {
        let name: string = mybullet.tName;
        if (Bullet.cacheDict[name] == null) {
            Bullet.cacheDict[name] = [];
        }
        let dict: Bullet[] = Bullet.cacheDict[name];
        if (dict.indexOf(mybullet) == -1) {
            dict.push(mybullet);
        }
    }

}
