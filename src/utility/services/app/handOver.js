import { APIPath, BaseService, CommonUtility } from "utility";

class HandOver {
    list(params) {
        return BaseService.post(APIPath.HandOver.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.HandOver.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.HandOver.byId}?${params}`);
    }
}

const HandOverService = new HandOver();
Object.freeze(HandOverService);
export { HandOverService };
