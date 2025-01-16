import { APIPath, BaseService, CommonUtility } from "utility";

class RoleHierarchy {
    list(params) {
        return BaseService.post(APIPath.RoleHierarchy.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.RoleHierarchy.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.RoleHierarchy.byId}?${params}`);
    }
}

const RoleHierarchyService = new RoleHierarchy();
Object.freeze(RoleHierarchyService);
export { RoleHierarchyService };
