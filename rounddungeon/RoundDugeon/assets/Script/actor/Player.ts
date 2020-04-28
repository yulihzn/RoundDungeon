import Dungeon from "../logic/Dungeon";
import Actor from "../base/Actor";
import EventConstant from "../logic/EventConstant";
import Logic from "../logic/Logic";
import DamageData from "../data/DamageData";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends Actor {

    static readonly STATE_IDLE = 0;
    static readonly STATE_WALK = 1;
    static readonly STATE_ATTACK = 2;

    private anim: cc.Animation;
    private isMoving = false;//是否移动中
    private isFaceRight = true;
    defaultPos = cc.v3(0, 0);
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.on(EventConstant.PLAYER_ATTACK
            , (event) => { this.attack() });
        this.setPlayerPosition(cc.v3(Math.floor(Dungeon.WIDTH_SIZE / 2), Math.floor(Dungeon.HEIGHT_SIZE / 2)));
        this.anim = this.getComponent(cc.Animation);
        this.playerAnim(Player.STATE_IDLE);
    }

    start() {

    }
    private attack() {
        this.playerAnim(Player.STATE_ATTACK);
        this.scheduleOnce(() => { this.playerAnim(Player.STATE_IDLE); }, 0.3)
    }
    setPlayerPosition(pos:cc.Vec3){
        this.pos = pos.clone();
        this.node.position = Dungeon.getPosInMap(this.pos);
        this.changeZIndex(pos);
    }
    playerAction(dir: number, pos: cc.Vec3, dt: number, dungeon: Dungeon) {
        this.move(dir, pos, dt);
    }
    private move(dir: number, pos: cc.Vec3, dt: number): void {
        if(this.isMoving||dir>3){
            return;
        }
        let offsetX = 0;
        let offsetY = 0;
        switch (dir) {
            case 0: offsetY = 1; break;
            case 1: offsetY = -1; break;
            case 2: offsetX = -1; this.isFaceRight = false; break;
            case 3: offsetX = 1; this.isFaceRight = true; break;
        }
        let targetPos = cc.v3(this.pos.x + offsetX, this.pos.y + offsetY);
        let target = Dungeon.getPosInMap(targetPos);
        if (targetPos.x < 0 || targetPos.x >= Dungeon.WIDTH_SIZE || targetPos.y < 0 || targetPos.y >= Dungeon.WIDTH_SIZE) {
            return;
        }
        
        this.isMoving = true;
        if (dir == 2) {
            this.isFaceRight = false;
        }
        if (dir == 3) {
            this.isFaceRight = true;
        }
        this.playerAnim(Player.STATE_WALK);
        cc.tween(this.node).to(0.5, { position: target},{easing:'elasticOut'}).call(() => {
            this.isMoving = false;
            this.playerAnim(Player.STATE_IDLE);
            this.setPlayerPosition(targetPos);
        }).start();
    }
    takeDamage(damage: DamageData): boolean {
        return false;
    }
    actorName(): string {
        return '';
    }
    playerAnim(animType: number): void {
        switch (animType) {
            case Player.STATE_IDLE:
                if (!this.anim.getAnimationState('PlayerIdle').isPlaying) {
                    this.anim.play('PlayerIdle');
                }
                break;
            case Player.STATE_WALK:
                if (!this.anim.getAnimationState('PlayerWalk').isPlaying) {
                    this.anim.play('PlayerWalk');
                }
                break;
            case Player.STATE_ATTACK:
                if (!this.anim.getAnimationState('PlayerAttack01').isPlaying) {
                    this.anim.play('PlayerAttack01');
                }
                break;
        }
    }
    changeZIndex(pos: cc.Vec3) {
        this.node.zIndex = 3000 + (Dungeon.HEIGHT_SIZE - pos.y) * 10 + 2;
    }
    update(dt) {
        this.node.scaleX = this.isFaceRight ? 1 : -1;
    }
}
