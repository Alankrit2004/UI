import { APIPath, BaseService, CommonUtility } from "utility";

class EmployeeType {
    list(params) {
        return BaseService.post(APIPath.EmployeeType.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.EmployeeType.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.EmployeeType.byId}?${params}`);
    }
}

const EmployeeTypeService = new EmployeeType();
Object.freeze(EmployeeTypeService);
export { EmployeeTypeService };
    