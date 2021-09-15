import { ECSComponent } from "../ecs/ECSComponent";
import { ecsclass } from "../ecs/__private";

@ecsclass("NodeRenderComponent")
export class NodeRenderComponent extends ECSComponent {
    constructor(readonly node:cc.Node){
        super();
    }
}