import { APIPath, BaseService, CommonUtility } from "utility";

class EBIServer {
    list(params) {
        return BaseService.post(APIPath.EBIServer.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.EBIServer.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.EBIServer.byId}?${params}`);
    }
}

const EBIServerService = new EBIServer();
Object.freeze(EBIServerService);
export { EBIServerService };
    