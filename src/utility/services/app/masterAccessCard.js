import { APIPath, BaseService, CommonUtility } from "utility";

class MasterAccessCard {
    list(params) {
        return BaseService.post(APIPath.MasterAccessCard.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.MasterAccessCard.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.MasterAccessCard.byId}?${params}`);
    }
}

const MasterAccessCardService = new MasterAccessCard();
Object.freeze(MasterAccessCardService);
export { MasterAccessCardService };
