import { APIPath, BaseService, CommonUtility } from "utility";

class VehicleEntryChecklist {
    list(params) {
        return BaseService.post(APIPath.VehicleEntryChecklist.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.VehicleEntryChecklist.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.VehicleEntryChecklist.byId}?${params}`);
    }
}

const VehicleEntryChecklistService = new VehicleEntryChecklist();
Object.freeze(VehicleEntryChecklistService);
export { VehicleEntryChecklistService };
