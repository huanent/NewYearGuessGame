class BeginUI extends egret.Sprite {
    public constructor() {
        super();
        this.createView();
    }
    tabFireEvent: TabFireEvent = new TabFireEvent(TabFireEvent.NAME);
    bg1: egret.Bitmap;
    bg2: egret.Bitmap;
    lamp1: egret.Bitmap;
    lamp2: egret.Bitmap;
    fire: egret.Bitmap;
    private createView(): void {
        this.AddBg();
        this.AddTimer();
    }

    private AddBg(): void {
        this.bg1 = new egret.Bitmap(RES.getRes("光芒背景1_png"));
        super.addChild(this.bg1);

        this.bg2 = new egret.Bitmap(RES.getRes("光芒背景2_png"));
        super.addChild(this.bg2);

        let cl: egret.Bitmap = new egret.Bitmap(RES.getRes("chuanglian_png"));
        super.addChild(cl);

        this.lamp1 = new egret.Bitmap(RES.getRes("灯笼左边_png"));
        this.lamp1.x = 20;
        this.lamp1.y = 70;
        this.lamp1.rotation = 20;
        super.addChild(this.lamp1);
        this.lamp2 = new egret.Bitmap(RES.getRes("灯笼右边_png"));
        this.lamp2.x = 700 - this.lamp2.width;;
        this.lamp2.y = 70;
        this.lamp1.rotation = 20;
        super.addChild(this.lamp2);

        let mainBg: egret.Bitmap = new egret.Bitmap(RES.getRes("pic_bg_png"));
        super.addChild(mainBg);

        this.fire = new egret.Bitmap(RES.getRes("dahuoji_png"));
        this.fire.x = (720 - this.fire.width) / 2
        this.fire.y = 820;
        this.fire.touchEnabled = true;
        this.fire.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        egret.Tween.get(this.fire, { loop: true })
            .to({ y: this.fire.y - 30 }, 500, egret.Ease.cubicIn)
            .to({ y: this.fire.y }, 500, egret.Ease.cubicOut)
        super.addChild(this.fire);
    }

    private AddTimer(): void {
        var timer: egret.Timer = new egret.Timer(200, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.RepeatTimer, this);
        timer.start();
    }

    private touchHandler(evt: egret.TouchEvent): void {
        egret.Tween.removeTweens(this.fire);
        egret.Tween.get(this.fire)
            .to({ y: 1500 }, 500, egret.Ease.cubicIn).call(() => {
                this.dispatchEvent(this.tabFireEvent);
            })
    }

    //重复动画
    private RepeatTimer(): void {
        super.swapChildren(this.bg1, this.bg2);
        if (this.lamp1.rotation == 20) {
            this.lamp1.rotation = -20;
            this.lamp1.anchorOffsetY = -this.lamp1.height / 3;
            this.lamp2.rotation = -20;
            this.lamp2.anchorOffsetY = -this.lamp1.height / 3;
        } else {
            this.lamp1.rotation = 20;
            this.lamp1.anchorOffsetY = 0;
            this.lamp2.rotation = 20;
            this.lamp2.anchorOffsetY = 0;
        }
    }
}