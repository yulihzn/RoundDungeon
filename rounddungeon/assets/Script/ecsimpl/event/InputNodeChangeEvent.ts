import { ECSEvent } from "../../ecs/ECSEvent";
import { ecsclass } from "../../ecs/__private";
import { InputComponent } from "../component/InputComponent";

@ecsclass("InputNodeChangeEvent")
export default class InputNodeChangeEvent extends ECSEvent {
    constructor(readonly inputComponent:InputComponent){
        super();
    }
}