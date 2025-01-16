import { APIPath, BaseService, CommonUtility } from "utility";

class LostAndFound {
    list(params) {
        return BaseService.post(APIPath.LostAndFound.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.LostAndFound.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.LostAndFound.byId}?${params}`);
    }
}

const LostAndFoundService = new LostAndFound();
Object.freeze(LostAndFoundService);
export { LostAndFoundService };
