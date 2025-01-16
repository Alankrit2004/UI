import { APIPath, BaseService, CommonUtility } from "utility";

class City {
    list(params) {
        return BaseService.post(APIPath.City.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.City.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.City.byId}?${params}`);
    }
}

const CityService = new City();
Object.freeze(CityService);
export { CityService };
    