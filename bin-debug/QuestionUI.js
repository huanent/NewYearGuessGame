var QuestionUI = (function (_super) {
    __extends(QuestionUI, _super);
    function QuestionUI(question, question2, a, b, c, d) {
        _super.call(this);
        this.question = question;
        this.question2 = question2;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.createView();
    }
    var d = __define,c=QuestionUI,p=c.prototype;
    p.createView = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffc183);
        bg.graphics.drawRect(0, 0, 720, 1155);
        bg.graphics.endFill();
        _super.prototype.addChild.call(this, bg);
        var top = new egret.Bitmap(RES.getRes("top_png"));
        _super.prototype.addChild.call(this, top);
        this.question.y = 185;
        this.question.x = 50;
        _super.prototype.addChild.call(this, this.question);
        this.question2.y = 185;
        this.question2.x = 50;
        this.question2.visible = false;
        _super.prototype.addChild.call(this, this.question2);
        this.a.x = 100;
        this.a.y = 656;
        _super.prototype.addChild.call(this, this.a);
        this.b.x = 100;
        this.b.y = 763;
        _super.prototype.addChild.call(this, this.b);
        this.c.x = 100;
        this.c.y = 872;
        _super.prototype.addChild.call(this, this.c);
        this.d.x = 100;
        this.d.y = 980;
        _super.prototype.addChild.call(this, this.d);
        this.addTimer();
        this.addEvent();
    };
    p.addEvent = function () {
        this.a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap, this);
        this.b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap, this);
        this.c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap, this);
        this.d.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemTap, this);
    };
    p.itemTap = function (e) {
        var _this = this;
        var closeEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
        var item = e.currentTarget;
        item.touchEnabled = false;
        var temp = item.name;
        closeEvent.num = temp;
        egret.Tween.get(this.a).to({ x: this.a.x - 720 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.c).to({ x: this.a.x - 720 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.b).to({ x: this.a.x + 720 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.question).to({ y: this.question.y - 1155 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.question2).to({ y: this.question2.y - 1155 }, 500, egret.Ease.cubicIn);
        egret.Tween.get(this.d).to({ x: this.a.x + 720 }, 500, egret.Ease.cubicIn).call(function () {
            _this.dispatchEvent(closeEvent);
        });
    };
    p.addTimer = function () {
        var _this = this;
        var questionTimer = new egret.Timer(150);
        questionTimer.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.question.visible = !_this.question.visible;
            _this.question2.visible = !_this.question2.visible;
        }, this);
        questionTimer.start();
    };
    p.enableTab = function () {
        this.a.touchEnabled = true;
        this.b.touchEnabled = true;
        this.c.touchEnabled = true;
        this.d.touchEnabled = true;
    };
    return QuestionUI;
}(egret.Sprite));
egret.registerClass(QuestionUI,'QuestionUI');
//# sourceMappingURL=QuestionUI.js.map