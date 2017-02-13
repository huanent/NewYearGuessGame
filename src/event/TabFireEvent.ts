class TabFireEvent extends egret.Event
{
    public static NAME:string = "TabFireEvent";
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}