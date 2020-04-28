// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EventConstant extends cc.Component {
    public static readonly PLAYER_MOVE = 'PLAYER_MOVE';
    public static readonly PLAYER_ATTACK = 'PLAYER_ATTACK';
    public static readonly CAMERA_SHAKE = 'CAMERA_SHAKE';
    public static readonly CAMERA_LOOK = 'CAMERA_LOOK';
}
