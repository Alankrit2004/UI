import { APIPath, BaseService, CommonUtility } from "utility";

class FoodDelivery {
    list(params) {
        return BaseService.post(APIPath.FoodDelivery.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.FoodDelivery.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.FoodDelivery.byId}?${params}`);
    }
}

const FoodDeliveryService = new FoodDelivery();
Object.freeze(FoodDeliveryService);
export { FoodDeliveryService };
