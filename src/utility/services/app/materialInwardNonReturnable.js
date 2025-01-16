import { APIPath, BaseService, CommonUtility } from "utility";

class MaterialInwardNonReturnable {
    list(params) {
        return BaseService.post(APIPath.MaterialInwardNonReturnable.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.MaterialInwardNonReturnable.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.MaterialInwardNonReturnable.byId}?${params}`);
    }
}

const MaterialInwardNonReturnableService = new MaterialInwardNonReturnable();
Object.freeze(MaterialInwardNonReturnableService);
export { MaterialInwardNonReturnableService };
