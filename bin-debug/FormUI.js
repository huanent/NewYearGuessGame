var FormUI = (function (_super) {
    __extends(FormUI, _super);
    /**
     *表单
     */
    function FormUI() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=FormUI,p=c.prototype;
    p.init = function () {
        var _this = this;
        var pic = new egret.Bitmap(RES.getRes("gift_bg_png"));
        pic.y = (1155 - pic.height) / 2;
        pic.x = (720 - pic.width) / 2;
        pic.touchEnabled = true;
        _super.prototype.addChild.call(this, pic);
        this.inputName = new egret.TextField();
        this.inputName.type = egret.TextFieldType.INPUT;
        this.inputName.textColor = 0x878787;
        this.inputName.size = 35;
        this.inputName.width = 444;
        this.inputName.height = 90;
        this.inputName.x = 149;
        this.inputName.y = 457;
        _super.prototype.addChild.call(this, this.inputName);
        this.inputNo = new egret.TextField();
        this.inputNo.type = egret.TextFieldType.INPUT;
        this.inputNo.textColor = 0x878787;
        this.inputNo.size = 35;
        this.inputNo.width = 444;
        this.inputNo.height = 90;
        this.inputNo.x = 149;
        this.inputNo.y = 627;
        _super.prototype.addChild.call(this, this.inputNo);
        var btn = new egret.Bitmap(RES.getRes("tijiao_btn_png"));
        btn.y = 740;
        btn.x = (720 - btn.width) / 2;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.inputName.text.length > 12) {
                alert("商户名称最长12位");
                return;
            }
            if (_this.inputNo.text.length != 11) {
                alert("手机号必须11位");
                return;
            }
            var params = "name=" + _this.inputName.text + "&phone=" + _this.inputNo.text;
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("http://app.yunmainetwork.com/LightWebApp/YuanXiaoJie2017/Register", egret.HttpMethod.POST);
            //设置响应头
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //发送参数
            request.send(params);
            request.addEventListener(egret.Event.COMPLETE, _this.onGetComplete, _this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, _this.onGetIOError, _this);
        }, this);
        _super.prototype.addChild.call(this, btn);
    };
    p.onGetComplete = function () {
        var closeEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
        this.dispatchEvent(closeEvent);
    };
    p.onGetIOError = function (e) {
        console.log("请求错误");
        alert(e);
        var closeEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
        this.dispatchEvent(closeEvent);
    };
    return FormUI;
}(egret.Sprite));
egret.registerClass(FormUI,'FormUI');
//# sourceMappingURL=FormUI.js.map