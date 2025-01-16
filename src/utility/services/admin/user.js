import { APIPath, BaseService, CommonUtility } from "utility";

class User {
    list(params) {
        return BaseService.post(APIPath.User.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.User.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.User.byId}?${params}`);
    }
}

const UserService = new User();
Object.freeze(UserService);
export { UserService };
    