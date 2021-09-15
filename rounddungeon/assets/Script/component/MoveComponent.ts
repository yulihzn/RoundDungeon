import { ECSComponent } from "../ecs/ECSComponent";
import { ecsclass } from "../ecs/__private";

@ecsclass("MoveComponent")
export class MoveComponent extends ECSComponent {
    position: cc.Vec3 = cc.Vec3.ZERO;
    direction: cc.Vec3 = cc.Vec3.ZERO;
    speed: number = 0;
    damping = 0;

    constructor(position: cc.Vec3, direction: cc.Vec3, speed: number,damping:number) {
        super();
        this.position = position.clone();
        this.direction = direction;
        this.speed = speed;
        this.damping = damping;
    }
}