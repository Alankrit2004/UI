import { APIPath, BaseService, CommonUtility } from "utility";

class VehicleType {
    list(params) {
        return BaseService.post(APIPath.VehicleType.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.VehicleType.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.VehicleType.byId}?${params}`);
    }
}

const VehicleTypeService = new VehicleType();
Object.freeze(VehicleTypeService);
export { VehicleTypeService };
