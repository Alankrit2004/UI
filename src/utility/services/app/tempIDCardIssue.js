import { APIPath, BaseService, CommonUtility } from "utility";

class TempIDCardIssue {
    list(params) {
        return BaseService.post(APIPath.TempIDCardIssue.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.TempIDCardIssue.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.TempIDCardIssue.byId}?${params}`);
    }
}

const TempIDCardIssueService = new TempIDCardIssue();
Object.freeze(TempIDCardIssueService);
export { TempIDCardIssueService };
