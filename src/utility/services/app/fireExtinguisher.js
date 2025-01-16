import { APIPath, BaseService, CommonUtility } from "utility";

class FireExtinguisher {
    list(params) {
        return BaseService.post(APIPath.FireExtinguisher.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.FireExtinguisher.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.FireExtinguisher.byId}?${params}`);
    }
}

const FireExtinguisherService = new FireExtinguisher();
Object.freeze(FireExtinguisherService);
export { FireExtinguisherService };
