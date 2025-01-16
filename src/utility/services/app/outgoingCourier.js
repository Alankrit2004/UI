import { APIPath, BaseService, CommonUtility } from "utility";

class OutgoingCourier {
    list(params) {
        return BaseService.post(APIPath.OutgoingCourier.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.OutgoingCourier.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.OutgoingCourier.byId}?${params}`);
    }
}

const OutgoingCourierService = new OutgoingCourier();
Object.freeze(OutgoingCourierService);
export { OutgoingCourierService };
