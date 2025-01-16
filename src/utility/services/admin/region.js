import { APIPath, BaseService, CommonUtility } from "utility";

class Region {
    list(params) {
        return BaseService.post(APIPath.Region.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Region.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Region.byId}?${params}`);
    }
}

const RegionService = new Region();
Object.freeze(RegionService);
export { RegionService };
    