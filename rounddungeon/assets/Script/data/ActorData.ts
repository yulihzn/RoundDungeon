import BaseData from "../base/BaseData";

export default class ActorData extends BaseData {
    nameCn: string = '';//名字
    nameEn: string = '';//名字英文
    resName: string = '';//资源名字
    pos: cc.Vec3;//默认下标
    width: number = 1;//宽
    height: number = 1;//高
    zIndex: number;//默认层级
    health: number = 0;//默认生命
    action: number = 0;//默认行动点数
    currentPos: cc.Vec3;//当前下标
    currentHealth: number = 0;//当前生命
    currentAction: number = 0;//当前行动点数

    constructor() {
        super();
    }

    valueCopy(data: ActorData) {
        this.nameCn = data.nameCn ? data.nameCn : '';
        this.nameEn = data.nameEn ? data.nameEn : '';
        this.resName = data.resName ? data.resName : '';
        this.pos = data.pos ? cc.v3(data.pos.x, data.pos.y) : cc.Vec3.ZERO;
        this.width = data.width ? data.width : 1;
        this.height = data.height ? data.height : 1;
        this.zIndex = data.zIndex ? data.zIndex : 0;
        this.health = data.health ? data.health : 0;
        this.action = data.action ? data.action : 1;
        this.currentPos = data.currentPos ? cc.v3(data.currentPos.x, data.currentPos.y) : cc.Vec3.ZERO;
        this.currentHealth = data.currentHealth ? data.currentHealth : 0;
        this.currentAction = data.currentAction ? data.currentAction : 0;
    }

    clone(): ActorData {
        let data = new ActorData();
        data.nameCn = this.nameCn;
        data.nameEn = this.nameEn;
        data.resName = this.resName;
        data.pos = this.pos;
        data.width = this.width;
        data.height = this.height;
        data.zIndex = this.zIndex;
        data.health = this.health;
        data.action = this.action;
        data.currentPos = this.currentPos;
        data.currentHealth = this.currentHealth;
        data.currentAction = this.currentAction;
        return data;
    }
}