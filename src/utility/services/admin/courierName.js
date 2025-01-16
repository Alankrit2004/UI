import { APIPath, BaseService, CommonUtility } from "utility";

class CourierName {
    list(params) {
        return BaseService.post(APIPath.CourierName.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.CourierName.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.CourierName.byId}?${params}`);
    }
}

const CourierNameService = new CourierName();
Object.freeze(CourierNameService);
export { CourierNameService };
