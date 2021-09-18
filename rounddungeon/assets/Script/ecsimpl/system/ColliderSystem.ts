import { ecsclass } from "../../ecs/__private";
import { ECSSystem } from "../../ecs/ECSSystem";
import { ColliderComponent } from "../component/ColliderComponent";
import { MoveComponent } from "../component/MoveComponent";

@ecsclass("ColliderSystem")
export class ColliderSystem extends ECSSystem {
    constructor(readonly size: cc.Size) {
        super();
    }
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
                    move1.direction = move1.position.sub(move2.position).normalize();
                    move2.direction = move2.position.sub(move1.position).normalize();
                    //持续碰撞的时候给双方一个很小的速度来拉开距离
                    if (value1.inColliders[value2.entityId]) {
                        move1.speed += move1.damping;
                        move2.speed += move1.damping;
                    } else {
                        //第一次碰撞的时候记录双方的id
                        //耗损双方速度再平均速度
                        let totalspeed = move1.speed + move2.speed;
                        move1.speed = totalspeed *0.2;
                        move2.speed = totalspeed *0.6;
                        value1.inColliders[value2.entityId] = true;
                        value2.inColliders[value1.entityId] = true;
                    }
                } else {
                    //两个物体不碰撞的时候情况他们的碰撞标记
                    value1.inColliders[value2.entityId] = false;
                    value2.inColliders[value1.entityId] = false;
                }

            }
            let dir = this.boundaryHit(move1.position, value1.radius, this.size);
            if (dir > -1) {
                switch (dir) {
                    case 0: move1.direction = move1.direction.sub(cc.v3(0, -1).mul(2 * move1.direction.dot(cc.v3(0, -1)))); break;
                    case 1: move1.direction = move1.direction.sub(cc.v3(0, 1).mul(2 * move1.direction.dot(cc.v3(0, 1)))); break;
                    case 2: move1.direction = move1.direction.sub(cc.v3(1, 0).mul(2 * move1.direction.dot(cc.v3(1, 0)))); break;
                    case 3: move1.direction = move1.direction.sub(cc.v3(-1, 0).mul(2 * move1.direction.dot(cc.v3(-1, 0)))); break;
                }
                // move1.speed += 10;
            }
        }

    }

    private boundaryHit(v1: cc.Vec3, r: number, size: cc.Size) {

        if (v1.y + r >= size.height / 2) {
            return 0;
        }
        if (v1.y - r <= -size.height / 2) {
            return 1;
        }
        if (v1.x - r <= -size.width / 2) {
            return 2;
        }
        if (v1.x + r >= size.width / 2) {
            return 3;
        }
        return -1;

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