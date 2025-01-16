import { APIPath, BaseService, CommonUtility } from "utility";

class Branch {
    list(params) {
        return BaseService.post(APIPath.Branch.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Branch.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Branch.byId}?${params}`);
    }
}

const BranchService = new Branch();
Object.freeze(BranchService);
export { BranchService };
    