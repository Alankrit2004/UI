
export const getSinglePermission = (permissionList, moduleName) => {
    let tempData = permissionList?.filter(ele => ele.appType === "W").find((per) => String(per.moduleName) === String(moduleName))
    return tempData ? tempData : { add: false, view: false, edit: false }
}
