import { APIPath, BaseService, CommonUtility } from "utility";

class MeritalStatus {
    list(params) {
        return BaseService.post(APIPath.MeritalStatus.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.MeritalStatus.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.MeritalStatus.byId}?${params}`);
    }
}

const MeritalStatusService = new MeritalStatus();
Object.freeze(MeritalStatusService);
export { MeritalStatusService };
    