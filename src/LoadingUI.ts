class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField: egret.TextField;

    private createView(): void {
        let bg = new egret.Shape();
        bg.graphics.beginFill(0xffc183);
        bg.graphics.drawRect(0, 0, 750, 1155);
        bg.graphics.endFill;
        super.addChild(bg);


        let picList: Array<egret.Bitmap> = new Array<egret.Bitmap>();
        let addPic: Function = (n: number) => {
            let pic: egret.Bitmap = new egret.Bitmap(RES.getRes("jisuanzhong"+n+"_png"));
            pic.x = (720 - pic.width) / 2;
            pic.y = 350;
            pic.visible = false;
            this.addChild(pic);
            picList.push(pic);
        }
        for (var index = 0; index < 7; index++) {
            addPic(index+1);
        }
        let timer: egret.Timer = new egret.Timer(100, 0);
        let currentPicIndex = 0;
        timer.addEventListener(egret.TimerEvent.TIMER, (e: egret.TimerEvent) => {
            if (currentPicIndex == 0) {
                picList[0].visible = true;
                picList[6].visible = false;
            } else {
                picList[currentPicIndex].visible = true;
                picList[currentPicIndex - 1].visible = false;
            }
            currentPicIndex++;
            if(currentPicIndex==7){
                currentPicIndex=0;
            }
            //currentPicIndex = currentPicIndex % picList.length;
        }, this)
        timer.start();

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 1155 / 2;
        this.textField.size = 30;
        this.textField.width = 720;
        this.textField.textColor = 0x861515;
        this.textField.verticalAlign = "center";
        this.textField.textAlign = "center";
    }

    public setProgress(current: number, total: number): void {

        this.textField.text = `正在加载...${current}/${total}`;
    }
}
