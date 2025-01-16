import { APIPath, BaseService, CommonUtility } from "utility";

class ExitEmployee {
    list(params) {
        return BaseService.post(APIPath.ExitEmployee.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.ExitEmployee.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.ExitEmployee.byId}?${params}`);
    }
}

const ExitEmployeeService = new ExitEmployee();
Object.freeze(ExitEmployeeService);
export { ExitEmployeeService };
