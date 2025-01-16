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

import { AppTable, FormCheckBox, FormSelectField, FormTextField, ModalHeader, PopUpModal, SubmitCancelButtons, TableHeaderBox } from "elements";
import { RoleService, FormModes, NotificationStatus, PaginationType } from "utility";
import { GetRoleDetail, reactToaster, GetDepartmentList, GetEmployeeTypeList } from "hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { GetRoleList } from "hooks";
import { useNavigate } from "react-router-dom";
import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const RoleSchema = yup.object().shape({
    roleName: yup.string().required('Role is required'),
    departmentId: yup.string(),
    isActive: yup.boolean(),
})

export function RoleProfile() {
    const { user } = useAuth()
    const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

    useEffect(() => {
        if (Number(user?.roleId) !== 1) {
            setPermission(getSinglePermission(user?.userRoleList, "ADMIN PROFILE"))
        }
    }, [user])

    const [openPopUpModel, setPopUpModel] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetRoleList()

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
    const navigate = useNavigate();


    const columns = [
        { header: "S.No.", field: "", index: true },
        {
            header: "Action",
            action: true,
            onEdit: Permission.edit ? (data) => openModel(FormModes.Edit, data) : null,
            // onEdit: (data) => openModel(FormModes.Edit, data),
            onView: (data) => openModel(FormModes.View, data)
        },
        {
            header: "Manage Access",
            action: true,
            onNavigate: (data) => navigate(`role-permission/${data?.id}`, data)
        },
        { header: "role Name", field: "roleName" },
        { header: "department Name", field: "departmentName" },
        { header: "employee Type", field: "employeeLevel" },
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
            )
            }
            {(Permission.add || Permission.edit || Permission.view) && (
                <AddEditRoleModel
                    open={openPopUpModel.open}
                    data={openPopUpModel.data}
                    mode={openPopUpModel.mode}
                    onSubmit={onSubmit}
                />
            )}
        </>
    )
}

const AddEditRoleModel = ({ mode, open, onSubmit, data }) => {
    const { data: detail } = GetRoleDetail(data.id)
    const { options: department } = GetDepartmentList(PaginationType.all, true)
    const { options: EmployeeType } = GetEmployeeTypeList(PaginationType.all, true)
    console.log("🚀 ~ file: RoleProfile.jsx:108 ~ AddEditRoleModel ~ EmployeeType:", EmployeeType)
    console.log("🚀 ~ file: RoleProfile.jsx:103 ~ AddEditRoleModel ~ department:", department)
    const [proccessing, setProcessing] = useState('');
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RoleSchema),
    })
    useEffect(() => {
        if ([FormModes.Edit, FormModes.View].includes(mode)) {
            reset({
                ...detail
            })
        } else {
            reset({
                Role: "",
                isActive: true,
            })
        }
    }, [detail, mode, open])

    const submit = async (formData) => {
        try {
            setProcessing("proccessing")
            const result = await RoleService.add(formData)
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
            <ModalHeader mode={mode} title="Role" />
            <div className=" max-h-[65vh] overflow-y-auto p-4 w-[65vw]  ">
                <div className="grid grid-cols-2 gap-2  gap-x-4 gap-y-3 md:grid-cols-2 max-h-[100vh] overflow-y-auto  ">                     <FormTextField
                    mode={mode}
                    control={control}
                    label="Role"
                    name="roleName"
                    required
                    placeholder="Role"
                    errors={errors?.roleName}
                    defaultValue=""
                    className="col-span-2"
                />
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="department"
                        name="departmentId"
                        options={department}
                        placeholder="select department"
                        errors={errors?.departmentId}
                        valueId="id"
                        optionlabel="departmentName"
                        defaultValue=""
                        className="col-span-2"

                    ></FormSelectField>
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="Employee Type"
                        name="employeeLevelId"
                        options={EmployeeType}
                        placeholder="select Employee Type"
                        errors={errors?.employeeLevelId}
                        valueId="id"
                        optionlabel="employeeTypeName"
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
                        className={`${errors.Role && "mb-6"} col-span-1`}
                    />
                </div>
            </div>
            <SubmitCancelButtons
                mode={mode}
                loading={proccessing}
                onSubmit={handleSubmit(submit)}
                onCancel={() => onSubmit(false)}
            />
        </PopUpModal>
    )
}