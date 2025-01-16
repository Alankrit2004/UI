import { APIPath, BaseService, CommonUtility } from "utility";

class CompanyType {
    list(params) {
        return BaseService.post(APIPath.CompanyType.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.CompanyType.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.CompanyType.byId}?${params}`);
    }
}

const CompanyTypeService = new CompanyType();
Object.freeze(CompanyTypeService);
export { CompanyTypeService };
