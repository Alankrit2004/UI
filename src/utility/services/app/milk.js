import { APIPath, BaseService, CommonUtility } from "utility";

class Milk {
    list(params) {
        return BaseService.post(APIPath.Milk.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Milk.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Milk.byId}?${params}`);
    }
}

const MilkService = new Milk();
Object.freeze(MilkService);
export { MilkService };
