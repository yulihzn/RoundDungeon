import { InputComponent } from "../component/InputComponent";
import { MoveComponent } from "../component/MoveComponent";
import { ECSSystem } from "../../ecs/ECSSystem";
import { ecsclass } from "../../ecs/__private";
import GameWorld from "../../logic/GameWorld";
import Random from "../../utlis/Random";
import InputNodeChangeEvent from "../event/InputNodeChangeEvent";
import Utils from "../../utlis/Utils";

@ecsclass('InputSystem')
export default class InputSystem extends ECSSystem {
    readonly random = new Random(0);
    private dragPos: cc.Vec3;
    private inputComponent: InputComponent;
    constructor(readonly gameWord: GameWorld) {
        super();
    }
    start(): void {

    }
    stop(): void {

    }
    private setOnListener(node: cc.Node) {
        if (!node) {
            return;
        }
        node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
        node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
        node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouch, this);
    }
    private setOffListener(node: cc.Node) {
        if (!node) {
            return;
        }
        node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
        node.off(cc.Node.EventType.TOUCH_END, this.onTouch, this);
        node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouch, this);
    }
    update(dt: number): void {
        const events = this.ecs.events.fetch(InputNodeChangeEvent);
        events.forEach((value) => {
            if (this.inputComponent) {
                this.setOffListener(this.inputComponent.inputNode);
            }
            this.inputComponent = value.inputComponent;
            this.setOnListener(value.inputComponent.inputNode);
        })
    }
    private onTouch(event: cc.Event.EventTouch): void {
        if (!this.inputComponent) {
            return;
        }
        const entity = this.ecs.entities.get(this.inputComponent.entityId);
        if (!entity.hasComponent(MoveComponent)) {
            return;
        }
        let moveComponent = entity.getComponent(MoveComponent);
        if (!moveComponent) {
            return;
        }
        const spriteNode = this.inputComponent.inputNode.getChildByName('sprite');
        const bg = this.inputComponent.inputNode.getChildByName('bg');
        const line1 = this.inputComponent.inputNode.getChildByName('bg').getChildByName('line1');
        const line2 = this.inputComponent.inputNode.getChildByName('bg').getChildByName('line2');
        const worldPos = this.gameWord.camera.getScreenToWorldPoint(event.getLocation());
        const pos = this.inputComponent.inputNode.convertToNodeSpaceAR(worldPos);
        switch (event.type) {
            case cc.Node.EventType.TOUCH_START:
                spriteNode.stopAllActions();
                spriteNode.setPosition(cc.Vec3.ZERO);
                if (moveComponent) {
                    moveComponent.direction = cc.Vec3.ZERO;
                    moveComponent.speed = 0;
                }
                break;
            case cc.Node.EventType.TOUCH_MOVE:
                const d = cc.Vec2.distance(pos, cc.Vec3.ZERO);
                this.dragPos = pos.mul(d > 200 ? 200 / d : 1);
                spriteNode.setPosition(this.dragPos);
                const angle = Utils.getRotateAngle(cc.v2(this.dragPos));
                bg.angle = angle;
                line1.width = d > 200 ? 200 : d;
                line2.width = d > 200 ? 200 : d;
                break;
            case cc.Node.EventType.TOUCH_END:
            case cc.Node.EventType.TOUCH_CANCEL:
                const distance = cc.Vec2.distance(this.dragPos, cc.Vec3.ZERO);
                const druation = 0.2;
                cc.tween(line1).to(druation, { width: 0 }).start();
                cc.tween(line2).to(druation, { width: 0 }).start();
                cc.tween(spriteNode).to(druation, { position: cc.Vec3.ZERO }).call(() => {
                    if (moveComponent) {
                        moveComponent.speed = distance / druation;
                        moveComponent.direction = cc.Vec3.ZERO.subtract(this.dragPos).normalizeSelf();
                    }
                }).start();
                break;
        }
    }
}