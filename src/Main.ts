
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private beginUI: BeginUI;
    private questionUI: QuestionUI;
    private currentQuestionNum: number = 1;
    private question: egret.Bitmap;
    private question2: egret.Bitmap;
    private a: egret.Bitmap;
    private b: egret.Bitmap;
    private c: egret.Bitmap;
    private d: egret.Bitmap;
    private totalNum: number = 0;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
        RES.loadGroup("preload");
        RES.loadGroup("share");
        RES.loadGroup("moreInfo");

    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
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
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        egret.Tween.get(this.loadingView).to({ alpha: 0 }, 2000, egret.Ease.circIn).call(() => {
            this.stage.removeChild(this.loadingView);
            this.addBeginUI();
        })

    }

    private addBeginUI(): void {
        this.beginUI = new BeginUI();
        this.beginUI.addEventListener(TabFireEvent.NAME, this.showQuestionUI, this);
        super.addChild(this.beginUI);
        //super.addChild(new FormUI());//test
    }
    private showQuestionUI(e: QuestionUICloseEvent): void {
        if (this.beginUI) {
            egret.Tween.get(this.beginUI).to({ alpha: 0 }, 500, egret.Ease.circIn).call(() => {
                super.removeChild(this.beginUI);
                this.beginUI = null;
            });
        }
        if (this.questionUI) {
            egret.Tween.get(this.questionUI).to({ alpha: 0 }, 500, egret.Ease.circIn).call(() => {
                super.removeChildAt(0);
                this.totalNum += Number(e.num);
            });
        }
        this.getImg(this.currentQuestionNum++);
        this.questionUI = new QuestionUI(this.question, this.question2, this.a, this.b, this.c, this.d);
        if (this.currentQuestionNum > 4) {
            this.questionUI.addEventListener(QuestionUICloseEvent.NAME, this.showEndUI, this);
        } else {
            this.questionUI.addEventListener(QuestionUICloseEvent.NAME, this.showQuestionUI, this);
        }
        super.addChild(this.questionUI);
        this.questionUI.alpha = 0;
        egret.Tween.get(this.questionUI).wait(500).to({ alpha: 1 }, 500, egret.Ease.circIn).call(() => {
            this.questionUI.enableTab();
        });
    }

    private showEndUI(e: QuestionUICloseEvent) {
        if (this.questionUI) {
            egret.Tween.get(this.questionUI).to({ alpha: 0 }, 500, egret.Ease.circIn).call(() => {
                super.removeChildAt(0);
            });
        }
        this.totalNum += Number(e.num);
        let endUI: EndUI = new EndUI();
        endUI.addEventListener(QuestionUICloseEvent.NAME, this.endUIClose, this);
        super.addChild(endUI);
    }

    private getImg(num: number): void {
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
    }
    private endUIClose(e: QuestionUICloseEvent): void {
        let endUI: EndUI = e.currentTarget;
        egret.Tween.get(endUI).to({ scaleX: 0, scaleY: 0, x: 720 / 2, y: 1155 / 2 }, 500, egret.Ease.circOut).call(() => {
            super.removeChild(endUI);
            this.showShareUI();
        })
    }
    private showShareUI(): void {
        let shareUI: ShareUI = new ShareUI(this.totalNum);
        shareUI.x = 720 / 2;
        shareUI.y = 1155 / 2;
        shareUI.scaleX = 0;
        shareUI.scaleY = 0;
        egret.Tween.get(shareUI).to({ scaleX: 1, scaleY: 1, x: 0, y: 0 }, 500, egret.Ease.circIn);
        shareUI.addEventListener(QuestionUICloseEvent.NAME, () => {
            super.removeChildren();
            this.totalNum = 0;
            this.currentQuestionNum = 1;
            this.questionUI = null;
            this.beginUI = null;
            this.addBeginUI();
        }, this)
        super.addChild(shareUI);
    }
}


