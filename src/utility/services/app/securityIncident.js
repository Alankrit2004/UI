import { APIPath, BaseService, CommonUtility } from "utility";

class SecurityIncident {
    list(params) {
        return BaseService.post(APIPath.SecurityIncident.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.SecurityIncident.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.SecurityIncident.byId}?${params}`);
    }
}

const SecurityIncidentService = new SecurityIncident();
Object.freeze(SecurityIncidentService);
export { SecurityIncidentService };
