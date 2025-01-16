// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import { CustomButton1 } from "components";

// ICONS
import { IoMdAdd } from "react-icons/io";

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AddEditregionModel, AddEditStateModel, AddEditCityGradeModel, AddEditDepartMentModel, AddEditCityModel } from "components";
import { AppTable, FormCheckBox, FormTextField, FormSelectField, ModalHeader, PopUpModal, SubmitCancelButtons, TableHeaderBox } from "elements";
import { TerritoriesService, FormModes, NotificationStatus, PaginationType } from "utility";
import { GetTerritoriesDetail, reactToaster } from "hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { GetCityList, GetRegionList, GetDistrictList, GetTerritoriesList, GetStateList, GetCityGradeList } from "hooks";

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const TerritoriesSchema = yup.object().shape({
    regionId: yup.string().required('region is required'),
    stateId: yup.string().required('state is required'),
    districtId: yup.string().required('district is required'),
    cityId: yup.string().required('city is required'),
    cityGradeId: yup.string().required('cityGrade is required'),
    isActive: yup.boolean(),
})

export function Territories() {
    const { user } = useAuth()
    const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

    useEffect(() => {
        if (Number(user?.roleId) !== 1) {
            setPermission(getSinglePermission(user?.userRoleList, "ADMIN TERRITORIES"))
        }
    }, [user])

    const [openPopUpModel, setPopUpModel] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetTerritoriesList()
    const openModel = (mode, data) => {
        setPopUpModel({
            ...openModel,
            open: true,
            mode: mode || FormModes.Add,
            data: data || {}
        })
    }

    const onSubmit = (data) => {
        setPopUpModel({
            mode: "",
            open: false,
            data: {}
        })
        if (data) {
            refresh()
        }
    }

    const columns = [
        { header: "S.No.", field: "", index: true },
        { header: "region", field: "regionName" },
        { header: "state", field: "stateName" },
        { header: "district", field: "districtName" },
        { header: "city", field: "cityName" },
        { header: "city Grade", field: "cityGrade" },
        { header: "Status", field: "isActive", status: true },
        { header: "Created Date", field: "createdDate", render: (data) => <>{dayjs(data).format("DD-MM-YYYY")}</> },
        { header: "Created By", field: "creatorName" },
        {
            header: "Action",
            action: true,
            onEdit: Permission.edit ? (data) => openModel(FormModes.Edit, data) : null,
            // onEdit: (data) => openModel(FormModes.Edit, data),
            onView: (data) => openModel(FormModes.View, data)
        },
    ];

    return (
        <>
            <TableHeaderBox
                showSearch
                onSearch={(val) => { filterChanged({ searchText: val }) }}
                left={
                    Permission.add && (
                        <CustomButton1
                            label={"Add"}
                            icon={<IoMdAdd />}
                            className="bg-prp-color text-white  shrink grow md:grow-0 max-w-[50%]"
                            onClick={() => openModel(FormModes.Add)}
                        />
                    )
                }
            >
            </TableHeaderBox>
            {Permission?.view && (
                <AppTable
                    columns={columns}
                    data={data}
                    loading={loading}
                    pageNo={filter.pageNo}
                    pageSize={filter.pageSize}
                    totalCount={totalCount}
                    pageChanged={pageChanged}
                />
            )}
            {(Permission.add || Permission.edit || Permission.view) && (
                <AddEditTerritoriesModel
                    open={openPopUpModel.open}
                    data={openPopUpModel.data}
                    mode={openPopUpModel.mode}
                    onSubmit={onSubmit}
                />
            )}
        </>
    )
}

