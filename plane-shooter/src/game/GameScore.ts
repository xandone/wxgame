class GameScore extends eui.Component {

    private restart_btn: eui.Button;
    private myGroup: eui.Group;

    public constructor() {
        super();
        this.skinName = "resource/eui_skins/gameSkin/score.exml";
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
    }
    private init() {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.init, this);
        this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
        this.setScore(103);
    }

    private restart() {
        SceneManager.switchScene(SceneManager.instance._gameMain);
        SceneManager.instance._gameMain.restart();
    }

    public setScore(num: number) {

        this.myGroup = new eui.Group();
        this.addChild(this.myGroup);
        this.myGroup.layout = new eui.BasicLayout();
        this.myGroup.width = 374;
        this.myGroup.height = 80;
        this.myGroup.x = 56;
        this.myGroup.y = 496;



        let arr = this.digitize(num);
        for (let i: number = 0; i < arr.length; i++) {
            this.myGroup.addChild(new egret.Bitmap(RES.getRes("score_json.imgFont" + arr[i])));
        }

        let hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.myGroup.layout = hLayout;   /// 水平布局


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