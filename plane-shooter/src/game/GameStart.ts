class GameStart extends eui.Component {
    private start_btn: eui.Button;
    private about_btn: eui.Button;
    private ranking_btn: eui.Button;
    private hornGroup: eui.Group;
    private about: eui.Group;

    private sound: egret.Sound;
    private channel: egret.SoundChannel;

    private hornOn: eui.Image;
    private hornOff: eui.Image;

    private isPlaySound: boolean = true;

    public constructor() {
        super();
        this.skinName = "resource/eui_skins/gameSkin/start.exml";
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
    }

    private init() {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.about_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aboutGame, this);
        this.ranking_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obBtnRankingClick, this);
        this.hornGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switch, this);
        this.sound = RES.getRes("menu_mp3");
        this.channel = this.sound.play();

        this.hornOn = new eui.Image(RES.getRes("hornOn_png"));
        this.hornOff = new eui.Image(RES.getRes("hornOff_png"));

        this.hornGroup.addChild(this.hornOn);

    }
    /**
     * 开始游戏
     */
    private startGame() {
        this.isPlaySound = false;
        if (this.channel != null) {
            this.channel.stop();
            this.channel = null;
        }
        this.sound = null;
        SceneManager.switchScene(SceneManager.instance._gameMain);
    }

    /**
     * 声音切换
     */
    private switch() {
        this.isPlaySound = !this.isPlaySound;
        if (this.isPlaySound) {
            this.channel = this.sound.play();
            this.hornGroup.removeChildren();
            this.hornGroup.addChild(this.hornOn);
        } else {
            this.channel.stop();
            this.channel = null;
            this.hornGroup.removeChildren();
            this.hornGroup.addChild(this.hornOff);
        }

    }

    /**
     * 关于游戏
     */
    private aboutGame() {
        this.about.visible = !this.about.visible;
    }



    /**
    * 排行榜遮罩，为了避免点击开放数据域影响到主域，在主域中建立一个遮罩层级来屏蔽点击事件.</br>
    * 根据自己的需求来设置遮罩的 alpha 值 0~1.</br>
    */
    private rankingListMask: egret.Shape;

    private isRankClick: boolean = false;
    private bitmap: egret.Bitmap;


    //显示微信排行榜
    public obBtnRankingClick(e: egret.TouchEvent) {
        console.log("点击排行榜");
        let platform: any = window.platform;
        if (!this.isRankClick) {
            //处理遮罩,避免开放域数据影响主域
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.4;
            //设置为true,以免触摸到下面的按钮
            this.rankingListMask.touchEnabled = true;
            this.addChildAt(this.rankingListMask, 999);

            //显示开放域数据
            this.bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.addChild(this.bitmap);

            //让排行榜按钮显示在容器内
            this.addChild(this.ranking_btn);

            //主域向子域发送数据
            platform.openDataContext.postMessage({
                isRanking: this.isRankClick,
                text: "egret",
                year: (new Date()).getFullYear(),
                score: 101,
                command: "open"
            });

            this.isRankClick = true;
        }
        else {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.isRankClick = false;
            platform.openDataContext.postMessage({
                isRanking: this.isRankClick,
                text: "30",
                year: (new Date()).getFullYear(),
                command: "close"
            });
        }
    }

}