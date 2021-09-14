// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Logic extends cc.Component {

    //图片资源
    static spriteFrames: { [key: string]: cc.SpriteFrame } = null;
    static speed = 1;
    //npc json
    static nonplayers: { [key: string]: string } = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.game.setFrameRate(60);
        cc.game.addPersistRootNode(this.node);
        cc.director.getCollisionManager().enabled = true;
    }

    static spriteFrameRes(spriteFrameName: string) {
        return Logic.spriteFrames[spriteFrameName] ? Logic.spriteFrames[spriteFrameName] : null;
    }
}
