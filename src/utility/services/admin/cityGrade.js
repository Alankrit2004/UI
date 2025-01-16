import { APIPath, BaseService, CommonUtility } from "utility";

class CityGrade {
    list(params) {
        return BaseService.post(APIPath.CityGrade.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.CityGrade.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.CityGrade.byId}?${params}`);
    }
}

const CityGradeService = new CityGrade();
Object.freeze(CityGradeService);
export { CityGradeService };
    