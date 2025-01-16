import { APIPath, BaseService, CommonUtility } from "utility";

class AttendanceRegister {
    list(params) {
        return BaseService.post(APIPath.AttendanceRegister.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.AttendanceRegister.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.AttendanceRegister.byId}?${params}`);
    }
}

const AttendanceRegisterService = new AttendanceRegister();
Object.freeze(AttendanceRegisterService);
export { AttendanceRegisterService };
