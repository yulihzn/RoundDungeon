import { ECSComponent } from "../../ecs/ECSComponent";
import { ecsclass } from "../../ecs/__private";

@ecsclass("ColliderComponent")
export class ColliderComponent extends ECSComponent {
    sensor: boolean = false;
    radius = 0;
    static: boolean = false;
    inColliderId: string = '';
    constructor(radius: number) {
        super();
        this.radius = radius;
    }
}