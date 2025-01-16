import { APIPath, BaseService, CommonUtility } from "utility";

class Shift {
    list(params) {
        return BaseService.post(APIPath.Shift.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Shift.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Shift.byId}?${params}`);
    }
}

const ShiftService = new Shift();
Object.freeze(ShiftService);
export { ShiftService };
    