export default class Utils {
    /**
     * 返回方向偏转角度
     * @param direction 方向
     * @param isFlip? 是否翻转
     * @returns 该方向的偏转角度
     */
     public static getRotateAngle(direction:cc.Vec2,isFlip?:boolean){
        // 方向向量归一化,计算偏转角度
        let angle = cc.v2(1,0).signAngle(cc.v2(direction.normalize())) * 180 / Math.PI;
        return isFlip?-angle:angle;
    }
}