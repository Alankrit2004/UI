import { APIPath, BaseService, CommonUtility } from "utility";

class PersonalBelonging {
    list(params) {
        return BaseService.post(APIPath.PersonalBelonging.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.PersonalBelonging.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.PersonalBelonging.byId}?${params}`);
    }
}

const PersonalBelongingService = new PersonalBelonging();
Object.freeze(PersonalBelongingService);
export { PersonalBelongingService };
