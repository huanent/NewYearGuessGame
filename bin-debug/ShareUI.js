var ShareUI = (function (_super) {
    __extends(ShareUI, _super);
    function ShareUI(totalNum) {
        _super.call(this);
        this.totalNum = totalNum;
        this.init();
    }
    var d = __define,c=ShareUI,p=c.prototype;
    p.init = function () {
        var _this = this;
        var bg1 = new egret.Bitmap(RES.getRes("光芒背景1_png"));
        _super.prototype.addChild.call(this, bg1);
        var top = new egret.Bitmap(RES.getRes("top_png"));
        _super.prototype.addChild.call(this, top);
        var more = new egret.Bitmap(RES.getRes("更多惊喜btn_png"));
        more.x = (720 - more.width) / 2;
        more.y = 830;
        more.touchEnabled = true;
        more.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var moreInfo = new MoreInfo();
            _super.prototype.addChild.call(_this, moreInfo);
            var qr = document.getElementById("qr");
            qr.style.visibility = "visible"; //visible
        }, this);
        _super.prototype.addChild.call(this, more);
        var share = new egret.Bitmap(RES.getRes("分享游戏_png"));
        share.x = (720 - share.width) / 2 + 150;
        share.y = 950;
        share.touchEnabled = true;
        share.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.addChild(new ShareHand());
        }, this);
        _super.prototype.addChild.call(this, share);
        var again = new egret.Bitmap(RES.getRes("重新游戏_png"));
        again.x = (720 - again.width) / 2 - 150;
        again.touchEnabled = true;
        again.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var closeEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
            _this.dispatchEvent(closeEvent);
        }, this);
        again.y = 950;
        _super.prototype.addChild.call(this, again);
        var txt = new egret.TextField();
        txt.text = "出品：云迈网络  创意：互联网";
        txt.width = 720;
        txt.textAlign = "center";
        txt.textColor = 0xc98b4d;
        txt.y = 1080;
        _super.prototype.addChild.call(this, txt);
        this.addDynamicPic();
    };
    p.addDynamicPic = function () {
        if (this.totalNum <= 4) {
            this.AddDynamicPicItem(1);
        }
        else if (this.totalNum > 4 && this.totalNum <= 8) {
            this.AddDynamicPicItem(2);
        }
        else if (this.totalNum > 8 && this.totalNum <= 12) {
            this.AddDynamicPicItem(3);
        }
        else if (this.totalNum > 12 && this.totalNum <= 16) {
            this.AddDynamicPicItem(4);
        }
    };
    p.AddDynamicPicItem = function (n) {
        var left = new egret.Bitmap(RES.getRes("A" + n + "_DL1_png"));
        left.x = 20;
        left.y = 180;
        _super.prototype.addChild.call(this, left);
        var right = new egret.Bitmap(RES.getRes("A" + n + "_DL2_png"));
        right.x = 700 - right.width;
        right.y = 180;
        _super.prototype.addChild.call(this, right);
        var center = new egret.Bitmap(RES.getRes("A" + n + "_DL3_png"));
        center.x = (720 - center.width) / 2;
        center.y = 30;
        _super.prototype.addChild.call(this, center);
        var dh1 = new egret.Bitmap(RES.getRes("A" + n + "_PIC1_png"));
        dh1.x = (720 - dh1.width) / 2;
        dh1.y = 230;
        _super.prototype.addChild.call(this, dh1);
        var dh2 = new egret.Bitmap(RES.getRes("A" + n + "_PIC2_png"));
        dh2.x = (720 - dh2.width) / 2;
        dh2.y = 230;
        dh2.visible = false;
        var timer = new egret.Timer(100, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            dh1.visible = !dh1.visible;
            dh2.visible = !dh2.visible;
        }, this);
        timer.start();
        _super.prototype.addChild.call(this, dh2);
    };
    return ShareUI;
}(egret.Sprite));
egret.registerClass(ShareUI,'ShareUI');
//# sourceMappingURL=ShareUI.js.map