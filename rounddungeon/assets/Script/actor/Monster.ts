import Actor from "../base/Actor";
import DamageData from "../data/DamageData";
import MonsterData from "../data/MonsterData";
import Dungeon from "../logic/Dungeon";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Monster extends Actor {

    isShow: boolean = false;
    isDied: boolean = false;
    data: MonsterData = new MonsterData();
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    playAction(dir: number, dungeon: Dungeon) {
    }

    takeDamage(damage: DamageData): boolean {
        return false;
    }

    actorName(): string {
        return '';
    }

    // update (dt) {}
}
