import { APIPath, BaseService, CommonUtility } from "utility";

class NewsPaper {
    list(params) {
        return BaseService.post(APIPath.NewsPaper.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.NewsPaper.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.NewsPaper.byId}?${params}`);
    }
}

const NewsPaperService = new NewsPaper();
Object.freeze(NewsPaperService);
export { NewsPaperService };
    