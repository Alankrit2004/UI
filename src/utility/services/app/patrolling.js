import { APIPath, BaseService, CommonUtility } from "utility";

class Patrolling {
    list(params) {
        return BaseService.post(APIPath.Patrolling.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Patrolling.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Patrolling.byId}?${params}`);
    }
}

const PatrollingService = new Patrolling();
Object.freeze(PatrollingService);
export { PatrollingService };
