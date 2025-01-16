import { APIPath, BaseService, CommonUtility } from "utility";

class Gender {
    list(params) {
        return BaseService.post(APIPath.Gender.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Gender.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Gender.byId}?${params}`);
    }
}

const GenderService = new Gender();
Object.freeze(GenderService);
export { GenderService };
    