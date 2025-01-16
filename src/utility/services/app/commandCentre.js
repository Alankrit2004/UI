import { APIPath, BaseService, CommonUtility } from "utility";

class CommandCentre {
    list(params) {
        return BaseService.post(APIPath.CommandCentre.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.CommandCentre.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.CommandCentre.byId}?${params}`);
    }
}

const CommandCentreService = new CommandCentre();
Object.freeze(CommandCentreService);
export { CommandCentreService };
