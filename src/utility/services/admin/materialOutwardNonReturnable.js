import { APIPath, BaseService, CommonUtility } from "utility";

class MaterialOutwardNonReturnable {
    list(params) {
        return BaseService.post(APIPath.MaterialOutwardNonReturnable.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.MaterialOutwardNonReturnable.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.MaterialOutwardNonReturnable.byId}?${params}`);
    }
}

const MaterialOutwardNonReturnableService = new MaterialOutwardNonReturnable();
Object.freeze(MaterialOutwardNonReturnableService);
export { MaterialOutwardNonReturnableService };
    