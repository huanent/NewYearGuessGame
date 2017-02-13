var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.currentQuestionNum = 1;
        this.totalNum = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
        RES.loadGroup("preload");
        RES.loadGroup("share");
        RES.loadGroup("moreInfo");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "loading") {
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
        }
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var _this = this;
        this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        egret.Tween.get(this.loadingView).to({ alpha: 0 }, 2000, egret.Ease.circIn).call(function () {
            _this.stage.removeChild(_this.loadingView);
            _this.addBeginUI();
        });
    };
    p.addBeginUI = function () {
        this.beginUI = new BeginUI();
        this.beginUI.addEventListener(TabFireEvent.NAME, this.showQuestionUI, this);
        _super.prototype.addChild.call(this, this.beginUI);
        //super.addChild(new FormUI());//test
    };
    p.showQuestionUI = function (e) {
        var _this = this;
        if (this.beginUI) {
            egret.Tween.get(this.beginUI).to({ alpha: 0 }, 500, egret.Ease.circIn).call(function () {
                _super.prototype.removeChild.call(_this, _this.beginUI);
                _this.beginUI = null;
            });
        }
        if (this.questionUI) {
            egret.Tween.get(this.questionUI).to({ alpha: 0 }, 500, egret.Ease.circIn).call(function () {
                _super.prototype.removeChildAt.call(_this, 0);
                _this.totalNum += Number(e.num);
            });
        }
        this.getImg(this.currentQuestionNum++);
        this.questionUI = new QuestionUI(this.question, this.question2, this.a, this.b, this.c, this.d);
        if (this.currentQuestionNum > 4) {
            this.questionUI.addEventListener(QuestionUICloseEvent.NAME, this.showEndUI, this);
        }
        else {
            this.questionUI.addEventListener(QuestionUICloseEvent.NAME, this.showQuestionUI, this);
        }
        _super.prototype.addChild.call(this, this.questionUI);
        this.questionUI.alpha = 0;
        egret.Tween.get(this.questionUI).wait(500).to({ alpha: 1 }, 500, egret.Ease.circIn).call(function () {
            _this.questionUI.enableTab();
        });
    };
    p.showEndUI = function (e) {
        var _this = this;
        if (this.questionUI) {
            egret.Tween.get(this.questionUI).to({ alpha: 0 }, 500, egret.Ease.circIn).call(function () {
                _super.prototype.removeChildAt.call(_this, 0);
            });
        }
        this.totalNum += Number(e.num);
        var endUI = new EndUI();
        endUI.addEventListener(QuestionUICloseEvent.NAME, this.endUIClose, this);
        _super.prototype.addChild.call(this, endUI);
    };
    p.getImg = function (num) {
        this.question = new egret.Bitmap(RES.getRes("Q" + num + "_pic1_png"));
        this.question2 = new egret.Bitmap(RES.getRes("Q" + num + "_pic2_png"));
        this.a = new egret.Bitmap(RES.getRes("Q" + num + "_Option1_png"));
        this.a.name = "1";
        this.b = new egret.Bitmap(RES.getRes("Q" + num + "_Option2_png"));
        this.b.name = "2";
        this.c = new egret.Bitmap(RES.getRes("Q" + num + "_Option3_png"));
        this.c.name = '3';
        this.d = new egret.Bitmap(RES.getRes("Q" + num + "_Option4_png"));
        this.d.name = '4';
    };
    p.endUIClose = function (e) {
        var _this = this;
        var endUI = e.currentTarget;
        egret.Tween.get(endUI).to({ scaleX: 0, scaleY: 0, x: 720 / 2, y: 1155 / 2 }, 500, egret.Ease.circOut).call(function () {
            _super.prototype.removeChild.call(_this, endUI);
            _this.showShareUI();
        });
    };
    p.showShareUI = function () {
        var _this = this;
        var shareUI = new ShareUI(this.totalNum);
        shareUI.x = 720 / 2;
        shareUI.y = 1155 / 2;
        shareUI.scaleX = 0;
        shareUI.scaleY = 0;
        egret.Tween.get(shareUI).to({ scaleX: 1, scaleY: 1, x: 0, y: 0 }, 500, egret.Ease.circIn);
        shareUI.addEventListener(QuestionUICloseEvent.NAME, function () {
            _super.prototype.removeChildren.call(_this);
            _this.totalNum = 0;
            _this.currentQuestionNum = 1;
            _this.questionUI = null;
            _this.beginUI = null;
            _this.addBeginUI();
        }, this);
        _super.prototype.addChild.call(this, shareUI);
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map