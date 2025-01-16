import { APIPath, BaseService, CommonUtility } from "utility";

class Location {
    list(params) {
        return BaseService.post(APIPath.Location.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Location.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Location.byId}?${params}`);
    }
}

const LocationService = new Location();
Object.freeze(LocationService);
export { LocationService };
    