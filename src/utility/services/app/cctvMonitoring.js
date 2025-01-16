import { APIPath, BaseService, CommonUtility } from "utility";

class CCTVMonitoring {
    list(params) {
        return BaseService.post(APIPath.CCTVMonitoring.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.CCTVMonitoring.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.CCTVMonitoring.byId}?${params}`);
    }
}

const CCTVMonitoringService = new CCTVMonitoring();
Object.freeze(CCTVMonitoringService);
export { CCTVMonitoringService };
