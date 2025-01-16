import { APIPath, BaseService, CommonUtility } from "utility";

class Floor {
    list(params) {
        return BaseService.post(APIPath.Floor.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Floor.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Floor.byId}?${params}`);
    }
}

const FloorService = new Floor();
Object.freeze(FloorService);
export { FloorService };
    