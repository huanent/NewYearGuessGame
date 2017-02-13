var ShareHand = (function (_super) {
    __extends(ShareHand, _super);
    /**
     * 分享拇指图层
     */
    function ShareHand() {
        var _this = this;
        _super.call(this);
        var shareBg = new egret.Shape();
        shareBg.graphics.beginFill(0x000000, 0.8);
        shareBg.graphics.drawRect(0, 0, 720, 1155);
        shareBg.graphics.endFill();
        shareBg.touchEnabled = true;
        shareBg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.parent.removeChild(_this);
        }, this);
        _super.prototype.addChild.call(this, shareBg);
        var bg1 = new egret.Bitmap(RES.getRes("share_pic1_png"));
        bg1.x = 520;
        bg1.y = 30;
        _super.prototype.addChild.call(this, bg1);
        var bg2 = new egret.Bitmap(RES.getRes("share_pic2_png"));
        bg2.x = 520;
        bg2.y = 30;
        bg2.visible = false;
        _super.prototype.addChild.call(this, bg2);
        var timer = new egret.Timer(300, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            bg1.visible = !bg1.visible;
            bg2.visible = !bg2.visible;
        }, this);
        timer.start();
    }
    var d = __define,c=ShareHand,p=c.prototype;
    return ShareHand;
}(egret.Sprite));
egret.registerClass(ShareHand,'ShareHand');
//# sourceMappingURL=ShareHand.js.map