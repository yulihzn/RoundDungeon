import ActorData from "./ActorData";
import BaseData from "../base/BaseData";

export default class PlayerData {
    actorData: ActorData;

    constructor() {
        this.actorData = new ActorData();
    }

    valueCopy(data: PlayerData) {
        this.actorData.valueCopy(data.actorData);
    }

    clone(): PlayerData {
        let data = new PlayerData();
        return data;
    }
}