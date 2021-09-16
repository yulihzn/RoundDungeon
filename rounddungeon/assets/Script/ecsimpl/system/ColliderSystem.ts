import { ecsclass } from "../../ecs/__private";
import { ECSSystem } from "../../ecs/ECSSystem";
import { ColliderComponent } from "../component/ColliderComponent";
import { MoveComponent } from "../component/MoveComponent";

@ecsclass("ColliderSystem")
export class ColliderSystem extends ECSSystem {
    update(dt: number) {
        const colliderComponents = this.ecs.components.all(ColliderComponent);
        for (let value1 of colliderComponents) {
            const move1 = this.ecs.entities.get(value1.entityId).getComponent(MoveComponent);
            for (let value2 of colliderComponents) {
                const move2 = this.ecs.entities.get(value2.entityId).getComponent(MoveComponent);
                if (value1.entityId == value2.entityId
                    || value1.sensor || value2.sensor) {
                    continue;
                }
                if (this.circleHit(move1.position, move2.position, value1.radius + value2.radius)) {
                    if (value1.inColliderId != value2.entityId
                        && value2.inColliderId != value1.entityId) {
                        move1.direction = move1.position.subtract(move2.position).normalize();
                        move2.direction = move2.position.subtract(move1.position).normalize();
                        move1.speed -= 100;
                        move2.speed -= 100;
                        value1.inColliderId = value2.entityId;
                        value2.inColliderId = value1.entityId;
                    }

                } else if (value1.inColliderId == value2.entityId) {
                    value1.inColliderId = '';
                } else if (value2.inColliderId == value1.entityId) {
                    value2.inColliderId = '';
                }
            }
        }

    }

    private circleHit(v1: cc.Vec3, v2: cc.Vec3, r: number) {
        if (r <= 0) {
            return false;
        }
        let x = v1.x - v2.x;
        let y = v1.y - v2.y;
        return x * x + y * y <= r * r;
    }

}