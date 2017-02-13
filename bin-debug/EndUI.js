var EndUI = (function (_super) {
    __extends(EndUI, _super);
    function EndUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=EndUI,p=c.prototype;
    p.createView = function () {
        // let txt:egret.TextField=new egret.TextField();
        // txt.text="得分"+this.totalNum;
        // super.addChild(txt);
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffc183);
        bg.graphics.drawRect(0, 0, 750, 1155);
        bg.graphics.endFill;
        _super.prototype.addChild.call(this, bg);
        var top = new egret.Bitmap(RES.getRes("top_png"));
        _super.prototype.addChild.call(this, top);
        this.addImg();
        this.addTxt();
    };
    p.addImg = function () {
        var wait1 = new egret.Bitmap(RES.getRes("waiting1_png"));
        wait1.x = (720 - wait1.width) / 2;
        wait1.y = 280;
        _super.prototype.addChild.call(this, wait1);
        var wait2 = new egret.Bitmap(RES.getRes("waiting2_png"));
        wait2.x = (720 - wait1.width) / 2;
        wait2.y = 280;
        wait2.visible = false;
        _super.prototype.addChild.call(this, wait2);
        var timer = new egret.Timer(100, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            wait1.visible = !wait1.visible;
            wait2.visible = !wait2.visible;
        }, this);
        timer.start();
    };
    p.addTxt = function () {
        var _this = this;
        var picList = new Array();
        var addPic = function (n) {
            var pic = new egret.Bitmap(RES.getRes("text" + n + "_png"));
            pic.x = (720 - pic.width) / 2;
            pic.y = 500 + n * 50;
            pic.visible = false;
            _this.addChild(pic);
            picList.push(pic);
        };
        for (var index = 0; index < 10; index++) {
            addPic(index + 1);
        }
        var timer = new egret.Timer(800, 10);
        var currentPicIndex = 0;
        timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            picList[currentPicIndex++].visible = true;
            if (currentPicIndex == 10) {
                egret.Tween.get(picList[9]).wait(500).call(function () {
                    var closeEvent = new QuestionUICloseEvent(QuestionUICloseEvent.NAME);
                    _this.dispatchEvent(closeEvent);
                });
            }
        }, this);
        timer.start();
    };
    return EndUI;
}(egret.Sprite));
egret.registerClass(EndUI,'EndUI');
//# sourceMappingURL=EndUI.js.map