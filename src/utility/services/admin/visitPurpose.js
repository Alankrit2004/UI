import { APIPath, BaseService, CommonUtility } from "utility";

class VisitPurpose {
    list(params) {
        return BaseService.post(APIPath.VisitPurpose.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.VisitPurpose.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.VisitPurpose.byId}?${params}`);
    }
}

const VisitPurposeService = new VisitPurpose();
Object.freeze(VisitPurposeService);
export { VisitPurposeService };
    