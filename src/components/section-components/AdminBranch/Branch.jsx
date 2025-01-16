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
import { useAuth } from "context";
import { AppTable, FormCheckBox, FormSelectField, FormUploadField, FormTextField, FormTextArea, ModalHeader, PopUpModal, SubmitCancelButtons, TableHeaderBox } from "elements";
import { BranchService, FormModes, NotificationStatus, PaginationType } from "utility";
import { GetBranchDetail, reactToaster } from "hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { GetCompanyList, GetTerritories_State_Dist_City_Area_List_ById, GetBranchList } from "hooks";

import { getSinglePermission } from "helpers";
// import { useAuth } from "context";

const BranchSchema = yup.object().shape({
    branchName: yup.string().required('Branch Name is required'),
    companyId: yup.string(),
    registrationNumber: yup.string(),
    mobileNo: yup.string().test(
        "len",
        "Mobile Number length should be 10",
        (val) => val == null || val.length === 10 || val == ""
    ),
    emailId: yup.string().email("Email should be valid"),
    departmentHead: yup.string(),
    addressLine1: yup.string(),
    addressLine2: yup.string(),
    regionId: yup.string().nullable(),
    stateId: yup.string().nullable(),
    districtId: yup.string().nullable(),
    cityId: yup.string().nullable(),
    pincode: yup.string().nullable(),
    noofUserAdd: yup.string().nullable(),
    isActive: yup.boolean(),
})

export function Branch() {

    const { user } = useAuth()
    const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

    useEffect(() => {
        if (Number(user?.roleId) !== 1) {
            setPermission(getSinglePermission(user?.userRoleList, "ADMIN BRANCH"))
        }
    }, [user])

    const [openPopUpModel, setPopUpModel] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetBranchList()
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
        {
            header: "Action",
            action: true,
            onEdit: Permission.edit ? (data) => openModel(FormModes.Edit, data) : null,
            // onEdit: (data) => openModel(FormModes.Edit, data),
            onView: (data) => openModel(FormModes.View, data)
        },
        { header: "Branch NAME	", field: "branchName" },
        { header: "MOBILE#", field: "mobileNo" },
        { header: "email 	", field: "emailId" },
        { header: "Status", field: "isActive", status: true },
        { header: "Created Date", field: "createdDate", render: (data) => <>{dayjs(data).format("DD-MM-YYYY")}</> },
        { header: "Created By", field: "creatorName" },
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
                <AddEditBranchModel
                    open={openPopUpModel.open}
                    data={openPopUpModel.data}
                    mode={openPopUpModel.mode}
                    onSubmit={onSubmit}
                />
            )}
        </>
    )
}

