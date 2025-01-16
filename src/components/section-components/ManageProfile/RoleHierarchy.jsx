// CORE
import * as React from "react";
import { useState, useMemo } from "react";

// COMPONENTS
import { CustomButton1 } from "components";

// ICONS
import { IoMdAdd } from "react-icons/io";

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AppTable, FormCheckBox, FormSelectField, ModalHeader, PopUpModal, SubmitCancelButtons, TableHeaderBox } from "elements";
import { RoleHierarchyService, FormModes, NotificationStatus, PaginationType } from "utility";
import { GetRoleHierarchyDetail, reactToaster, GetRoleList } from "hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { GetRoleHierarchyList } from "hooks";

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const RoleHierarchySchema = yup.object().shape({
    roleId: yup.string().required('Role is required'),
    reportingTo: yup.string().required('ROLE HIERARCHY  is required'),
    isActive: yup.boolean(),
})

export function RoleHierarchy() {
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
    const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetRoleHierarchyList()

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
        { header: "role Name", field: "roleName" },
        { header: "ROLE HIERARCHY", field: "reportingToName" },
        { header: "Status", field: "isActive", status: true },
        { header: "Created Date", field: "createdDate", render: (data) => <>{dayjs(data).format("DD-MM-YYYY")}</> },
        { header: "Created By", field: "creatorName" },
        {
            header: "Action",
            action: true,
            onEdit: Permission.edit ? (data) => openModel(FormModes.Edit, data) : null,
            // onEdit: (data) => openModel(FormModes.Edit, data),
            onView: (data) => openModel(FormModes.View, data),
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
            )
            }
            {(Permission.add || Permission.edit || Permission.view) && (
                <AddEditRoleHierarchyModel
                    open={openPopUpModel.open}
                    data={openPopUpModel.data}
                    mode={openPopUpModel.mode}
                    onSubmit={onSubmit}
                />
            )}
        </>
    )
}

const AddEditRoleHierarchyModel = ({ mode, open, onSubmit, data }) => {
    const { data: detail } = GetRoleHierarchyDetail(data.id)
    const { options: Rolelist } = GetRoleList(PaginationType.all, true)
    const { data: reportingToList } = GetRoleHierarchyList(PaginationType.all)
    const rolesList = useMemo(() => Rolelist.filter(val => !reportingToList.some(ele => ele.roleId === val.value)))
    const roleEditItemData = {
        label: detail?.roleName,
        value: detail?.roleId
    }
    const updatedRolesList = useMemo(() => {
        const rolesWithEditItem = [...rolesList];
        rolesWithEditItem.push(roleEditItemData);
        return rolesWithEditItem;
    }, [rolesList, roleEditItemData]);
    const [proccessing, setProcessing] = useState('');
    const {
        control,
        handleSubmit,
        reset, watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RoleHierarchySchema),
    })
    const role = watch("roleId")
    console.log("🚀 ~ file: RoleHierarchy.jsx:127 ~ AddEditRoleHierarchyModel ~ role:", role)
    useEffect(() => {
        if ([FormModes.Edit, FormModes.View].includes(mode)) {
            reset({
                ...detail
            })
        } else {
            reset({
                roleId: null,
                reportingTo: null,
                isActive: true,
            })
        }
    }, [detail, mode, open])

    const submit = async (formData) => {
        try {
            setProcessing("proccessing")
            const result = await RoleHierarchyService.add(formData)
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
            <ModalHeader mode={mode} title="RoleHierarchy" />
            <div className=" overflow-y-auto p-4 w-[65vw]  ">
                <div className="grid grid-cols-2 gap-2  gap-x-4 gap-y-3 md:grid-cols-2  overflow-y-auto  ">

                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="Role"
                        required
                        name="roleId"
                        options={mode === "Edit" ? updatedRolesList : rolesList}
                        placeholder="select role"
                        errors={errors?.roleId}
                        valueId="id"
                        optionlabel="roleName"
                        defaultValue=""
                        className="col-span-2"
                    ></FormSelectField>
                    <FormSelectField
                        mode={mode}
                        control={control}
                        label="ROLE HIERARCHY"
                        name="reportingTo"
                        required
                        readOnly={!role}
                        options={Rolelist}
                        placeholder="select ROLE HIERARCHY"
                        errors={errors?.reportingTo}
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
                        className={`${errors.RoleHierarchy && "mb-6"} col-span-1`}
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