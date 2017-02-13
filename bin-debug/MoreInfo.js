var MoreInfo = (function (_super) {
    __extends(MoreInfo, _super);
    /**
     *更多惊喜
     */
    function MoreInfo() {
        var _this = this;
        _super.call(this);
        var shareBg = new egret.Shape();
        shareBg.graphics.beginFill(0x000000, 0.8);
        shareBg.graphics.drawRect(0, 0, 720, 1155);
        shareBg.graphics.endFill();
        shareBg.touchEnabled = true;
        shareBg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.parent.removeChild(_this);
            document.getElementById("qr").style.visibility = "hidden"; //visible
        }, this);
        _super.prototype.addChild.call(this, shareBg);
        var bg = new egret.Bitmap(RES.getRes("guanzhu_bg_png"));
        bg.x = (720 - bg.width) / 2;
        bg.y = 100;
        bg.touchEnabled = true;
        _super.prototype.addChild.call(this, bg);
        var btn = new egret.Bitmap(RES.getRes("dingzhi_btn_png"));
        btn.x = (720 - btn.width) / 2;
        btn.y = 810;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _super.prototype.removeChild.call(_this, bg);
            _super.prototype.removeChild.call(_this, btn);
            document.getElementById("qr").style.visibility = "hidden"; //visible
            var formUI = new FormUI();
            formUI.addEventListener(QuestionUICloseEvent.NAME, function () {
                _super.prototype.addChild.call(_this, new FormOk(formUI.inputName.text, formUI.inputNo.text));
                _super.prototype.removeChild.call(_this, formUI);
            }, _this);
            _super.prototype.addChild.call(_this, formUI);
        }, this);
        _super.prototype.addChild.call(this, btn);
    }
    var d = __define,c=MoreInfo,p=c.prototype;
    return MoreInfo;
}(egret.Sprite));
egret.registerClass(MoreInfo,'MoreInfo');
//# sourceMappingURL=MoreInfo.js.map