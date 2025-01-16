import { useEffect, useMemo, useState } from "react";
import { Territories_State_Dist_City_Area_List_Service, ErrorConstant } from "utility";

export const GetTerritories_State_Dist_City_Area_List_ById = () => {
    const [regionList, setRegionList] = useState([]);
    const [stateList, setstateList] = useState([]);
    const [districtList, setdistrictList] = useState([]);
    const [cityList, setcityList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [regionfilter, setregionFilter] = useState({
        regionId: 0,
        stateId: 0,
        districtId: 0,
        cityId: 0,
        cityGradeId: 0,
    });
    const [statefilter, setstateFilter] = useState({
        regionId: 0,
        stateId: 0,
        districtId: 0,
        cityId: 0,
        cityGradeId: 0,
    });
    console.log("🚀 ~ file: territory.js:23 ~ statefilter:", statefilter)
    const [districtfilter, setdistrictFilter] = useState({
        regionId: 0,
        stateId: 0,
        districtId: 0,
        cityId: 0,
        cityGradeId: 0,
    });
    const [cityfilter, setCityFilter] = useState({
        regionId: 0,
        stateId: 0,
        districtId: 0,
        cityId: 0,
        cityGradeId: 0,
    });
    const fetchRegionData = async () => {
        try {
            setLoading(true);
            const result = await Territories_State_Dist_City_Area_List_Service.list(regionfilter);
            const transformedData = result.data.map(item => ({
                value: item.value,
                label: item.text
            }));
            setRegionList(transformedData);
        } catch {
            setError(ErrorConstant.default);
        } finally {
            setLoading(false);
        }
    };
    const fetchStateData = async () => {
        try {
            setLoading(true);
            const result = await Territories_State_Dist_City_Area_List_Service.list(regionfilter);
            const transformedData = result.data.map(item => ({
                value: item.value,
                label: item.text
            }));
            setstateList(transformedData);
        } catch {
            setError(ErrorConstant.default);
        } finally {
            setLoading(false);
        }
    };
    const fetchDistrictData = async () => {
        try {
            setLoading(true);
            const result = await Territories_State_Dist_City_Area_List_Service.list(statefilter);
            const transformedData = result.data.map(item => ({
                value: item.value,
                label: item.text
            }));
            setdistrictList(transformedData);
        } catch {
            setError(ErrorConstant.default);
        } finally {
            setLoading(false);
        }
    };
    const fetchCityData = async () => {
        try {
            setLoading(true);
            const result = await Territories_State_Dist_City_Area_List_Service.list(districtfilter);
            const transformedData = result.data.map(item => ({
                value: item.value,
                label: item.text
            }));
            setcityList(transformedData);
        } catch {
            setError(ErrorConstant.default);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchRegionData();
    }, []);
    useEffect(() => {
        fetchDistrictData();
    }, [statefilter]);
    useEffect(() => {
        fetchStateData();
    }, [regionfilter]);
    useEffect(() => {
        fetchCityData();
    }, [districtfilter]);
    const refresh = () => { };
    const regionfilterChanged = (data) => {
        setregionFilter({ ...regionfilter, ...data });
    };

    const statefilterChanged = (data) => {
        setstateFilter({ ...statefilter, ...data });
    };
    const districtfilterChanged = (data) => {
        setdistrictFilter({ ...districtfilter, ...data });
    };
    const cityfilterChanged = (data) => {
        setCityFilter({ ...cityfilter, ...data });
    };
    return {
        cityList,
        stateList,
        regionList,
        districtList,
        regionfilter,
        statefilter,
        districtfilter,
        cityfilter,
        refresh,
        regionfilterChanged,
        statefilterChanged,
        districtfilterChanged,
        cityfilterChanged,
    };
};








