import { useEffect, useState, useMemo } from "react";
import { ReportingToService, ErrorConstant } from "utility"; // Remove CommonConstant, PaginationType imports if not needed

export const GetReportingToEmpListForSelectList = (roleId = 0, regionId = 0) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const options = useMemo(
        () =>
            data?.map((ele) => ({
                label: ele?.text,
                value: ele?.value,
            })),
        [data]
    );

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await ReportingToService.list({
                roleId: roleId || 0,
                regionId: 0, // Use dynamic regionId
                isActive: true, // Include isActive only if it's not null
            });
            setData(result.data);
        } catch {
            setError(ErrorConstant.default);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [roleId, regionId]);

    const refresh = () => {
        fetchData(); // refresh data when needed
    };

    return {
        data,
        setData,
        options,
        error,
        loading,
        refresh,
    };
};
