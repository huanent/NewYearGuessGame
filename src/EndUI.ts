class EndUI extends egret.Sprite {
    public constructor() {
        super();
        this.createView();
    }
    private createView(): void {
        // let txt:egret.TextField=new egret.TextField();
        // txt.text="得分"+this.totalNum;
        // super.addChild(txt);
        let bg = new egret.Shape();
        bg.graphics.beginFill(0xffc183);
        bg.graphics.drawRect(0, 0, 750, 1155);
        bg.graphics.endFill;
        super.addChild(bg);
        let top: egret.Bitmap = new egret.Bitmap(RES.getRes("top_png"));
        super.addChild(top);
        this.addImg();
        this.addTxt();


    }
    private addImg(): void {
        let wait1: egret.Bitmap = new egret.Bitmap(RES.getRes("waiting1_png"));
        wait1.x = (720 - wait1.width) / 2;
        wait1.y = 280;
        super.addChild(wait1);
        let wait2: egret.Bitmap = new egret.Bitmap(RES.getRes("waiting2_png"));
        wait2.x = (720 - wait1.width) / 2;
        wait2.y = 280;
        wait2.visible = false;
        super.addChild(wait2);
        let timer: egret.Timer = new egret.Timer(100, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, (e: egret.TimerEvent) => {
            wait1.visible = !wait1.visible;
            wait2.visible = !wait2.visible;
        }, this)
        timer.start();
    }
    private addTxt(): void {
        let picList: Array<egret.Bitmap> = new Array<egret.Bitmap>();
        let addPic: Function = (n: number) => {
            let pic: egret.Bitmap = new egret.Bitmap(RES.getRes("text" + n + "_png"));
            pic.x = (720 - pic.width) / 2;
            pic.y = 500 + n * 50;
            pic.visible = false;
            this.addChild(pic);
            picList.push(pic);
        }
        for (var index = 0; index < 10; index++) {
            addPic(index + 1);
        }
        let timer: egret.Timer = new egret.Timer(800, 10);
        let currentPicIndex = 0;
        timer.addEventListener(egret.TimerEvent.TIMER, (e: egret.TimerEvent) => {
            picList[currentPicIndex++].visible = true;
            if (currentPicIndex == 10) {
                egret.Tween.get(picList[9]).wait(500).call(() => {
                    let closeEvent: QuestionUICloseEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
                    this.dispatchEvent(closeEvent);
                })

            }
        }, this)
        timer.start();

    }
}