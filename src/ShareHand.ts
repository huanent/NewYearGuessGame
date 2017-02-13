class ShareHand extends egret.Sprite {
    /**
     * 分享拇指图层
     */
    constructor() {
        super();
        let shareBg: egret.Shape = new egret.Shape();
        shareBg.graphics.beginFill(0x000000, 0.8);
        shareBg.graphics.drawRect(0, 0, 720, 1155);
        shareBg.graphics.endFill();
        shareBg.touchEnabled=true;
        shareBg.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.parent.removeChild(this);
        },this)
        super.addChild(shareBg);
        let bg1: egret.Bitmap = new egret.Bitmap(RES.getRes("share_pic1_png"));
        bg1.x = 520;
        bg1.y=30;
        super.addChild(bg1);
        let bg2: egret.Bitmap = new egret.Bitmap(RES.getRes("share_pic2_png"));
        bg2.x = 520;
        bg2.y=30;
        bg2.visible = false;
        super.addChild(bg2);
        let timer: egret.Timer = new egret.Timer(300, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, () => {
            bg1.visible = !bg1.visible;
            bg2.visible = !bg2.visible;
        }, this)
        timer.start();
    }
}