const AddEditTerritoriesModel = ({ mode, open, onSubmit, data }) => {
    const { data: detail } = GetTerritoriesDetail(data.id)
    const { options: Region, refresh: RegionRefresh } = GetRegionList(PaginationType.all, true)
    const { options: State, refresh: StateRefresh } = GetStateList(PaginationType.all, true)
    const { options: district, refresh: DistrictRefresh } = GetDistrictList(PaginationType.all, true)
    const { options: City, refresh: CityRefresh } = GetCityList(PaginationType.all, true)
    const { options: CityGrade, refresh: CityGradeRefresh } = GetCityGradeList(PaginationType.all, true)
    console.log("🚀 ~ file: territories.jsx:107 ~ AddEditTerritoriesModel ~ Region:", Region)
    const [proccessing, setProcessing] = useState('');
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(TerritoriesSchema),
    })
    const regionId = watch("regionId")
    const stateId = watch("stateId")
    const districtId = watch("districtId")
    const cityId = watch("cityId")
    useEffect(() => {
        if ([FormModes.Edit, FormModes.View].includes(mode)) {
            reset({
                ...detail
            })
        } else {
            reset({
                id: 0,
                TerritoriesName: "",
                isActive: true,
            })
        }
    }, [detail, mode, open])
    const [openPopUpModelRegion, setPopUpModelRegion] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const openModelRegion = (mode, data) => {
        setPopUpModelRegion({
            ...openModelRegion,
            open: true,
            mode: mode || FormModes.Add,
            data: data || {}
        })
    }
    const onSubmitRegion = (data) => {
        setPopUpModelRegion({
            mode: "",
            open: false,
            data: {}
        })
        if (data) {
            RegionRefresh()
        }
    }
    const [openPopUpModelState, setPopUpModelState] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const openModelState = (mode, data) => {
        setPopUpModelState({
            ...openModelState,
            open: true,
            mode: mode || FormModes.Add,
            data: data || {}
        })
    }
    const onSubmitState = (data) => {
        setPopUpModelState({
            mode: "",
            open: false,
            data: {}
        })
        if (data) {
            StateRefresh()
        }
    }
    const [openPopUpModelDistrict, setPopUpModelDistrict] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const openModelDistrict = (mode, data) => {
        setPopUpModelDistrict({
            ...openModelDistrict,
            open: true,
            mode: mode || FormModes.Add,
            data: data || {}
        })
    }
    const onSubmitDistrict = (data) => {
        setPopUpModelDistrict({
            mode: "",
            open: false,
            data: {}
        })
        if (data) {
            DistrictRefresh()
        }
    }
    const [openPopUpModelCity, setPopUpModelCity] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const openModelCity = (mode, data) => {
        setPopUpModelCity({
            ...openModelCity,
            open: true,
            mode: mode || FormModes.Add,
            data: data || {}
        })
    }
    const onSubmitCity = (data) => {
        setPopUpModelCity({
            mode: "",
            open: false,
            data: {}
        })
        if (data) {
            CityRefresh()
        }
    }
    const [openPopUpModelCityGrade, setPopUpModelCityGrade] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const openModelCityGrade = (mode, data) => {
        setPopUpModelCityGrade({
            ...openModelCityGrade,
            open: true,
            mode: mode || FormModes.Add,
            data: data || {}
        })
    }
    const onSubmitCityGrade = (data) => {
        setPopUpModelCityGrade({
            mode: "",
            open: false,
            data: {}
        })
        if (data) {
            CityGradeRefresh()
        }
    }
    const submit = async (formData) => {
        try {
            setProcessing("proccessing")
            const result = await TerritoriesService.add(formData)
            reactToaster(result.message, NotificationStatus.success)
            onSubmit(result)
        } catch {
            reactToaster(NotificationStatus.error)
        } finally {
            setProcessing('')
        }
    }

    return (
        <PopUpModal open={open}>
            <ModalHeader mode={mode} title="Territories " />
            <div className=" overflow-y-auto p-4 w-[65vw]  ">
                <div className="grid grid-cols-2 gap-2  gap-x-4 gap-y-3 md:grid-cols-3  overflow-y-auto  ">
                    <FormSelectField
                        mode={mode}
                        control={control}
                        required
                        label="region"
                        name="regionId"
                        showAddButton
                        options={Region}
                        onImageClick={() => openModelRegion({ open: true })}
                        placeholder="select Region"
                        errors={errors?.regionId}
                        valueId="id"
                        optionlabel="RegionName"
                        defaultValue=""
                        className="col-span-2"

                    ></FormSelectField>
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="state"
                        name="stateId"
                        readOnly={!regionId}
                        required
                        showAddButton
                        options={State}
                        onImageClick={() => openModelState({ open: true })}
                        placeholder="select state"
                        errors={errors?.stateId}
                        valueId="id"
                        optionlabel="stateName"
                        defaultValue=""
                        className="col-span-2"

                    ></FormSelectField>
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="district"
                        name="districtId"
                        showAddButton
                        readOnly={!stateId}
                        options={district}
                        onImageClick={() => openModelDistrict({ open: true })}
                        required
                        placeholder="select district"
                        errors={errors?.districtId}
                        valueId="id"
                        optionlabel="districtName"
                        defaultValue=""
                        className="col-span-2"

                    ></FormSelectField>
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="city"
                        showAddButton
                        onImageClick={() => openModelCity({ open: true })}
                        readOnly={!districtId}
                        name="cityId"
                        options={City}
                        required
                        placeholder="select city"
                        errors={errors?.cityId}
                        valueId="id"
                        optionlabel="cityName"
                        defaultValue=""
                        className="col-span-2"

                    ></FormSelectField>
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="city Grade"
                        name="cityGradeId"
                        readOnly={!cityId}
                        options={CityGrade}
                        showAddButton
                        onImageClick={() => openModelCityGrade({ open: true })}
                        required
                        placeholder="select city Grade"
                        errors={errors?.cityGradeId}
                        valueId="id"
                        optionlabel="cityGradeName"
                        defaultValue=""
                        className="col-span-2"

                    ></FormSelectField>

                    <FormCheckBox
                        mode={mode}
                        control={control}
                        label={"Is Active"}
                        name="isActive"
                        errors={errors?.isActive}
                        defaultValue={false}
                        className={`${errors.Territories && "mb-6"} col-span-1`}
                    />
                </div>
            </div>
            <SubmitCancelButtons
                mode={mode}
                loading={proccessing}
                onSubmit={handleSubmit(submit)}
                onCancel={() => onSubmit(false)}
            />

            {
                <AddEditregionModel
                    open={openPopUpModelRegion.open}
                    onSubmit={onSubmitRegion}
                    onCancel={() => onSubmitRegion(false)}

                />
            }
            <AddEditStateModel
                open={openPopUpModelState.open}
                onSubmit={onSubmitState}
                onCancel={() => onSubmitState(false)}

            />
            <AddEditDepartMentModel
                open={openPopUpModelDistrict.open}
                onSubmit={onSubmitDistrict}
                onCancel={() => onSubmitDistrict(false)}

            />
            <AddEditCityModel
                open={openPopUpModelCity.open}
                onSubmit={onSubmitCity}
                onCancel={() => onSubmitCity(false)}

            />
            <AddEditCityGradeModel
                open={openPopUpModelCityGrade.open}
                onSubmit={onSubmitCityGrade}
                onCancel={() => onSubmitCityGrade(false)}

            />
        </PopUpModal >



    )
}



