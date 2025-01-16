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

import { AppTable, FormCheckBox, FormSelectField, FormUploadField, FormTextField, FormTextArea, ModalHeader, PopUpModal, SubmitCancelButtons, TableHeaderBox } from "elements";
import { CompanyService, FormModes, NotificationStatus, PaginationType } from "utility";
import { GetCompanyDetail, reactToaster } from "hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { GetCompanyTypeList, GetTerritories_State_Dist_City_Area_List_ById, GetCompanyList } from "hooks";

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const CompanySchema = yup.object().shape({
    companyName: yup.string().required('company Name is required'),
    companyTypeId: yup.string(),
    registrationNumber: yup.string(),
    contactNumber: yup.string(),
    email: yup.string().email("Email should be valid"),
    website: yup.string(),
    taxNumber: yup.string(),
    addressLine1: yup.string(),
    addressLine2: yup.string(),
    regionId: yup.string().nullable(),
    stateId: yup.string().nullable(),
    districtId: yup.string().nullable(),
    cityId: yup.string().nullable(),
    pincode: yup.string().nullable(),
    gstNumber: yup.string(),
    panNumber: yup.string().nullable(),
    logoImageOriginalFileName: yup.string().nullable(),
    logoImage_Base64: yup.string(),
    noofUserAdd: yup.string().nullable(),
    noofBranchAdd: yup.string().nullable(),
    isActive: yup.boolean(),
})

export function Company() {
    const { user } = useAuth()
    const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

    useEffect(() => {
        if (Number(user?.roleId) !== 1) {
            setPermission(getSinglePermission(user?.userRoleList, "ADMIN COMPANY"))
        }
    }, [user])

    const [openPopUpModel, setPopUpModel] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetCompanyList()
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
        { header: "COMPANY NAME	", field: "companyName" },
        { header: "CONTACT NO 	", field: "contactNumber" },
        { header: "EMAIL 	", field: "email" },
        { header: "DISTRICT 	", field: "districtName" },
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
                <AddEditCompanyModel
                    open={openPopUpModel.open}
                    data={openPopUpModel.data}
                    mode={openPopUpModel.mode}
                    onSubmit={onSubmit}
                />
            )}
        </>
    )
}

