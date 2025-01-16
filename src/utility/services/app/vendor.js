import { APIPath, BaseService, CommonUtility } from "utility";

class Vendor {
    list(params) {
        return BaseService.post(APIPath.Vendor.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Vendor.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Vendor.byId}?${params}`);
    }
}

const VendorService = new Vendor();
Object.freeze(VendorService);
export { VendorService };
