import { APIPath, BaseService, CommonUtility } from "utility";

class ReportingTo {
    list(params) {
        return BaseService.post(APIPath.ReportingTo.list, params);
    }
}

const ReportingToService = new ReportingTo();
Object.freeze(ReportingToService);
export { ReportingToService };
    