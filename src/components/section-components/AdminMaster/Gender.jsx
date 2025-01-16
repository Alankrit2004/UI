// src/components/section-components/AdminMaster/Gender.jsx
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import dayjs from "dayjs";

// Components
import { CustomButton1 } from "components";
import { 
  AppTable, 
  FormCheckBox, 
  FormTextField, 
  ModalHeader, 
  PopUpModal, 
  SubmitCancelButtons, 
  TableHeaderBox 
} from "elements";

// Icons
import { IoMdAdd } from "react-icons/io";

// Services & Utils
import { GenderService, FormModes, NotificationStatus } from "utility";
import { GetGenderDetail, GetGenderList, reactToaster } from "hooks";
import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const GenderSchema = yup.object().shape({
    genderName: yup.string().required('Gender is required'),
    isActive: yup.boolean(),
})

export function Gender() {
    const { user } = useAuth()
    const [Permission, setPermission] = useState({ 
        add: true, 
        view: true, 
        edit: true 
    })

    useEffect(() => {
        if (Number(user?.roleId) !== 1) {
            setPermission(getSinglePermission(user?.userRoleList, "ADMIN GENDER"))
        }
    }, [user])

    const [openPopUpModel, setPopUpModel] = useState({
        open: false,
        data: {},
        mode: ""
    })

    const { 
        data, 
        loading, 
        refresh, 
        filter, 
        totalCount, 
        pageChanged, 
        filterChanged 
    } = GetGenderList()

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
        { header: "Gender ", field: "genderName" },
        { header: "Status", field: "isActive", status: true },
        { 
            header: "Created Date", 
            field: "createdDate", 
            render: (data) => <>{dayjs(data).format("DD-MM-YYYY")}</> 
        },
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
                    Permission.add && (
                        <CustomButton1
                            label={"Add"}
                            icon={<IoMdAdd />}
                            className="bg-prp-color text-white shrink grow md:grow-0 max-w-[50%]"
                            onClick={() => openModel(FormModes.Add)}
                        />
                    )
                }
            />
            
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
                <AddEditGenderModel
                    open={openPopUpModel.open}
                    data={openPopUpModel.data}
                    mode={openPopUpModel.mode}
                    onSubmit={onSubmit}
                />
            )}
        </>
    )
}

const AddEditGenderModel = ({ mode, open, onSubmit, data }) => {
    const { data: detail } = GetGenderDetail(data.id)
    const [proccessing, setProcessing] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(GenderSchema),
    })

    useEffect(() => {
        if ([FormModes.Edit, FormModes.View].includes(mode)) {
            reset({
                ...detail
            })
        } else {
            reset({
                id: 0,
                genderName: "",
                isActive: true,
            })
        }
    }, [detail, mode, open, reset])

    const submit = async (formData) => {
        try {
            setProcessing(true)
            const result = await GenderService.add(formData)
            reactToaster(result.message, NotificationStatus.success)
            onSubmit(result)
        } catch (error) {
            reactToaster(NotificationStatus.error)
        } finally {
            setProcessing(false)
        }
    }

    return (
        <PopUpModal open={open}>
            <ModalHeader mode={mode} title="Gender" />
            <div className="max-h-[65vh] overflow-y-auto p-4 w-[30vw]">
                <div className="grid grid-cols-2 gap-2 gap-x-4 gap-y-3 md:grid-cols-2 max-h-[100vh] overflow-y-auto">
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="Gender"
                        name="genderName"
                        placeholder="Gender"
                        errors={errors?.genderName}
                        required
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
                        className={`${errors.Gender && "mb-6"} col-span-1`}
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