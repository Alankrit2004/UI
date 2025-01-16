import { APIPath, BaseService, CommonUtility } from "utility";

class PAChecklist {
    list(params) {
        return BaseService.post(APIPath.PAChecklist.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.PAChecklist.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.PAChecklist.byId}?${params}`);
    }
}

const PAChecklistService = new PAChecklist();
Object.freeze(PAChecklistService);
export { PAChecklistService };
