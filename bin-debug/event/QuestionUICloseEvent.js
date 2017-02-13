var QuestionUICloseEvent = (function (_super) {
    __extends(QuestionUICloseEvent, _super);
    function QuestionUICloseEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=QuestionUICloseEvent,p=c.prototype;
    QuestionUICloseEvent.NAME = "QuestionUICloseEvent";
    return QuestionUICloseEvent;
}(egret.Event));
egret.registerClass(QuestionUICloseEvent,'QuestionUICloseEvent');
//# sourceMappingURL=QuestionUICloseEvent.js.map