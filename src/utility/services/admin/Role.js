import { APIPath, BaseService, CommonUtility } from "utility";

class Role {
    list(params) {
        return BaseService.post(APIPath.Role.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Role.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Role.byId}?${params}`);
    }
}

const RoleService = new Role();
Object.freeze(RoleService);
export { RoleService };
