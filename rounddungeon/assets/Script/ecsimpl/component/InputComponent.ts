import { ECSComponent } from "../../ecs/ECSComponent";
import { ecsclass } from "../../ecs/__private";

/**
 * 自动输入组件
 */
@ecsclass("InputComponent")
export class InputComponent extends ECSComponent {
    constructor(readonly inputNode:cc.Node){
        super();
    }
}