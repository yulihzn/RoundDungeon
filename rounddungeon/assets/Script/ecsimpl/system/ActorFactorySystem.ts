import { ECSEntity } from "../../ecs/ECSEntity";
import { ecsclass } from "../../ecs/__private";
import { MoveComponent } from "../component/MoveComponent";
import { NodeRenderComponent } from "../component/NodeRenderComponent";
import { ECSSystem } from "../../ecs/ECSSystem";
import { PlayerComponent } from "../component/PlayerComponent";
import Random from "../../utlis/Random";
import { InputComponent } from "../component/InputComponent";
import { AutoInputComponent } from "../component/AutoInputComponent";
import InputNodeChangeEvent from "../event/InputNodeChangeEvent";
import { ColliderComponent } from "../component/ColliderComponent";
import Logic from "../../logic/Logic";

@ecsclass("ActorFactorySystem")
export class ActorFactorySystem extends ECSSystem {
    readonly random: Random = new Random(0);
    constructor(readonly renderNode: cc.Node, readonly prefab: cc.Prefab,readonly size:cc.Size) {
        super();
    }
    start() {
        this.createActor(true);
        for (let i = 0; i < 100; i++) {
            this.createActor(false);
        }
    }
    createActor(isPlayer: boolean) {
        const node = cc.instantiate(this.prefab);
        node.setParent(this.renderNode);
        const actor = new ECSEntity();
        actor.addComponent(new NodeRenderComponent(node));
        node.getChildByName('sprite').getComponent(cc.Sprite).spriteFrame = Logic.spriteFrameRes(isPlayer?'circleavatar2':'circleavatar1');
        node.zIndex = isPlayer?1000:10;
        if (isPlayer) {
            actor.addComponent(new MoveComponent(cc.v3(0, 0), cc.v3(0, 0), 0, 5));
            actor.addComponent(new PlayerComponent());
            actor.addComponent(new ColliderComponent(node.width/2));
            let ic = new InputComponent(node);
            actor.addComponent(ic);
            this.ecs.events.push(new InputNodeChangeEvent(ic));
        } else {
            actor.addComponent(new AutoInputComponent(true));
            actor.addComponent(new ColliderComponent(node.width/2));
            actor.addComponent(new MoveComponent(cc.v3(this.random.getRandomNum(-this.size.width/2, this.size.width/2), this.random.getRandomNum(-this.size.height/2, this.size.height/2)), cc.v3(0, 0), 0, 5));
        }
        this.ecs.entities.add(actor);
    }

}