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
    }

    private restart() {
        SceneManager.switchScene(SceneManager.instance._gameMain);
        SceneManager.instance._gameMain.restart();
    }

    public setScore(num: number) {
        this.myGroup.removeChildren();
        this.myGroup.layout = new eui.BasicLayout();

        let arr = this.digitize(num);
        for (let i: number = 0; i < arr.length; i++) {
            let score: eui.Image = new eui.Image(RES.getRes("score_json.imgFont" + arr[i]));
            score.scaleX = Constant.scoreNum;
            score.scaleY = Constant.scoreNum;
            this.myGroup.addChild(score);
        }

        let hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.paddingTop = 20;
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