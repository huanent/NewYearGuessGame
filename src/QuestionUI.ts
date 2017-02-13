class QuestionUI extends egret.Sprite {
    question: egret.Bitmap;
    question2: egret.Bitmap;
    a: egret.Bitmap;
    b: egret.Bitmap;
    c: egret.Bitmap;
    d: egret.Bitmap;
    public constructor(question: egret.Bitmap, question2: egret.Bitmap, a: egret.Bitmap, b: egret.Bitmap, c: egret.Bitmap, d: egret.Bitmap) {
        super();
        this.question = question;
        this.question2 = question2;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.createView();
    }
    private createView(): void {
        let bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0xffc183);
        bg.graphics.drawRect(0, 0, 720, 1155);
        bg.graphics.endFill();
        super.addChild(bg);
        let top: egret.Bitmap = new egret.Bitmap(RES.getRes("top_png"));
        super.addChild(top);

        this.question.y = 185;
        this.question.x = 50;
        super.addChild(this.question);
        this.question2.y = 185;
        this.question2.x = 50;
        this.question2.visible = false;
        super.addChild(this.question2);
        this.a.x = 100;
        this.a.y = 656;
        super.addChild(this.a);
        this.b.x = 100;
        this.b.y = 763;
        super.addChild(this.b);
        this.c.x = 100;
        this.c.y = 872;
        super.addChild(this.c);
        this.d.x = 100;
        this.d.y = 980;
        super.addChild(this.d);

        this.addTimer();
        this.addEvent();
    }
    private addEvent(): void {
        
        this.a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap, this);
        this.b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap, this);
        this.c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap, this);
        this.d.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap, this);
    }

    private itemTap(e: egret.TouchEvent): void {
        let closeEvent: QuestionUICloseEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
        let item: egret.Bitmap = e.currentTarget;
        item.touchEnabled=false;
        let temp: any = item.name;
        closeEvent.num = temp;
        egret.Tween.get(this.a).to({ x: this.a.x - 720 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.c).to({ x: this.a.x - 720 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.b).to({ x: this.a.x + 720 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.question).to({ y: this.question.y - 1155 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.question2).to({ y: this.question2.y - 1155 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.d).to({ x: this.a.x + 720 }, 500, egret.Ease.cubicIn).call(() => {
            this.dispatchEvent(closeEvent);
        });
    }
    private addTimer(): void {
        let questionTimer: egret.Timer = new egret.Timer(150);
        questionTimer.addEventListener(egret.TimerEvent.TIMER, () => {
            this.question.visible = !this.question.visible;
            this.question2.visible = !this.question2.visible;
        }, this)
        questionTimer.start();
    }
    enableTab():void{
        this.a.touchEnabled = true;
        this.b.touchEnabled = true;
        this.c.touchEnabled = true;
        this.d.touchEnabled = true;
    }
}