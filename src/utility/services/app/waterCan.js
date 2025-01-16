import { APIPath, BaseService, CommonUtility } from "utility";

class WaterCan {
    list(params) {
        return BaseService.post(APIPath.WaterCan.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.WaterCan.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.WaterCan.byId}?${params}`);
    }
}

const WaterCanService = new WaterCan();
Object.freeze(WaterCanService);
export { WaterCanService };
