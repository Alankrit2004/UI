import { APIPath, BaseService, CommonUtility } from "utility";

class BadgesMissing {
    list(params) {
        return BaseService.post(APIPath.BadgesMissing.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.BadgesMissing.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.BadgesMissing.byId}?${params}`);
    }
}

const BadgesMissingService = new BadgesMissing();
Object.freeze(BadgesMissingService);
export { BadgesMissingService };
