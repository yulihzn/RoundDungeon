import ActorData from "./ActorData";
import BaseData from "../base/BaseData";

export default class MonsterData {
    actorData: ActorData;

    constructor() {
        this.actorData = new ActorData();
    }

    valueCopy(data: MonsterData) {
        this.actorData.valueCopy(data.actorData);
    }

    clone(): MonsterData {
        let data = new MonsterData();
        return data;
    }
}