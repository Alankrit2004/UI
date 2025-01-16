import { APIPath, BaseService, CommonUtility } from "utility";

class BloodGroup {
    list(params) {
        return BaseService.post(APIPath.BloodGroup.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.BloodGroup.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.BloodGroup.byId}?${params}`);
    }
}

const BloodGroupService = new BloodGroup();
Object.freeze(BloodGroupService);
export { BloodGroupService };
    