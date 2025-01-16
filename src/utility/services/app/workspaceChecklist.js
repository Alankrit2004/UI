import { APIPath, BaseService, CommonUtility } from "utility";

class WorkspaceChecklist {
    list(params) {
        return BaseService.post(APIPath.WorkspaceChecklist.list, params);
    }

    add(data) {
        return BaseService.post(APIPath.WorkspaceChecklist.save, data);
    }

    byId(data) {
        const params = CommonUtility.objectToParams(data)
        return BaseService.post(`${APIPath.WorkspaceChecklist.byId}?${params}`);
    }
}

const WorkspaceChecklistService = new WorkspaceChecklist();
Object.freeze(WorkspaceChecklistService);
export { WorkspaceChecklistService };
