import BaseData from "../base/BaseData";

export default class DamageData extends BaseData {
    valueCopy(data: DamageData) {

    }

    clone(): DamageData {
        let data = new DamageData();
        return data;
    }
}