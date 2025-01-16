import { APIPath, BaseService, CommonUtility } from "utility";

class RolePermissionMaster {
    list(params) {
        return BaseService.post(APIPath.RolePermissionMaster.list, params);
    }
}

const RolePermissionMasterService = new RolePermissionMaster();
Object.freeze(RolePermissionMasterService);
export { RolePermissionMasterService };
    