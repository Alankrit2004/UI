import { APIPath, BaseService, CommonUtility } from "utility";

class RolePermissionEmployeePermission {
    list(params) {
        return BaseService.post(APIPath.RolePermissionEmployeePermission.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.RolePermissionEmployeePermission.save, data);
    }

}

const RolePermissionEmployeePermissionService = new RolePermissionEmployeePermission();
Object.freeze(RolePermissionEmployeePermissionService);
export { RolePermissionEmployeePermissionService };
