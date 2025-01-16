import { APIPath, BaseService, CommonUtility } from "utility";

class District {
    list(params) {
        return BaseService.post(APIPath.District.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.District.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.District.byId}?${params}`);
    }
}

const DistrictService = new District();
Object.freeze(DistrictService);
export { DistrictService };
    