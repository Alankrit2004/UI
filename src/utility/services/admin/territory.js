import { APIPath, BaseService, CommonUtility } from "utility";

class Territories {
    list(params) {
        return BaseService.post(APIPath.Territories.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Territories.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Territories.byId}?${params}`);
    }
}

const TerritoriesService = new Territories();
Object.freeze(TerritoriesService);
export { TerritoriesService };
