import LoadingManager from "../manager/LoadingManager";
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
    private isRemoteLoaded = false;
    private loadingManager: LoadingManager = new LoadingManager();
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.label.string = 'loading...';
        this.loadingManager.init();
    }

    start() {
        this.loadingManager.loadAutoSpriteFrames();
        this.loadingManager.loadSpriteAtlas(LoadingManager.KEY_TEXTURES, 'circleavatar0');
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
        if (this.timeDelay > 0.16 && this.loadingManager.isAllSpriteFramesLoaded()) {
            this.timeDelay = 0;
            this.loadingManager.reset();
            cc.director.loadScene('game');
        }

    }
}
