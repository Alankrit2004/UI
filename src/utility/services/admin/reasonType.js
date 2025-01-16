import { APIPath, BaseService, CommonUtility } from "utility";

class ReasonType {
    list(params) {
        return BaseService.post(APIPath.ReasonType.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.ReasonType.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.ReasonType.byId}?${params}`);
    }
}

const ReasonTypeService = new ReasonType();
Object.freeze(ReasonTypeService);
export { ReasonTypeService };
    