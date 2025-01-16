import { APIPath, BaseService, CommonUtility } from "utility";

class MaterialInwardReturnable {
    list(params) {
        return BaseService.post(APIPath.MaterialInwardReturnable.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.MaterialInwardReturnable.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.MaterialInwardReturnable.byId}?${params}`);
    }
}

const MaterialInwardReturnableService = new MaterialInwardReturnable();
Object.freeze(MaterialInwardReturnableService);
export { MaterialInwardReturnableService };
