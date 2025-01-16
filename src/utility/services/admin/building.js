import { APIPath, BaseService, CommonUtility } from "utility";

class Building {
    list(params) {
        return BaseService.post(APIPath.Building.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Building.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Building.byId}?${params}`);
    }
}

const BuildingService = new Building();
Object.freeze(BuildingService);
export { BuildingService };
    