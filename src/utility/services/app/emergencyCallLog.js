import { APIPath, BaseService, CommonUtility } from "utility";

class EmergencyCallLog {
    list(params) {
        return BaseService.post(APIPath.EmergencyCallLog.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.EmergencyCallLog.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.EmergencyCallLog.byId}?${params}`);
    }
}

const EmergencyCallLogService = new EmergencyCallLog();
Object.freeze(EmergencyCallLogService);
export { EmergencyCallLogService };
