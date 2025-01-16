import { APIPath, BaseService, CommonUtility } from "utility";

class OvernightParking {
    list(params) {
        return BaseService.post(APIPath.OvernightParking.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.OvernightParking.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.OvernightParking.byId}?${params}`);
    }
}

const OvernightParkingService = new OvernightParking();
Object.freeze(OvernightParkingService);
export { OvernightParkingService };
