import { APIPath, BaseService, CommonUtility } from "utility";

class Company {
    list(params) {
        return BaseService.post(APIPath.Company.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Company.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Company.byId}?${params}`);
    }
}

const CompanyService = new Company();
Object.freeze(CompanyService);
export { CompanyService };
    