class ShareUI extends egret.Sprite {
    private totalNum: number;
    constructor(totalNum: number) {
        super();
        this.totalNum = totalNum;
        this.init();
    }
    private init(): void {
        let bg1: egret.Bitmap = new egret.Bitmap(RES.getRes("光芒背景1_png"));
        super.addChild(bg1);
        let top: egret.Bitmap = new egret.Bitmap(RES.getRes("top_png"));
        super.addChild(top);
        let more: egret.Bitmap = new egret.Bitmap(RES.getRes("更多惊喜btn_png"));
        more.x = (720 - more.width) / 2;
        more.y = 830;
        more.touchEnabled = true;
        more.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            let moreInfo: MoreInfo = new MoreInfo();
            super.addChild(moreInfo);
            let qr:HTMLElement=document.getElementById("qr");
            qr.style.visibility = "visible";//visible
        }, this)
        super.addChild(more);
        let share: egret.Bitmap = new egret.Bitmap(RES.getRes("分享游戏_png"));
        share.x = (720 - share.width) / 2 + 150;
        share.y = 950;
        share.touchEnabled = true;
        share.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.addChild(new ShareHand());
        }, this)
        super.addChild(share);
        let again: egret.Bitmap = new egret.Bitmap(RES.getRes("重新游戏_png"));
        again.x = (720 - again.width) / 2 - 150;
        again.touchEnabled = true;
        again.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            let closeEvent: QuestionUICloseEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
            this.dispatchEvent(closeEvent);
        }, this)
        again.y = 950;
        super.addChild(again);
        let txt: egret.TextField = new egret.TextField();
        txt.text = "出品：云迈网络  创意：互联网";
        txt.width = 720;
        txt.textAlign = "center";
        txt.textColor = 0xc98b4d ;
        txt.y = 1080;
        super.addChild(txt);
        this.addDynamicPic();
    }
    private addDynamicPic(): void {
        if (this.totalNum <= 4) {
            this.AddDynamicPicItem(1);
        } else if (this.totalNum > 4 && this.totalNum <= 8) {
            this.AddDynamicPicItem(2);
        } else if (this.totalNum > 8 && this.totalNum <= 12) {
            this.AddDynamicPicItem(3);
        } else if (this.totalNum > 12 && this.totalNum <= 16) {
            this.AddDynamicPicItem(4);
        }
    }

    private AddDynamicPicItem(n: number): void {
        let left: egret.Bitmap = new egret.Bitmap(RES.getRes("A" + n + "_DL1_png"));
        left.x = 20;
        left.y = 180;
        super.addChild(left);
        let right: egret.Bitmap = new egret.Bitmap(RES.getRes("A" + n + "_DL2_png"));
        right.x = 700 - right.width;
        right.y = 180;
        super.addChild(right);
        let center: egret.Bitmap = new egret.Bitmap(RES.getRes("A" + n + "_DL3_png"));
        center.x = (720 - center.width) / 2;
        center.y = 30;
        super.addChild(center);
        let dh1: egret.Bitmap = new egret.Bitmap(RES.getRes("A" + n + "_PIC1_png"));
        dh1.x = (720 - dh1.width) / 2;
        dh1.y = 230;
        super.addChild(dh1);
        let dh2: egret.Bitmap = new egret.Bitmap(RES.getRes("A" + n + "_PIC2_png"));
        dh2.x = (720 - dh2.width) / 2;
        dh2.y = 230;
        dh2.visible = false;
        let timer: egret.Timer = new egret.Timer(100, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, (e: egret.TimerEvent) => {
            dh1.visible = !dh1.visible;
            dh2.visible = !dh2.visible;
        }, this)
        timer.start();
        super.addChild(dh2);
    }
}