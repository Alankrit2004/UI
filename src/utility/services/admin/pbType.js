import { APIPath, BaseService, CommonUtility } from "utility";

class PBType {
    list(params) {
        return BaseService.post(APIPath.PBType.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.PBType.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.PBType.byId}?${params}`);
    }
}

const PBTypeService = new PBType();
Object.freeze(PBTypeService);
export { PBTypeService };
