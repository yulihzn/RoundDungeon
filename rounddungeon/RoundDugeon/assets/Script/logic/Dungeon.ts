import Tile from "../actor/Tile";
import EventConstant from "./EventConstant";
import Player from "../actor/Player";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Dungeon extends cc.Component {
    static WIDTH_SIZE: number = 11;
    static HEIGHT_SIZE: number = 11;
    static readonly MAPX: number = 32;
    static readonly MAPY: number = 32;
    static readonly TILE_SIZE: number = 64;
    @property(cc.Prefab)
    tilePrefab: cc.Prefab = null;
    @property(cc.Prefab)
    playerPrefab: cc.Prefab = null;
    player:Player = null;
    map: Tile[][] = new Array();
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.on(EventConstant.PLAYER_MOVE, (event) => { this.playerAction(event.detail.dir, event.detail.pos, event.detail.dt) });
        //初始化玩家
        this.player = cc.instantiate(this.playerPrefab).getComponent(Player);
        this.player.node.parent = this.node;
        this.buildMap();
    }

    buildMap() {
        this.map = new Array();
        for (let i = 0; i < Dungeon.WIDTH_SIZE; i++) {
            this.map[i] = new Array(i);
            for (let j = 0; j < Dungeon.HEIGHT_SIZE; j++) {
                let t = cc.instantiate(this.tilePrefab);
                t.parent = this.node;
                t.position = Dungeon.getPosInMap(cc.v3(i, j));
                //越往下层级越高，j是行，i是列
                t.zIndex = 1000 + (Dungeon.HEIGHT_SIZE - j) * 10;
                this.map[i][j] = t.getComponent(Tile);
            }
        }
    }
    start() {

    }
    //获取地图里下标的坐标
    static getPosInMap(pos: cc.Vec3) {
        let x = Dungeon.MAPX - Dungeon.WIDTH_SIZE / 2 * Dungeon.TILE_SIZE + pos.x * Dungeon.TILE_SIZE;
        let y = Dungeon.MAPY - Dungeon.HEIGHT_SIZE / 2 * Dungeon.TILE_SIZE + pos.y * Dungeon.TILE_SIZE;
        return cc.v3(x, y);
    }
    /** 玩家在地牢移动 */
    private playerAction(dir: number, pos: cc.Vec3, dt: number) {
        if (this.player) {
            this.player.playerAction(dir, pos, dt, this)
        }
    }
    // update (dt) {}
}
