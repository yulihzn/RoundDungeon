
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Logic from "../logic/Logic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingManager {


    public static readonly KEY_AUTO = 'auto';
    public static readonly KEY_TEXTURES = 'textures';
    private spriteFrameNames: { [key: string]: boolean } = null;
    public isNonplayerLoaded = false;
    // LIFE-CYCLE CALLBACKS:
    init() {
        this.setAllSpriteFramesUnload();
        if (!Logic.spriteFrames) {
            Logic.spriteFrames = {};
        }
        this.isNonplayerLoaded = false;
    }
    reset() {
        this.setAllSpriteFramesUnload();
        this.isNonplayerLoaded = false;
    }
    isSpriteFramesLoaded(loadedName: string) {
        if (!this.spriteFrameNames[loadedName]) {
            return false;
        }
        return true;
    }
    isAllSpriteFramesLoaded() {
        for (let loadedName in this.spriteFrameNames) {
            if (!this.spriteFrameNames[loadedName]) {
                return false;
            }
        }
        return true;
    }
    setAllSpriteFramesUnload() {
        this.spriteFrameNames = {};
        this.spriteFrameNames[LoadingManager.KEY_AUTO] = false;
        this.spriteFrameNames[LoadingManager.KEY_TEXTURES] = false;
    }

    loadNonplayer() {
        if (Logic.nonplayers) {
            this.isNonplayerLoaded = true;
            return;
        }
        cc.resources.load('Data/nonplayers', (err: Error, resource: cc.JsonAsset) => {
            if (err) {
                cc.error(err);
            } else {
                Logic.nonplayers = resource.json;
                this.isNonplayerLoaded = true;
                cc.log('nonplayers loaded');
            }
        })
    }
    
    loadAutoSpriteFrames() {
        if (Logic.spriteFrames && Logic.spriteFrameRes('singleColor')) {
            this.spriteFrameNames[LoadingManager.KEY_AUTO] = true;
            return;
        }
        cc.resources.loadDir('Texture/Auto', cc.SpriteFrame, (err: Error, assert: cc.SpriteFrame[]) => {
            for (let frame of assert) {
                Logic.spriteFrames[frame.name] = frame;
            }
            this.spriteFrameNames[LoadingManager.KEY_AUTO] = true;
            cc.log('auto texture loaded');
        })
    }
    loadSpriteAtlas(typeKey: string, hasKey: string) {
        if (Logic.spriteFrames && Logic.spriteFrames[hasKey]) {
            this.spriteFrameNames[typeKey] = true;
            return;
        }
        cc.resources.load(`Texture/${typeKey}`, cc.SpriteAtlas, (err: Error, atlas: cc.SpriteAtlas) => {
            for (let frame of atlas.getSpriteFrames()) {
                Logic.spriteFrames[frame.name] = frame;
            }
            this.spriteFrameNames[typeKey] = true;
            cc.log(`${typeKey} loaded`);
        })
    }
}
