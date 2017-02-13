var TabFireEvent = (function (_super) {
    __extends(TabFireEvent, _super);
    function TabFireEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=TabFireEvent,p=c.prototype;
    TabFireEvent.NAME = "TabFireEvent";
    return TabFireEvent;
}(egret.Event));
egret.registerClass(TabFireEvent,'TabFireEvent');
//# sourceMappingURL=TabFireEvent.js.map