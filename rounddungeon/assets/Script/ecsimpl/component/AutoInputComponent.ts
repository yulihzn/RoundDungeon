import { ECSComponent } from "../../ecs/ECSComponent";
import { ecsclass } from "../../ecs/__private";

/**
 * 自动输入组件
 */
@ecsclass("AutoInputComponent")
export class AutoInputComponent extends ECSComponent {
    controllocked = false;
    constructor(hasController:boolean){
        super();
        this.controllocked = hasController;
    }
}