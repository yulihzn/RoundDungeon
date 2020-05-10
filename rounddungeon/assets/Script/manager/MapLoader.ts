import MapData from "../data/MapData";

export default class MapLoader{
    //读取文件的数据
    private allfileRooms00: { [key: string]: MapData[] } = {};
    isloaded00: boolean = false;
    //文件是否加载成功
    isloaded: boolean = false;
}