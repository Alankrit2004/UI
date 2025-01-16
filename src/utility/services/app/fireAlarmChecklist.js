import { APIPath, BaseService, CommonUtility } from "utility";

class FireAlarmChecklist {
    list(params) {
        return BaseService.post(APIPath.FireAlarmChecklist.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.FireAlarmChecklist.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.FireAlarmChecklist.byId}?${params}`);
    }
}

const FireAlarmChecklistService = new FireAlarmChecklist();
Object.freeze(FireAlarmChecklistService);
export { FireAlarmChecklistService };
