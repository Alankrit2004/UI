import { APIPath, BaseService, CommonUtility } from "utility";

class Occurence {
    list(params) {
        return BaseService.post(APIPath.Occurence.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Occurence.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Occurence.byId}?${params}`);
    }
}

const OccurenceService = new Occurence();
Object.freeze(OccurenceService);
export { OccurenceService };
