import Logic from "./Logic";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    private timeDelay = 0;
    private isSpriteFramesLoaded = false;
    private isRemoteLoaded = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.label.string = 'loading...';
    }

    start() {
        this.loadSpriteFrames();
        this.loadRemote();
    }

    loadSpriteFrames() {
        if (Logic.spriteFrames) {
            this.isSpriteFramesLoaded = true;
            return;
        }
        cc.loader.loadResDir('Texture', cc.SpriteFrame, (err: Error, assert: cc.SpriteFrame[]) => {
            Logic.spriteFrames = {};
            for (let frame of assert) {
                Logic.spriteFrames[frame.name] = frame;
            }
            this.isSpriteFramesLoaded = true;
            cc.log('texture loaded');
        })
    }

    loadRemote() {
        this.isRemoteLoaded = true;
        // let xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        //         var response = xhr.responseText;
        //         console.log(response);
        //         this.isRemoteLoaded = true;
        //     }
        // };
        // xhr.open("GET", "http://localhost:8080/mapList", true);
        // xhr.send();
    }

    update(dt) {
        this.timeDelay += dt;
        if (this.timeDelay > 0.16 && this.isSpriteFramesLoaded && this.isRemoteLoaded) {
            this.timeDelay = 0;
            this.isSpriteFramesLoaded = false;
            cc.director.preloadScene('game', () => {
            }, () => {
                cc.director.loadScene('game');
            })
        }

    }
}
