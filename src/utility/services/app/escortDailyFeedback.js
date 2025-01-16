import { APIPath, BaseService, CommonUtility } from "utility";

class EscortDailyFeedback {
    list(params) {
        return BaseService.post(APIPath.EscortDailyFeedback.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.EscortDailyFeedback.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.EscortDailyFeedback.byId}?${params}`);
    }
}

const EscortDailyFeedbackService = new EscortDailyFeedback();
Object.freeze(EscortDailyFeedbackService);
export { EscortDailyFeedbackService };
