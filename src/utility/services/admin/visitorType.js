import { APIPath, BaseService, CommonUtility } from "utility";

class VisitorType {
    list(params) {
        return BaseService.post(APIPath.VisitorType.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.VisitorType.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.VisitorType.byId}?${params}`);
    }
}

const VisitorTypeService = new VisitorType();
Object.freeze(VisitorTypeService);
export { VisitorTypeService };
    