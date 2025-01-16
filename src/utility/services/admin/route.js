import { APIPath, BaseService, CommonUtility } from "utility";

class Route {
    list(params) {
        return BaseService.post(APIPath.Route.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Route.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Route.byId}?${params}`);
    }
}

const RouteService = new Route();
Object.freeze(RouteService);
export { RouteService };
    