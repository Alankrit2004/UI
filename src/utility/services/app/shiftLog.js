import { APIPath, BaseService, CommonUtility } from "utility";

class ShiftLog {
    list(params) {
        return BaseService.post(APIPath.ShiftLog.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.ShiftLog.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.ShiftLog.byId}?${params}`);
    }
}

const ShiftLogService = new ShiftLog();
Object.freeze(ShiftLogService);
export { ShiftLogService };