const AddEditCompanyModel = ({ mode, open, onSubmit, data }) => {
    const { data: detail } = GetCompanyDetail(data.id)
    const [proccessing, setProcessing] = useState('');
    const { options: CompanyTypeList } = GetCompanyTypeList(PaginationType.all, true)
    const { regionList,
        stateList,
        districtList,
        cityList,
        statefilterChanged,
        districtfilterChanged,
        cityfilterChanged,
        regionfilterChanged } = GetTerritories_State_Dist_City_Area_List_ById(PaginationType.all)
    console.log("🚀 ~ file: Company.jsx:150 ~ AddEditCompanyModel ~ cityList:", cityList)
    console.log("🚀 ~ file: Company.jsx:150 ~ AddEditCompanyModel ~ districtList:", districtList)
    console.log("🚀 ~ file: Company.jsx:150 ~ AddEditCompanyModel ~ stateList:", stateList)
    console.log("🚀 ~ file: Company.jsx:150 ~ AddEditCompanyModel ~ regionList:", regionList)

    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(CompanySchema),
    })

    console.log("🚀 ~ file: Company.jsx:146 ~ AddEditCompanyModel ~ errors:", errors)
    const regionId = watch("regionId")
    const stateId = watch("stateId")
    const districtId = watch("districtId")
    const companyLogoImageURL = watch("companyLogoImageURL")
    console.log("🚀 ~ file: Company.jsx:154 ~ AddEditCompanyModel ~ companyLogoImageURL:", companyLogoImageURL)
    useEffect(() => {
        if (regionId) {
            regionfilterChanged({ regionId: Number(regionId) })

        }
    }, [regionId])
    useEffect(() => {
        if (regionId && stateId) {
            statefilterChanged({ regionId: Number(regionId), stateId: Number(stateId) })
            // setValue("districtId", 0, { shouldValidate: true, shouldDirty: true });
            // setValue("cityId", 0, { shouldValidate: true, shouldDirty: true });
        }
    }, [stateId, regionId])
    useEffect(() => {
        if (regionId && regionId && districtId) {
            districtfilterChanged({ regionId: Number(regionId), stateId: Number(stateId), districtId: Number(districtId) })
            // setValue("cityId", 0, { shouldValidate: true, shouldDirty: true });
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
                companyName: "",
                companyTypeId: 0,
                registrationNumber: "",
                contactNumber: "",
                email: "",
                website: "",
                taxNumber: "",
                addressLine1: "",
                addressLine2: "",
                regionId: null,
                stateId: null,
                districtId: null,
                cityId: null,
                pincode: null,
                gstNumber: "",
                panNumber: "",
                logoImageOriginalFileName: "",
                logoImage_Base64: "",
                noofUserAdd: null,
                noofBranchAdd: null,
                isActive: true
            })
        }
    }, [detail, mode, open])

    const submit = async (formData) => {
        try {
            setProcessing("proccessing")
            const result = await CompanyService.add(formData)
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
            <ModalHeader mode={mode} title="Company" />
            <div className=" max-h-[65vh] overflow-y-auto p-4 w-[65vw]  ">
                <div className="grid grid-cols-2 gap-2  gap-x-4 gap-y-3 md:grid-cols-3 max-h-[100vh] overflow-y-auto  ">                    <div>
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="company Name"
                        name="companyName"
                        required
                        placeholder="enter company Name"
                        errors={errors?.companyName}
                        defaultValue=""
                        className="col-span-2"
                    />
                </div>
                    <div>
                        <FormSelectField
                            mode={mode}
                            control={control}
                            label="COMPANY TYPE"
                            name="companyTypeId"
                            options={CompanyTypeList}
                            placeholder="select COMPANY"
                            errors={errors?.companyTypeId}
                            defaultValue=""
                            className="col-span-2"
                        ></FormSelectField>
                    </div>
                    <div>
                        <FormTextField
                            mode={mode}
                            control={control}
                            label="REGISTRATION NUMBER"
                            name="registrationNumber"
                            placeholder="enter REGISTRATION NUMBER"
                            errors={errors?.registrationNumber}
                            defaultValue=""
                            className="col-span-2"
                        />
                    </div>
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="CONTACT NUMBER"
                        name="contactNumber"
                        maxLength={10}
                        type="number"
                        placeholder="enter CONTACT NUMBER"
                        errors={errors?.contactNumber}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="EMAIL"
                        name="email"
                        placeholder="enter email"
                        errors={errors?.email}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="WEBSITE"
                        name="website"
                        placeholder="enter WEBSITE"
                        errors={errors?.website}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="GST NUMBER"
                        name="gstNumber"
                        placeholder="enter GST NUMBER"
                        errors={errors?.gstNumber}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="PAN NUMBER"
                        name="panNumber"
                        placeholder="enter PAN NUMBER"
                        errors={errors?.panNumber}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="TAX NUMBER / CIN"
                        name="taxNumber"
                        placeholder="enter TAX NUMBER / CIN"
                        errors={errors?.taxNumber}
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
                        placeholder="enter no of User"
                        errors={errors?.noofUserAdd}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="no of Branch Add"
                        name="noofBranchAdd"
                        type="number"
                        placeholder="enter NO of Branch"
                        errors={errors?.noofBranchAdd}
                        defaultValue=""
                        className="col-span-2"
                    />
                    <div className="">
                        <FormUploadField
                            mode={mode}
                            setValue={setValue}
                            label="Image"
                            base64Name="logoImage_Base64"
                            urlName="companyLogoImageURL"
                            orignalFileName="logoImageOriginalFileName"
                            url={companyLogoImageURL}
                            className="col-span-2"
                        />
                    </div>

                </div>
                <div className="mt-3">
                    <FormCheckBox
                        mode={mode}
                        control={control}
                        label={"Is Active"}
                        name="isActive"
                        errors={errors?.isActive}
                        defaultValue={false}
                        className={`${errors.Company && "mb-6"} col-span-1`}
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
