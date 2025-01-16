import { APIPath, BaseService, CommonUtility } from "utility";

class IncidentType {
    list(params) {
        return BaseService.post(APIPath.IncidentType.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.IncidentType.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.IncidentType.byId}?${params}`);
    }
}

const IncidentTypeService = new IncidentType();
Object.freeze(IncidentTypeService);
export { IncidentTypeService };
