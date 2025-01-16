import { APIPath, BaseService, CommonUtility } from "utility";

class State {
    list(params) {
        return BaseService.post(APIPath.State.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.State.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.State.byId}?${params}`);
    }
}

const StateService = new State();
Object.freeze(StateService);
export { StateService };
    