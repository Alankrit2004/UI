import { APIPath, BaseService, CommonUtility } from "utility";

class NewJoiningAccessCard {
    list(params) {
        return BaseService.post(APIPath.NewJoiningAccessCard.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.NewJoiningAccessCard.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.NewJoiningAccessCard.byId}?${params}`);
    }
}

const NewJoiningAccessCardService = new NewJoiningAccessCard();
Object.freeze(NewJoiningAccessCardService);
export { NewJoiningAccessCardService };
