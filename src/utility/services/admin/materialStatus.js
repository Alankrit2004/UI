import { APIPath, BaseService, CommonUtility } from "utility";

class MaterialStatus {
    list(params) {
        return BaseService.post(APIPath.MaterialStatus.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.MaterialStatus.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.MaterialStatus.byId}?${params}`);
    }
}

const MaterialStatusService = new MaterialStatus();
Object.freeze(MaterialStatusService);
export { MaterialStatusService };
    