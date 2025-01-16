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
import { AppTable, FormCheckBox, FormTextField, ModalHeader, PopUpModal, SubmitCancelButtons, TableHeaderBox } from "elements";
import { DistrictService, FormModes, NotificationStatus } from "utility";
import { GetDistrictDetail, reactToaster } from "hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { GetDistrictList } from "hooks";

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const DistrictSchema = yup.object().shape({
    districtName: yup.string().required('District is required'),
    isActive: yup.boolean(),
})

export function District() {
    const { user } = useAuth()
    const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

    useEffect(() => {
        if (Number(user?.roleId) !== 1) {
            setPermission(getSinglePermission(user?.userRoleList, "ADMIN ATTRIBUTES"))
        }
    }, [user])

    const [openPopUpModel, setPopUpModel] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetDistrictList()
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
        { header: "district Name", field: "districtName" },
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
                <AddEditDepartMentModel
                    open={openPopUpModel.open}
                    data={openPopUpModel.data}
                    mode={openPopUpModel.mode}
                    onSubmit={onSubmit}
                />
            )}
        </>
    )
}

const AddEditDepartMentModel = ({ mode, open, onSubmit, data }) => {
    const { data: detail } = GetDistrictDetail(data?.id)
    const [proccessing, setProcessing] = useState('');
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(DistrictSchema),
    })
    useEffect(() => {
        if ([FormModes.Edit, FormModes.View].includes(mode)) {
            reset({
                ...detail
            })
        } else {
            reset({
                id: 0,
                districtName: "",
                isActive: true,
            })
        }
    }, [detail, mode, open])

    const submit = async (formData) => {
        try {
            setProcessing("proccessing")
            const result = await DistrictService.add(formData)
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
            <ModalHeader mode={mode} title="District" />
            <div className=" max-h-[65vh] overflow-y-auto p-4 w-[30vw]  ">
                <div className="grid grid-cols-2 gap-2  gap-x-4 gap-y-3 md:grid-cols-2 max-h-[100vh] overflow-y-auto  ">                     <FormTextField
                    mode={mode}
                    control={control}
                    label="District"
                    required
                    name="districtName"
                    placeholder="District"
                    errors={errors?.districtName}
                    defaultValue=""
                    className="col-span-2"
                />
                    <FormCheckBox
                        mode={mode}
                        control={control}
                        label={"Is Active"}
                        name="isActive"
                        errors={errors?.isActive}
                        defaultValue={false}
                        className={`${errors.District && "mb-6"} col-span-1`}
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
export { AddEditDepartMentModel };