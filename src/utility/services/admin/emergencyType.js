import { APIPath, BaseService, CommonUtility } from "utility";

class EmergencyType {
    list(params) {
        return BaseService.post(APIPath.EmergencyType.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.EmergencyType.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.EmergencyType.byId}?${params}`);
    }
}

const EmergencyTypeService = new EmergencyType();
Object.freeze(EmergencyTypeService);
export { EmergencyTypeService };
    