import { APIPath, BaseService, CommonUtility } from "utility";

class Key {
    list(params) {
        return BaseService.post(APIPath.Key.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Key.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Key.byId}?${params}`);
    }
}

const KeyService = new Key();
Object.freeze(KeyService);
export { KeyService };
