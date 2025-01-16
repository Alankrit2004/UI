import { APIPath, BaseService, CommonUtility } from "utility";

class RolePermission {
    list(params) {
        return BaseService.post(APIPath.RolePermission.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.RolePermission.save, data);
    }

}

const RolePermissionService = new RolePermission();
Object.freeze(RolePermissionService);
export { RolePermissionService };
