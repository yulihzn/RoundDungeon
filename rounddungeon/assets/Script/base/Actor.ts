import DamageData from "../data/DamageData";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class Actor extends cc.Component {
    abstract takeDamage(damage: DamageData): boolean;

    abstract actorName(): string;

    pos: cc.Vec3 = cc.Vec3.ZERO;
}
