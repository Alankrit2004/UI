import { APIPath, BaseService, CommonUtility } from "utility";

class Territories_State_Dist_City_Area_List_ {
    list(params) {
        return BaseService.post(APIPath.Territories_State_Dist_City_Area_List_.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.Territories_State_Dist_City_Area_List_.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.Territories_State_Dist_City_Area_List_.byId}?${params}`);
    }
}

const Territories_State_Dist_City_Area_List_Service = new Territories_State_Dist_City_Area_List_();
Object.freeze(Territories_State_Dist_City_Area_List_Service);
export { Territories_State_Dist_City_Area_List_Service };
