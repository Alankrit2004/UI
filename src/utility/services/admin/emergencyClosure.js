import { APIPath, BaseService, CommonUtility } from "utility";

class EmergencyClosure {
    list(params) {
        return BaseService.post(APIPath.EmergencyClosure.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.EmergencyClosure.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.EmergencyClosure.byId}?${params}`);
    }
}

const EmergencyClosureService = new EmergencyClosure();
Object.freeze(EmergencyClosureService);
export { EmergencyClosureService };
    