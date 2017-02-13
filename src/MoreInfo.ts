class MoreInfo extends egret.Sprite {
    /**
     *更多惊喜
     */
    constructor() {
        super();
        let shareBg: egret.Shape = new egret.Shape();
        shareBg.graphics.beginFill(0x000000, 0.8);
        shareBg.graphics.drawRect(0, 0, 720, 1155);
        shareBg.graphics.endFill();
        shareBg.touchEnabled = true;
        shareBg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.parent.removeChild(this);
            document.getElementById("qr").style.visibility = "hidden";//visible
        }, this)
        super.addChild(shareBg);
        let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("guanzhu_bg_png"));
        bg.x = (720 - bg.width) / 2;
        bg.y = 100;
        bg.touchEnabled = true;
        super.addChild(bg);
        let btn: egret.Bitmap = new egret.Bitmap(RES.getRes("dingzhi_btn_png"));
        btn.x = (720 - btn.width) / 2;
        btn.y = 810;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            super.removeChild(bg);
            super.removeChild(btn);
            document.getElementById("qr").style.visibility = "hidden";//visible
            let formUI: FormUI = new FormUI();
            formUI.addEventListener(QuestionUICloseEvent.NAME, () => {
                super.addChild(new FormOk(formUI.inputName.text,formUI.inputNo.text));
                super.removeChild(formUI);
            }, this)
            super.addChild(formUI)
        }, this);
        super.addChild(btn);
    }
}