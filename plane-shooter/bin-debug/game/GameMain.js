var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        var _this = _super.call(this) || this;
        _this.myBullets = [];
        _this.enemyBullets = [];
        _this.enemyPlane = [];
        _this.enemyPlaneTimer = new egret.Timer(1000);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameMain.prototype.init = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.createMain();
    };
    GameMain.prototype.createMain = function () {
        SceneManager.addScene(SceneManager.instance._gameMap, this);
        this.myPlane = new AirPlane(RES.getRes("myplane_png"), 200, "myplane_png", Constant.myPlaneScale);
        this.myPlane.x = (Constant.stageW - this.myPlane.width) / 2;
        this.myPlane.y = Constant.stageH - 120;
        this.addChild(this.myPlane);
        this.initBomb();
        this.initEvent();
        this.gameStart();
    };
    GameMain.prototype.initEvent = function () {
        this.myPlane.addEventListener(Constant.createBullet, this.createBulletHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.updateGameView, this);
        this.enemyPlaneTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemy, this);
    };
    GameMain.prototype.gameStart = function () {
        this.touchEnabled = true;
        SceneManager.instance._gameMap.start();
        this.myPlane.fire();
        this.enemyPlaneTimer.start();
    };
    GameMain.prototype.restart = function () {
        this.removeChildren();
        this.createMain();
    };
    GameMain.prototype.gameStop = function () {
        this.touchEnabled = false;
        SceneManager.instance._gameMap.pause();
        this.myPlane.stopFire();
        this.enemyPlaneTimer.stop();
        for (var i = 0; i < this.enemyPlane.length; i++) {
            this.enemyPlane[i].stopFire();
        }
        this.enemyPlane = [];
        this.enemyBullets = [];
        this.removeEventListener(egret.Event.ENTER_FRAME, this.updateGameView, this);
    };
    GameMain.prototype.touchMove = function (event) {
        if (event.type == egret.TouchEvent.TOUCH_MOVE) {
            var x = event.localX;
            x = Math.max(0, x);
            x = Math.min(Constant.stageW - this.myPlane.width, x);
            this.myPlane.x = x;
        }
    };
    /**
     * 产生敌机
     */
    GameMain.prototype.createEnemy = function (event) {
        var enemy = AirPlane.produce("enemy1_png", 1000);
        enemy.x = Math.random() * (Constant.stageW - enemy.width);
        enemy.y = -enemy.height - Math.random() * 300;
        enemy.addEventListener(Constant.createBullet, this.createBulletHandler, this);
        enemy.fire();
        this.addChildAt(enemy, this.numChildren - 1);
        this.enemyPlane.push(enemy);
    };
    GameMain.prototype.createBulletHandler = function (event) {
        var bullet;
        if (event.target == this.myPlane) {
            for (var i = 0; i < 2; i++) {
                bullet = Bullet.produce("bul1_png");
                bullet.x = i == 0 ? (this.myPlane.x + 10) : (this.myPlane.x + this.myPlane.width - 22);
                bullet.y = this.myPlane.y - 10;
                this.addChildAt(bullet, this.numChildren - 1 - this.enemyPlane.length);
                this.myBullets.push(bullet);
            }
        }
        else {
            var enemy = event.target;
            bullet = Bullet.produce("enemybul_png");
            bullet.x = enemy.x + enemy.width / 2 - bullet.width / 2;
            bullet.y = enemy.y + enemy.height + 10;
            this.addChildAt(bullet, this.numChildren - 1 - this.enemyPlane.length);
            this.enemyBullets.push(bullet);
        }
    };
    GameMain.prototype.updateGameView = function () {
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        var speedOffset = 60 / fps;
        // 我的子弹
        var len = this.myBullets.length;
        for (var i = 0; i < len; i++) {
            var bul = this.myBullets[i];
            if (bul.y < -bul.height) {
                try {
                    this.removeChild(bul);
                }
                catch (error) {
                }
                Bullet.destroy(bul);
                this.myBullets.splice(i, 1);
                i--;
                len--;
            }
            bul.y -= 12 * speedOffset;
        }
        // 敌机运动
        var enemyLen = this.enemyPlane.length;
        for (var i = 0; i < enemyLen; i++) {
            var enemy = this.enemyPlane[i];
            if (enemy.y > Constant.stageH) {
                try {
                    this.removeChild(enemy);
                }
                catch (error) {
                }
                AirPlane.destory(enemy);
                enemy.removeEventListener(Constant.createBullet, this.createBulletHandler, this);
                this.enemyPlane.splice(i, 1);
                i--;
                enemyLen--;
            }
            enemy.y += 4 * speedOffset;
        }
        // 敌机子弹
        var enemyBulletsLen = this.enemyBullets.length;
        for (var i = 0; i < enemyBulletsLen; i++) {
            var bul = this.enemyBullets[i];
            if (bul.y > Constant.stageH) {
                try {
                    this.removeChild(bul);
                }
                catch (error) {
                }
                Bullet.destroy(bul);
                this.enemyBullets.splice(i, 1);
                i--;
                enemyBulletsLen--;
            }
            bul.y += 6 * speedOffset;
        }
        // 判断是否击中敌机
        for (var i = 0; i < len; i++) {
            var bul = this.myBullets[i];
            for (var j = 0; j < enemyLen; j++) {
                var enemy = this.enemyPlane[j];
                if (SceneManager.hitTest(bul, enemy)) {
                    try {
                        this.bomb(this.bombMc, enemy.x, enemy.y);
                        this.removeChild(enemy);
                    }
                    catch (error) {
                        console.log(error);
                    }
                    AirPlane.destory(enemy);
                    enemy.removeEventListener(Constant.createBullet, this.createBulletHandler, this);
                    this.enemyPlane.splice(j, 1);
                    j--;
                    enemyLen--;
                }
            }
        }
        // 判断是否击中我机
        for (var i = 0; i < enemyBulletsLen; i++) {
            var bul = this.enemyBullets[i];
            if (SceneManager.hitTest(bul, this.myPlane)) {
                try {
                    //击中的这颗子弹必须移除，否则下个渲染又会判断认为击中了我机
                    this.removeChild(bul);
                    Bullet.destroy(bul);
                    this.enemyBullets.splice(i, 1);
                    i--;
                    this.bomb(this.bombMc, this.myPlane.x, this.myPlane.y);
                    this.myPlane.blood -= 10;
                    console.log(this.myPlane.blood);
                    if (this.myPlane.blood <= 0) {
                        this.gameStop();
                        setTimeout(function () {
                            SceneManager.switchScene(SceneManager.instance._gameScore);
                        }, 1000);
                    }
                    return;
                }
                catch (error) {
                }
            }
        }
    };
    GameMain.prototype.initBomb = function () {
        var data = RES.getRes("bbb_json");
        var txtr = RES.getRes("bbb_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.bombMc = new egret.MovieClip(mcFactory.generateMovieClipData("b"));
        this.bombMc.scaleX = 0.5;
        this.bombMc.scaleY = 0.5;
    };
    GameMain.prototype.bomb = function (mc1, x, y) {
        mc1.x = x;
        mc1.y = y;
        this.addChild(mc1);
        mc1.gotoAndPlay(1);
    };
    return GameMain;
}(egret.DisplayObjectContainer));
__reflect(GameMain.prototype, "GameMain");