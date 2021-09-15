import { ecsclass } from "../ecs/__private";
import { MoveComponent } from "../component/MoveComponent";
import { ECSSystem } from "../ecs/ECSSystem";
import { NodeRenderComponent } from "../component/NodeRenderComponent";

@ecsclass("MoveSystem")
export class MoveSystem extends ECSSystem {
    update(dt: number) {
        const moveComponents = this.ecs.components.all(MoveComponent);
        moveComponents.forEach((value) => {
            value.position.x += value.speed * dt * value.direction.x;
            value.position.y += value.speed * dt * value.direction.y;
            value.speed-=value.damping;
            if(value.speed<0){
                value.speed = 0;
            }
            const entity = this.ecs.entities.get(value.entityId);
            if (entity.hasComponent(NodeRenderComponent)) {
                entity.getComponent(NodeRenderComponent).node.setPosition(value.position);
            }
        })
    }

}