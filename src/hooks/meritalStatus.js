import { useEffect, useMemo, useState } from "react";
import { CommonConstant, MeritalStatusService, ErrorConstant, PaginationType } from "utility";

export const GetMeritalStatusList = (paginationType = PaginationType.default, isActive = null) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState({
        pageNo: paginationType !== PaginationType.all ? 1 : 0,
        pageSize: paginationType !== PaginationType.all ? CommonConstant.defaultPageSize : 0,
        searchText: "",
        isActive, // Include isActive only if it's not null
    });

    const options = useMemo(
        () =>
            data?.map((ele) => ({
                label: ele?.meritalStatusName,
                value: ele?.id,
            })),
        [data]
    );

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = { ...filter };
            if (filter.isActive === null) {
                delete params.isActive; // Remove isActive from params if it's null
            }
            const result = await MeritalStatusService.list(params);
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
    }, [filter]);

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
            pageNo: paginationType !== PaginationType.all ? 1 : 0,
            pageSize: paginationType !== PaginationType.all ? CommonConstant.defaultPageSize : 0,
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

export const GetMeritalStatusDetail = (Id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await MeritalStatusService.byId({ Id });
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
