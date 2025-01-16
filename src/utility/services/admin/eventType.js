import { APIPath, BaseService, CommonUtility } from "utility";

class EventType {
    list(params) {
        return BaseService.post(APIPath.EventType.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.EventType.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.EventType.byId}?${params}`);
    }
}

const EventTypeService = new EventType();
Object.freeze(EventTypeService);
export { EventTypeService };
