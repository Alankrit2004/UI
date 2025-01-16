import { APIPath, BaseService, CommonUtility } from "utility";

class Department {
    list(params) {
        return BaseService.post(APIPath.department.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.department.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.department.byId}?${params}`);
    }
}

const DepartmentService = new Department();
Object.freeze(DepartmentService);
export { DepartmentService };
    