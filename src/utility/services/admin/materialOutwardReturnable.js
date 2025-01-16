import { APIPath, BaseService, CommonUtility } from "utility";

class MaterialOutwardReturnable {
    list(params) {
        return BaseService.post(APIPath.MaterialOutwardReturnable.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.MaterialOutwardReturnable.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.MaterialOutwardReturnable.byId}?${params}`);
    }
}

const MaterialOutwardReturnableService = new MaterialOutwardReturnable();
Object.freeze(MaterialOutwardReturnableService);
export { MaterialOutwardReturnableService };
    