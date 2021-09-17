import { ecsclass } from "../../ecs/__private";
import { MoveComponent } from "../component/MoveComponent";
import { ECSSystem } from "../../ecs/ECSSystem";
import { NodeRenderComponent } from "../component/NodeRenderComponent";
import { PlayerComponent } from "../component/PlayerComponent";

@ecsclass("MoveSystem")
export class MoveSystem extends ECSSystem {
    update(dt: number) {
        const moveComponents = this.ecs.components.all(MoveComponent);
        moveComponents.forEach((value) => {
            if(value.speed<0){
                value.speed = 0;
            }
            value.position.x += value.speed * dt * value.direction.x;
            value.position.y += value.speed * dt * value.direction.y;
            value.speed-=value.damping;
            const entity = this.ecs.entities.get(value.entityId);
            if (entity.hasComponent(NodeRenderComponent)) {
                entity.getComponent(NodeRenderComponent).node.setPosition(value.position);
            }
            if (entity.hasComponent(PlayerComponent)) {
                cc.log(`(${value.position.x},${value.position.y})`)
            }
        })
    }

}