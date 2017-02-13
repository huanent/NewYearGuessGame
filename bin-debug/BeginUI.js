var BeginUI = (function (_super) {
    __extends(BeginUI, _super);
    function BeginUI() {
        _super.call(this);
        this.tabFireEvent = new TabFireEvent(TabFireEvent.NAME);
        this.createView();
    }
    var d = __define,c=BeginUI,p=c.prototype;
    p.createView = function () {
        this.AddBg();
        this.AddTimer();
    };
    p.AddBg = function () {
        this.bg1 = new egret.Bitmap(RES.getRes("光芒背景1_png"));
        _super.prototype.addChild.call(this, this.bg1);
        this.bg2 = new egret.Bitmap(RES.getRes("光芒背景2_png"));
        _super.prototype.addChild.call(this, this.bg2);
        var cl = new egret.Bitmap(RES.getRes("chuanglian_png"));
        _super.prototype.addChild.call(this, cl);
        this.lamp1 = new egret.Bitmap(RES.getRes("灯笼左边_png"));
        this.lamp1.x = 20;
        this.lamp1.y = 70;
        this.lamp1.rotation = 20;
        _super.prototype.addChild.call(this, this.lamp1);
        this.lamp2 = new egret.Bitmap(RES.getRes("灯笼右边_png"));
        this.lamp2.x = 700 - this.lamp2.width;
        ;
        this.lamp2.y = 70;
        this.lamp1.rotation = 20;
        _super.prototype.addChild.call(this, this.lamp2);
        var mainBg = new egret.Bitmap(RES.getRes("pic_bg_png"));
        _super.prototype.addChild.call(this, mainBg);
        this.fire = new egret.Bitmap(RES.getRes("dahuoji_png"));
        this.fire.x = (720 - this.fire.width) / 2;
        this.fire.y = 820;
        this.fire.touchEnabled = true;
        this.fire.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        egret.Tween.get(this.fire, { loop: true })
            .to({ y: this.fire.y - 30 }, 500, egret.Ease.cubicIn)
            .to({ y: this.fire.y }, 500, egret.Ease.cubicOut);
        _super.prototype.addChild.call(this, this.fire);
    };
    p.AddTimer = function () {
        var timer = new egret.Timer(200, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.RepeatTimer, this);
        timer.start();
    };
    p.touchHandler = function (evt) {
        var _this = this;
        egret.Tween.removeTweens(this.fire);
        egret.Tween.get(this.fire)
            .to({ y: 1500 }, 500, egret.Ease.cubicIn).call(function () {
            _this.dispatchEvent(_this.tabFireEvent);
        });
    };
    //重复动画
    p.RepeatTimer = function () {
        _super.prototype.swapChildren.call(this, this.bg1, this.bg2);
        if (this.lamp1.rotation == 20) {
            this.lamp1.rotation = -20;
            this.lamp1.anchorOffsetY = -this.lamp1.height / 3;
            this.lamp2.rotation = -20;
            this.lamp2.anchorOffsetY = -this.lamp1.height / 3;
        }
        else {
            this.lamp1.rotation = 20;
            this.lamp1.anchorOffsetY = 0;
            this.lamp2.rotation = 20;
            this.lamp2.anchorOffsetY = 0;
        }
    };
    return BeginUI;
}(egret.Sprite));
egret.registerClass(BeginUI,'BeginUI');
//# sourceMappingURL=BeginUI.js.map