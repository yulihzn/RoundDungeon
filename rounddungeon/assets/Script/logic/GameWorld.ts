// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { ECSImpl } from "../ecs/impl/ECSImpl";
import { ActorFactorySystem } from "../ecsimpl/system/ActorFactorySystem";
import { CameraSystem } from "../ecsimpl/system/CameraSystem";
import { ColliderSystem } from "../ecsimpl/system/ColliderSystem";
import InputSystem from "../ecsimpl/system/InputSystem";
import { MoveSystem } from "../ecsimpl/system/MoveSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameWorld extends cc.Component {

    @property(cc.Prefab)
    actor: cc.Prefab = null
    @property(cc.Camera)
    camera: cc.Camera = null;

    private ecs = new ECSImpl();
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.ecs.systems.add(new InputSystem(this))
            .add(new CameraSystem(this.camera,cc.size(2000,2000)))
            .add(new ActorFactorySystem(this.node, this.actor,cc.size(1800,1800)))
            .add(new MoveSystem())
            .add(new ColliderSystem(cc.size(2000,2000)));
    }

    start() {
        this.ecs.start();
    }

    onDestroy() {
        this.ecs.stop();
    }

    update(dt: number) {
        this.ecs.update(dt);
    }
}
