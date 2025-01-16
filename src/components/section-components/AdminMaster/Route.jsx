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
import { RouteService, FormModes, NotificationStatus } from "utility";
import { GetRouteDetail, reactToaster } from "hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { GetRouteList } from "hooks";

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const RouteSchema = yup.object().shape({
    routeName: yup.string().required('Route is required'),
    isActive: yup.boolean(),
})

export function Route() {
    const { user } = useAuth()
    const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

    useEffect(() => {
        if (Number(user?.roleId) !== 1) {
            setPermission(getSinglePermission(user?.userRoleList, "ADMIN ROUTE"))
        }
    }, [user])

    const [openPopUpModel, setPopUpModel] = useState({
        open: false,
        data: {},
        mode: ""
    })
    const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetRouteList()
    const openModel = (mode, data) => {
        setPopUpModel({
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
        { header: "Route ", field: "routeName" },
        { header: "Status", field: "isActive", status: true },
        { header: "Created Date", field: "createdDate", render: (data) => <>{dayjs(data).format("DD-MM-YYYY")}</> },
        { header: "Created By", field: "creatorName" },
        {
            header: "Action",
            action: true,
            onEdit: Permission.edit ? (data) => openModel(FormModes.Edit, data) : null,
            onView: (data) => openModel(FormModes.View, data)
        },
    ];

    return (
        <>
            <TableHeaderBox
                showSearch
                onSearch={(val) => { filterChanged({ searchText: val }) }}
                left={
                    <CustomButton1
                        label={"Add"}
                        icon={<IoMdAdd />}
                        className="bg-prp-color text-white  shrink grow md:grow-0 max-w-[50%]"
                        onClick={() => openModel(FormModes.Add)}
                    />
                }
            >
            </TableHeaderBox>
            <AppTable
                columns={columns}
                data={data}
                loading={loading}
                pageNo={filter.pageNo}
                pageSize={filter.pageSize}
                totalCount={totalCount}
                pageChanged={pageChanged}
            />
            <AddEditRouteModel
                open={openPopUpModel.open}
                data={openPopUpModel.data}
                mode={openPopUpModel.mode}
                onSubmit={onSubmit}
            />
        </>
    )
}

const AddEditRouteModel = ({ mode, open, onSubmit, data }) => {
    const { data: detail } = GetRouteDetail(data.id)
    const [proccessing, setProcessing] = useState('');
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RouteSchema),
    })
    useEffect(() => {
        if ([FormModes.Edit, FormModes.View].includes(mode)) {
            reset({
                ...detail
            })
        } else {
            reset({
                id: 0,
                routeName: "",
                isActive: true,
            })
        }
    }, [detail, mode, open])

    const submit = async (formData) => {
        try {
            setProcessing("proccessing")
            const result = await RouteService.add(formData)
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
            <ModalHeader mode={mode} title="Route " />
            <div className=" max-h-[65vh] overflow-y-auto p-4 w-[30vw]  ">
                <div className="grid grid-cols-2 gap-2  gap-x-4 gap-y-3 md:grid-cols-2 max-h-[100vh] overflow-y-auto  ">                     <FormTextField
                    mode={mode}
                    control={control}
                    label="Route "
                    required
                    name="routeName"
                    placeholder="Route "
                    errors={errors?.routeName}
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
                        className={`${errors.Route && "mb-6"} col-span-1`}
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