import { InputComponent } from "../component/InputComponent";
import { MoveComponent } from "../component/MoveComponent";
import { NodeRenderComponent } from "../component/NodeRenderComponent";
import { ECSSystem } from "../ecs/ECSSystem";
import { ecsclass } from "../ecs/__private";
import GameWorld from "../logic/GameWorld";
import Random from "../utlis/Random";

@ecsclass('InputSystem')
export default class InputSystem extends ECSSystem {
    readonly random = new Random(0);
    private startPos: cc.Vec3;
    private dragTarget: MoveComponent;
    constructor(readonly inputNode: cc.Node, readonly gameWord: GameWorld) {
        super();
    }
    start(): void {
        this.inputNode.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.inputNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
        this.inputNode.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
        this.inputNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouch, this);
    }
    stop(): void {
        this.inputNode.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.inputNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
        this.inputNode.off(cc.Node.EventType.TOUCH_END, this.onTouch, this);
        this.inputNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouch, this);
    }
    private onTouch(event: cc.Event.EventTouch): void {
        const inputComponents = this.ecs.components.all(InputComponent);
        let component: InputComponent;
        for (let c of inputComponents) {
            if (c.hasController) {
                component = c;
                break;
            }
        }
        if (!component) {
            return;
        }
        const entity = this.ecs.entities.get(component.entityId);
        const moveComponent = entity.getComponent(MoveComponent);
        const node = entity.getComponent(NodeRenderComponent).node;
        const spriteNode = node.getChildByName('sprite');
        let worldPos = this.gameWord.camera.getScreenToWorldPoint(event.getLocation());
        switch (event.type) {
            case cc.Node.EventType.TOUCH_START:
                this.startPos = this.gameWord.node.convertToNodeSpaceAR(worldPos);
                spriteNode.convertToNodeSpaceAR(worldPos)
                break;
            case cc.Node.EventType.TOUCH_MOVE:
                
                 break;
            case cc.Node.EventType.TOUCH_END:
                const endPos = this.gameWord.node.convertToNodeSpaceAR(worldPos);
                moveComponent.speed = 200;
                moveComponent.direction = this.startPos.subtract(endPos).normalizeSelf();
                break;
            case cc.Node.EventType.TOUCH_CANCEL: break;
        }
    }
}