const AddEditBranchModel = ({ mode, open, onSubmit, data }) => {
    const { user } = useAuth()
    console.log("🚀 ~ file: Branch.jsx:121 ~ AddEditBranchModel ~ user:", user)
    const { data: detail } = GetBranchDetail(data.id)
    const [proccessing, setProcessing] = useState('');
    const { regionList,
        stateList,
        districtList,
        cityList,
        statefilterChanged,
        districtfilterChanged,
        regionfilterChanged } = GetTerritories_State_Dist_City_Area_List_ById(PaginationType.all)
    const { options: CompanyList } = GetCompanyList(PaginationType.all, true)
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(BranchSchema),
    })

    const regionId = watch("regionId")
    const stateId = watch("stateId")
    const districtId = watch("districtId")
    const mobileNo = watch("mobileNo")
    console.log("🚀 ~ file: Branch.jsx:145 ~ AddEditBranchModel ~ mobileNo:", mobileNo)
    useEffect(() => {
        if (regionId) {
            regionfilterChanged({ regionId: Number(regionId) })
        }
    }, [regionId])
    useEffect(() => {
        if (regionId && stateId) {
            statefilterChanged({ regionId: Number(regionId), stateId: Number(stateId) })
        }
    }, [stateId, regionId])
    useEffect(() => {
        if (regionId && regionId && districtId) {
            districtfilterChanged({ regionId: Number(regionId), stateId: Number(stateId), districtId: Number(districtId) })
        }
    }, [districtId, regionId, stateId])

    useEffect(() => {
        if ([FormModes.Edit, FormModes.View].includes(mode)) {
            reset({
                ...detail
            })
        } else {
            reset({
                id: 0,
                branchName: "",
                companyId: 0,
                registrationNumber: "",
                mobileNo: "",
                emailId: "",
                departmentHead: "",
                addressLine1: "",
                addressLine2: "",
                regionId: null,
                stateId: null,
                districtId: null,
                cityId: null,
                pincode: null,
                noofUserAdd: null,
                isActive: true
            })
        }
    }, [detail, mode, open])

    // const submit = async (formData) => {
    //     try {
    //         setProcessing("proccessing")
    //         const result = await BranchService.add(formData)
    //         reactToaster(result.message, NotificationStatus.success)
    //         onSubmit(result)
    //     } catch {
    //         reactToaster(NotificationStatus.error)
    //     } finally {
    //         setProcessing('')
    //     }
    // }

    const submit = async (formData) => {
        try {
            setProcessing("processing");
            const result = await BranchService.add(formData);
            if (result.isSuccess) {
                reactToaster(result.message, NotificationStatus.success)
                onSubmit(result);
            } else {
                reactToaster(result.message, 'error'); // Use 'error' for error mode
            }
        } catch {
            reactToaster("An unexpected error occurred", 'error'); // Use 'error' for error mode
        } finally {
            setProcessing('');
        }
    };


    return (
        <PopUpModal open={open}>
            <ModalHeader mode={mode} title="Branch" />
            <div className=" max-h-[65vh] overflow-y-auto p-4 w-[65vw]  ">
                <div className="grid grid-cols-2 gap-2  gap-x-4 gap-y-3 md:grid-cols-3 max-h-[100vh] overflow-y-auto  ">                    <div>
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="Branch Name"
                        name="branchName"
                        required
                        placeholder="enter Branch Name"
                        errors={errors?.branchName}
                        defaultValue=""
                        className="col-span-2"
                    />
                </div>
                    <div>
                        <FormSelectField
                            mode={mode}
                            control={control}
                            label="COMPANY"
                            name="companyId"
                            options={CompanyList}
                            placeholder="select COMPANY"
                            errors={errors?.companyId}
                            defaultValue=""
                            className="col-span-2"
                        ></FormSelectField>
                    </div>
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="mobile#"
                        name="mobileNo"
                        maxLength={10}
                        type="number"
                        placeholder="enter mobile#"
                        errors={errors?.mobileNo}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="email"
                        name="emailId"
                        placeholder="enter email"
                        errors={errors?.emailId}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="department Head"
                        name="departmentHead"
                        placeholder="enter departmentHead"
                        errors={errors?.departmentHead}
                        defaultValue=""
                        className="col-span-2"
                    />

                    <FormTextArea
                        control={control}
                        label="address"
                        type="textarea"
                        name="addressLine1"
                        placeholder="enter address"
                        errors={errors?.addressLine1}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="region"
                        name="regionId"
                        options={regionList}
                        handelOnChenge={() => {
                            setValue("stateId", 0, { shouldValidate: true, shouldDirty: true });
                            setValue("districtId", 0, { shouldValidate: true, shouldDirty: true });
                            setValue("cityId", 0, { shouldValidate: true, shouldDirty: true });
                        }}
                        placeholder="select region"
                        errors={errors?.regionId}
                        valueId="value"
                        optionlabel="text"
                        defaultValue=""
                        className="col-span-2"
                    ></FormSelectField>
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="state"
                        name="stateId"
                        readOnly={regionId === 0 || regionId === null}
                        options={stateList}
                        placeholder="select state"
                        handelOnChenge={() => {
                            setValue("districtId", 0, { shouldValidate: true, shouldDirty: true });
                            setValue("cityId", 0, { shouldValidate: true, shouldDirty: true });
                        }}
                        errors={errors?.stateId}
                        valueId="value"
                        optionlabel="text"
                        defaultValue=""
                        className="col-span-2"
                    ></FormSelectField>
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="district"
                        name="districtId"
                        options={districtList}
                        handelOnChenge={() => {
                            setValue("cityId", 0, { shouldValidate: true, shouldDirty: true });
                        }}
                        readOnly={stateId === 0 || stateId === null}
                        placeholder="select district"
                        errors={errors?.districtId}
                        valueId="value"
                        optionlabel="text"
                        defaultValue=""
                        className="col-span-2"
                    ></FormSelectField>
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="city"
                        name="cityId"
                        options={cityList}
                        readOnly={districtId === 0 || districtId === null}
                        placeholder="select city"
                        errors={errors?.cityId}
                        valueId="value"
                        optionlabel="text"
                        defaultValue=""
                        className="col-span-2"
                    ></FormSelectField>
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="PINCODE"
                        name="pincode"
                        maxLength={6}
                        type="number"
                        placeholder="enter PINCODE"
                        errors={errors?.pincode}
                        defaultValue=""
                        className="col-span-2"
                    />

                    <FormTextField
                        mode={mode}
                        control={control}
                        label="no of User Add"
                        name="noofUserAdd"
                        type="number"
                        placeholder="enter  No of User"
                        errors={errors?.noofUserAdd}
                        defaultValue=""
                        className="col-span-2"
                    />

                </div>
                <div className="mt-3">
                    <FormCheckBox
                        mode={mode}
                        control={control}
                        label={"Is Active"}
                        name="isActive"
                        errors={errors?.isActive}
                        defaultValue={false}
                        className={`${errors.Branch && "mb-6"} col-span-1`}
                    />
                </div>
            </div>
            <SubmitCancelButtons
                mode={mode}
                loading={proccessing}
                onSubmit={handleSubmit(submit)}
                onCancel={() => onSubmit(false)}
            />
        </PopUpModal >
    )
}
