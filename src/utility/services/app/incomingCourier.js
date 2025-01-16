import { APIPath, BaseService, CommonUtility } from "utility";

class IncomingCourier {
    list(params) {
        return BaseService.post(APIPath.IncomingCourier.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.IncomingCourier.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.IncomingCourier.byId}?${params}`);
    }
}

const IncomingCourierService = new IncomingCourier();
Object.freeze(IncomingCourierService);
export { IncomingCourierService };
