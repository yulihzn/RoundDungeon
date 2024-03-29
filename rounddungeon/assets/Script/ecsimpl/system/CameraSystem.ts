import { ecsclass } from "../../ecs/__private";
import { ECSSystem } from "../../ecs/ECSSystem";
import { NodeRenderComponent } from "../component/NodeRenderComponent";
import { PlayerComponent } from "../component/PlayerComponent";

@ecsclass("CameraSystem")
export class CameraSystem extends ECSSystem {

    constructor(readonly camera: cc.Camera, readonly size: cc.Size) {
        super();
    }
    update(dt: number) {
        const playerComponents = this.ecs.components.all(PlayerComponent);
        playerComponents.forEach((value) => {
            const entity = this.ecs.entities.get(value.entityId);
            if (entity.hasComponent(NodeRenderComponent)) {
                this.follow(entity.getComponent(NodeRenderComponent).node, dt);
            }
        })
    }
    private follow(node: cc.Node, dt: number) {
        if (!node) {
            return;
        }
        const w = cc.view.getCanvasSize().width;
        const h = cc.view.getCanvasSize().height;
        let pos = node.position;
        if (this.size.width > w) {
            if (pos.x > 0) {
                if (pos.x + w > this.size.width) {
                    pos.x = this.size.width - w;
                }
            } else {
                if (pos.x - w < -this.size.width) {
                    pos.x = w - this.size.width;
                }
            }
        }
        if (this.size.height > h) {
            if (pos.y > 0) {
                if (pos.y + h > this.size.height) {
                    pos.y = this.size.height - h;
                }
            } else {
                if (pos.y - h < -this.size.height) {
                    pos.y = h - this.size.height;
                }
            }
        }
        let targetPos = node.parent.convertToWorldSpaceAR(pos);
        this.camera.node.position = this.lerp(this.camera.node.position, this.camera.node.parent.convertToNodeSpaceAR(targetPos), dt * 10);
        this.camera.zoomRatio = this.lerpNumber(this.camera.zoomRatio, 1, 0.05);
    }
    lerpNumber(a, b, r) {
        return a + (b - a) * r;
    }

    lerp(self: cc.Vec3, to: cc.Vec3, ratio: number): cc.Vec3 {
        let out = cc.v3(0, 0);
        let x = self.x;
        let y = self.y;
        out.x = x + (to.x - x) * ratio;
        out.y = y + (to.y - y) * ratio;
        return out;
    }


}