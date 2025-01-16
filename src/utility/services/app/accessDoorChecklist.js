import { APIPath, BaseService, CommonUtility } from "utility";

class AccessDoorChecklist {
    list(params) {
        return BaseService.post(APIPath.AccessDoorChecklist.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.AccessDoorChecklist.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.AccessDoorChecklist.byId}?${params}`);
    }
}

const AccessDoorChecklistService = new AccessDoorChecklist();
Object.freeze(AccessDoorChecklistService);
export { AccessDoorChecklistService };
