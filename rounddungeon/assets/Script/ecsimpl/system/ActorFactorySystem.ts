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

@ecsclass("ActorFactorySystem")
export class ActorFactorySystem extends ECSSystem {
    readonly random: Random = new Random(0);
    constructor(readonly renderNode: cc.Node, readonly prefab: cc.Prefab) {
        super();
    }
    start() {
        this.createActor(true);
        for (let i = 0; i < 10; i++) {
            this.createActor(false);
        }
    }
    createActor(isPlayer: boolean) {
        const node = cc.instantiate(this.prefab);
        node.setParent(this.renderNode);
        const actor = new ECSEntity();
        actor.addComponent(new NodeRenderComponent(node));
        if (isPlayer) {
            actor.addComponent(new MoveComponent(cc.v3(0, 0), cc.v3(0, 0), 0, 20));
            actor.addComponent(new PlayerComponent());
            actor.addComponent(new ColliderComponent(55));
            let ic = new InputComponent(node);
            actor.addComponent(ic);
            this.ecs.events.push(new InputNodeChangeEvent(ic));
        } else {
            actor.addComponent(new AutoInputComponent(true));
            actor.addComponent(new ColliderComponent(55));
            actor.addComponent(new MoveComponent(cc.v3(this.random.getRandomNum(-1000, 1000), this.random.getRandomNum(-1000, 1000)), cc.v3(0, 0), 0, 1));
        }
        this.ecs.entities.add(actor);
    }

}