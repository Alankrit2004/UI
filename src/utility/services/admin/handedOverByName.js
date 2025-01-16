import { APIPath, BaseService, CommonUtility } from "utility";

class HandedOverByName {
    list(params) {
        return BaseService.post(APIPath.HandedOverByName.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.HandedOverByName.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.HandedOverByName.byId}?${params}`);
    }
}

const HandedOverByNameService = new HandedOverByName();
Object.freeze(HandedOverByNameService);
export { HandedOverByNameService };
