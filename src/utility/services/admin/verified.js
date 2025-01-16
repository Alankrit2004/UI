import { APIPath, BaseService, CommonUtility } from "utility";

class Verified {
    list(params) {
        return BaseService.post(APIPath.Verified.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Verified.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Verified.byId}?${params}`);
    }
}

const VerifiedService = new Verified();
Object.freeze(VerifiedService);
export { VerifiedService };
    