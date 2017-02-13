var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        var _this = this;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffc183);
        bg.graphics.drawRect(0, 0, 750, 1155);
        bg.graphics.endFill;
        _super.prototype.addChild.call(this, bg);
        var picList = new Array();
        var addPic = function (n) {
            var pic = new egret.Bitmap(RES.getRes("jisuanzhong" + n + "_png"));
            pic.x = (720 - pic.width) / 2;
            pic.y = 350;
            pic.visible = false;
            _this.addChild(pic);
            picList.push(pic);
        };
        for (var index = 0; index < 7; index++) {
            addPic(index + 1);
        }
        var timer = new egret.Timer(100, 0);
        var currentPicIndex = 0;
        timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            if (currentPicIndex == 0) {
                picList[0].visible = true;
                picList[6].visible = false;
            }
            else {
                picList[currentPicIndex].visible = true;
                picList[currentPicIndex - 1].visible = false;
            }
            currentPicIndex++;
            if (currentPicIndex == 7) {
                currentPicIndex = 0;
            }
            //currentPicIndex = currentPicIndex % picList.length;
        }, this);
        timer.start();
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 1155 / 2;
        this.textField.size = 30;
        this.textField.width = 720;
        this.textField.textColor = 0x861515;
        this.textField.verticalAlign = "center";
        this.textField.textAlign = "center";
    };
    p.setProgress = function (current, total) {
        this.textField.text = "\u6B63\u5728\u52A0\u8F7D..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
egret.registerClass(LoadingUI,'LoadingUI');
//# sourceMappingURL=LoadingUI.js.map