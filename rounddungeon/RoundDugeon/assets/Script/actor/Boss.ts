import Actor from "../base/Actor";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Boss extends Actor {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    takeDamage(damage: default): boolean {
        return false;
    }
    actorName(): string {
        return '';
    }
    // update (dt) {}
}
