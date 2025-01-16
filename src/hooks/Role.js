import { useEffect, useMemo, useState } from "react";
import { CommonConstant, RoleService, ErrorConstant, PaginationType } from "utility";

export const GetRoleList = (
    paginationType = PaginationType.default,
    isActive = null,
    initialDepartmentId = 0 // departmentId will be passed here as a parameter
) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState({
        pageNo: paginationType !== PaginationType.all ? 1 : 0,
        pageSize: paginationType !== PaginationType.all ? CommonConstant.defaultPageSize : 0,
        searchText: "",
        isActive, // Include isActive only if it's not null
        departmentId: initialDepartmentId, // Initialize with departmentId from parameter
    });

    const options = useMemo(
        () =>
            data?.map((ele) => ({
                label: ele?.roleName,
                value: ele?.id,
            })),
        [data]
    );

    const fetchData = async () => {
        try {
            setLoading(true);

            const params = {
                ...filter,
                departmentId: filter.departmentId ? filter.departmentId : 0, // Pass selected departmentId
            };

            if (filter.isActive === null) {
                delete params.isActive; // Remove isActive from params if it's null
            }

            const result = await RoleService.list(params);
            setData(result.data);
            setTotalCount(result.total);
        } catch {
            setError(ErrorConstant.default);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {       
        fetchData();
    }, [filter]); // Trigger fetch whenever filter changes

    const pageChanged = (page) => {
        setFilter({
            ...filter,
            pageNo: page,
        });
    };

    const refresh = () => {
        setFilter({
            ...filter,
        });
    };

    const filterChanged = (data) => {
        setFilter({
            ...filter,
            ...data,
        });
    };

    return {
        data,
        setData,
        options,
        error,
        loading,
        filter,
        totalCount,
        pageChanged,
        refresh,
        filterChanged,
    };
};

export const GetRoleListEmp = (
    paginationType = PaginationType.default,
    isActive = null,
    initialDepartmentId = 0 // departmentId will be passed here as a parameter
) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState({
        pageNo: paginationType !== PaginationType.all ? 1 : 0,
        pageSize: paginationType !== PaginationType.all ? CommonConstant.defaultPageSize : 0,
        searchText: "",
        isActive, // Include isActive only if it's not null
        departmentId: initialDepartmentId, // Initialize with departmentId from parameter
    });

    const options = useMemo(
        () =>
            data?.map((ele) => ({
                label: ele?.roleName,
                value: ele?.id,
            })),
        [data]
    );

    const fetchData = async () => {
        if (!filter.departmentId || filter.departmentId === 0) {
            setData([]); // Clear role list
            return; // Skip the API call
        }

        try {
            setLoading(true);

            const params = {
                ...filter,
                departmentId: filter.departmentId ? filter.departmentId : 0, // Pass selected departmentId
            };

            if (filter.isActive === null) {
                delete params.isActive;  // Remove isActive from params if it's null
            }

            const result = await RoleService.list(params);
            setData(result.data);
            setTotalCount(result.total);
        } catch {
            setError(ErrorConstant.default);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {      
        fetchData();
    }, [filter]); // Trigger fetch whenever filter changes

    const pageChanged = (page) => {
        setFilter({
            ...filter,
            pageNo: page,
        });
    };

    const refresh = () => {
        setFilter({
            ...filter,
        });
    };

    const filterChanged = (data) => {
        setFilter({
            ...filter,
            ...data,
        });
    };

    return {
        data,
        setData,
        options,
        error,
        loading,
        filter,
        totalCount,
        pageChanged,
        refresh,
        filterChanged,
    };
};

export const GetRoleDetail = (Id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await RoleService.byId({ Id });
            setData(result.data);
        } catch {
            setError(ErrorConstant.default);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (Id) {
            fetchData();
        }
    }, [Id]);

    const refresh = () => {
        fetchData();
    };

    return {
        data,
        setData,
        error,
        loading,
        refresh,
    };
};
