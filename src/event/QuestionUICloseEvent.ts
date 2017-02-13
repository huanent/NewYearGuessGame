class QuestionUICloseEvent extends egret.Event {
    public static NAME: string = "QuestionUICloseEvent";
    public num: number;

    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}