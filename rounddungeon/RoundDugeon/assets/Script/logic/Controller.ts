import EventConstant from "./EventConstant";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Controller extends cc.Component {

    @property(cc.Node)
    attackAction: cc.Node = null;
    attackActionTouched = false;
    @property(cc.Node)
    upAction: cc.Node = null;
    upActionTouched = false;
    @property(cc.Node)
    downAction: cc.Node = null;
    downActionTouched = false;
    @property(cc.Node)
    leftAction: cc.Node = null;
    leftActionTouched = false;
    @property(cc.Node)
    rightAction: cc.Node = null;
    rightActionTouched = false;
    graphics: cc.Graphics = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.graphics = this.getComponent(cc.Graphics);
        this.attackAction.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            this.attackActionTouched = true;
        }, this)

        this.attackAction.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            this.attackActionTouched = false;
        }, this)

        this.attackAction.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event.EventTouch) => {
            this.attackActionTouched = false;
        }, this)
        this.upAction.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            this.upActionTouched = true;
        }, this)

        this.upAction.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            this.upActionTouched = false;
        }, this)

        this.upAction.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event.EventTouch) => {
            this.upActionTouched = false;
        }, this)
        this.downAction.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            this.downActionTouched = true;
        }, this)

        this.downAction.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            this.downActionTouched = false;
        }, this)

        this.downAction.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event.EventTouch) => {
            this.downActionTouched = false;
        }, this)
        this.leftAction.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            this.leftActionTouched = true;
        }, this)

        this.leftAction.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            this.leftActionTouched = false;
        }, this)

        this.leftAction.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event.EventTouch) => {
            this.leftActionTouched = false;
        }, this)
        this.rightAction.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            this.rightActionTouched = true;
        }, this)

        this.rightAction.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            this.rightActionTouched = false;
        }, this)

        this.rightAction.on(cc.Node.EventType.TOUCH_CANCEL, (event: cc.Event.EventTouch) => {
            this.rightActionTouched = false;
        }, this)
    }

    timeDelay = 0;

    isTimeDelay(dt: number): boolean {
        this.timeDelay += dt;
        if (this.timeDelay > 0.016) {
            this.timeDelay = 0;
            return true;
        }
        return false;
    }

    update(dt) {
        if (this.isTimeDelay(dt)) {
            if (this.attackActionTouched) {
                cc.director.emit(EventConstant.PLAYER_ATTACK);
            }
            if (this.upActionTouched) {
                cc.director.emit(EventConstant.PLAYER_MOVE, {detail: {dir: 0, pos: cc.Vec3.ZERO, dt: dt}})
            }
            if (this.downActionTouched) {
                cc.director.emit(EventConstant.PLAYER_MOVE, {detail: {dir: 1, pos: cc.Vec3.ZERO, dt: dt}})
            }
            if (this.leftActionTouched) {
                cc.director.emit(EventConstant.PLAYER_MOVE, {detail: {dir: 2, pos: cc.Vec3.ZERO, dt: dt}})
            }
            if (this.rightActionTouched) {
                cc.director.emit(EventConstant.PLAYER_MOVE, {detail: {dir: 3, pos: cc.Vec3.ZERO, dt: dt}})
            }
        }
    }

}
