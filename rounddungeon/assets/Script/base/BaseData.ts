export default abstract class BaseData {
    abstract valueCopy(data: BaseData);

    abstract clone(): BaseData
}