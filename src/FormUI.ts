class FormUI extends egret.Sprite {
    na: string;
    no: string;
    inputName: egret.TextField;
    inputNo: egret.TextField;
    /**
     *表单
     */
    constructor() {
        super();
        this.init();
    }
    private init(): void {
        let pic: egret.Bitmap = new egret.Bitmap(RES.getRes("gift_bg_png"));
        pic.y = (1155 - pic.height) / 2;
        pic.x = (720 - pic.width) / 2;
        pic.touchEnabled = true;
        super.addChild(pic);


        this.inputName = new egret.TextField();
        this.inputName.type = egret.TextFieldType.INPUT;
        this.inputName.textColor = 0x878787;
        this.inputName.size = 35;
        this.inputName.width = 444;
        this.inputName.height = 90;
        this.inputName.x = 149;
        this.inputName.y = 457;
        super.addChild(this.inputName);

        this.inputNo = new egret.TextField();
        this.inputNo.type = egret.TextFieldType.INPUT;
        this.inputNo.textColor = 0x878787;
        this.inputNo.size = 35;
        this.inputNo.width = 444;
        this.inputNo.height = 90;
        this.inputNo.x = 149;
        this.inputNo.y = 627;
        super.addChild(this.inputNo);

        let btn: egret.Bitmap = new egret.Bitmap(RES.getRes("tijiao_btn_png"));
        btn.y = 740;
        btn.x = (720 - btn.width) / 2;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this.inputName.text.length > 12) {
                alert("商户名称最长12位")
                return;
            }
            if (this.inputNo.text.length != 11) {
                alert("手机号必须11位")
                return;
            }

            var params = "name="+this.inputName.text+"&phone="+this.inputNo.text;

            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("http://app.yunmainetwork.com/LightWebApp/YuanXiaoJie2017/Register", egret.HttpMethod.POST);
            //设置响应头
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //发送参数
            request.send(params);
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        }, this)
        super.addChild(btn);
    }
    private onGetComplete(): void {
        let closeEvent: QuestionUICloseEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
        this.dispatchEvent(closeEvent);
    }
    private onGetIOError(e: egret.IOErrorEvent): void {
        console.log("请求错误");
        alert(e);
        let closeEvent: QuestionUICloseEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
        this.dispatchEvent(closeEvent);
    }
}