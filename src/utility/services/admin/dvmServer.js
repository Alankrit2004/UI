import { APIPath, BaseService, CommonUtility } from "utility";

class DVMServer {
    list(params) {
        return BaseService.post(APIPath.DVMServer.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.DVMServer.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.DVMServer.byId}?${params}`);
    }
}

const DVMServerService = new DVMServer();
Object.freeze(DVMServerService);
export { DVMServerService };
    