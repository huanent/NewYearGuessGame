var FormOk = (function (_super) {
    __extends(FormOk, _super);
    /**
     *表单
     */
    function FormOk(na, no) {
        _super.call(this);
        this.na = na;
        this.no = no;
        this.init();
    }
    var d = __define,c=FormOk,p=c.prototype;
    p.init = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRoundRect(60, 192, 600, 640, 25);
        bg.graphics.endFill();
        bg.touchEnabled = true;
        _super.prototype.addChild.call(this, bg);
        var pic = new egret.Bitmap(RES.getRes("icon_yes_png"));
        pic.y = 258;
        pic.x = (720 - pic.width) / 2;
        _super.prototype.addChild.call(this, pic);
        var line = new egret.TextField();
        line.textColor = 0x878787;
        line.size = 32;
        line.width = 540;
        line.x = 90;
        line.y = 432;
        line.text = "尊敬的" + this.na + "商户您好：";
        _super.prototype.addChild.call(this, line);
        var t2 = new egret.TextField();
        t2.textColor = 0x878787;
        t2.size = 32;
        t2.width = 540;
        t2.x = 90;
        t2.y = 512;
        t2.text = "您已成功预约云迈网络游戏定制服务，暨已成功获得价值699的定制咨询服务一次。";
        _super.prototype.addChild.call(this, t2);
        var t3 = new egret.TextField();
        t3.textColor = 0x878787;
        t3.size = 32;
        t3.width = 540;
        t3.x = 90;
        t3.y = 630;
        t3.text = "您预留的联系方式是 " + this.no + "。我们将第一时间与您联系，感谢您对云迈网络的支持！";
        _super.prototype.addChild.call(this, t3);
    };
    return FormOk;
}(egret.Sprite));
egret.registerClass(FormOk,'FormOk');
//# sourceMappingURL=FormOk.js.map