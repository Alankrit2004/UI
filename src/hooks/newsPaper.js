import { useEffect, useMemo, useState } from "react";
import { CommonConstant, NewsPaperService, ErrorConstant, PaginationType } from "utility";

export const GetNewsPaperList = (paginationType = PaginationType.default) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState({
        pageNo: paginationType !== PaginationType.all ? 1 : 0,
        pageSize: paginationType !== PaginationType.all ? CommonConstant.defaultPageSize : 0,
        isActive: null,
        searchText: "",
    });

    const options = useMemo(
        () =>
            data?.map((ele) => ({
                label: ele?.NewsPaperName,
                value: ele?.id,
            })),
        [data]
    );

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await NewsPaperService.list(filter);
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

export const GetNewsPaperDetail = (Id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await NewsPaperService.byId({ Id });
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
