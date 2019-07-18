class GameStart extends eui.Component {
    private start_btn: eui.Button;
    private hornGroup: eui.Group;

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
        this.hornGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switch, this);
        this.sound = RES.getRes("menu_mp3");
        this.channel = this.sound.play();

        this.hornOn = new eui.Image(RES.getRes("hornOn_png"));
        this.hornOff = new eui.Image(RES.getRes("hornOff_png"));

        this.hornGroup.addChild(this.hornOn);

    }

    private startGame() {
        this.isPlaySound = false;
        if (this.channel != null) {
            this.channel.stop();
            this.channel = null;
        }
        this.sound = null;
        SceneManager.switchScene(SceneManager.instance._gameMain);
    }


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

}