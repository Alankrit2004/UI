// // CORE
// import * as React from "react";
// import { useState } from "react";

// // COMPONENTS
// import { CustomButton1 } from "components";

// // ICONS
// import { IoMdAdd } from "react-icons/io";

// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'
// import { AppTable, FormCheckBox, FormTextField, ModalHeader, PopUpModal, SubmitCancelButtons, TableHeaderBox } from "elements";
// import { BloodGroupService, FormModes, NotificationStatus } from "utility";
// import { GetBloodGroupDetail, reactToaster } from "hooks";
// import { useEffect } from "react";
// import dayjs from "dayjs";
// import { GetBloodGroupList } from "hooks";

// import { getSinglePermission } from "helpers";
// import { useAuth } from "context";

// const BloodGroupSchema = yup.object().shape({
//     bloodGroup: yup.string().required('BloodGroup is required'),
//     isActive: yup.boolean(),
// })

// export function BloodGroup() {
//     const { user } = useAuth()
//     const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

//     useEffect(() => {
//         if (Number(user?.roleId) !== 1) {
//             setPermission(getSinglePermission(user?.userRoleList, "ADMIN BLOOD GROUP"))
//         }
//     }, [user])

//     const [openPopUpModel, setPopUpModel] = useState({
//         open: false,
//         data: {},
//         mode: ""
//     })
//     const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetBloodGroupList()
//     const openModel = (mode, data) => {
//         setPopUpModel({
//             ...openModel,
//             open: true,
//             mode: mode || FormModes.Add,
//             data: data || {}
//         })
//     }

//     const onSubmit = (data) => {
//         setPopUpModel({
//             mode: "",
//             open: false,
//             data: {}
//         })
//         if (data) {
//             refresh()
//         }
//     }

//     const columns = [
//         { header: "S.No.", field: "", index: true },
//         { header: "Blood Group", field: "bloodGroup" },
//         { header: "Status", field: "isActive", status: true },
//         { header: "Created Date", field: "createdDate", render: (data) => <>{dayjs(data).format("DD-MM-YYYY")}</> },
//         { header: "Created By", field: "creatorName" },
//         {
//             header: "Action",
//             action: true,
//             onEdit: Permission.edit ? (data) => openModel(FormModes.Edit, data) : null,
//             // onEdit: (data) => openModel(FormModes.Edit, data),
//             onView: (data) => openModel(FormModes.View, data)
//         },
//     ];

//     return (
//         <>
//             <TableHeaderBox
//                 showSearch
//                 onSearch={(val) => { filterChanged({ searchText: val }) }}
//                 left={
//                     Permission.add && (
//                         <CustomButton1
//                             label={"Add"}
//                             icon={<IoMdAdd />}
//                             className="bg-prp-color text-white  shrink grow md:grow-0 max-w-[50%]"
//                             onClick={() => openModel(FormModes.Add)}
//                         />
//                     )
//                 }
//             >
//             </TableHeaderBox>
//             {Permission?.view && (
//                 <AppTable
//                     columns={columns}
//                     data={data}
//                     loading={loading}
//                     pageNo={filter.pageNo}
//                     pageSize={filter.pageSize}
//                     totalCount={totalCount}
//                     pageChanged={pageChanged}
//                 />
//             )}
//             {(Permission.add || Permission.edit || Permission.view) && (
//                 <AddEditBloodGroupModel
//                     open={openPopUpModel.open}
//                     data={openPopUpModel.data}
//                     mode={openPopUpModel.mode}
//                     onSubmit={onSubmit}
//                 />
//             )}
//         </>
//     )
// }

// const AddEditBloodGroupModel = ({ mode, open, onSubmit, data }) => {
//     const { data: detail } = GetBloodGroupDetail(data.id)
//     const [proccessing, setProcessing] = useState('');
//     const {
//         control,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm({
//         resolver: yupResolver(BloodGroupSchema),
//     })
//     useEffect(() => {
//         if ([FormModes.Edit, FormModes.View].includes(mode)) {
//             reset({
//                 ...detail
//             })
//         } else {
//             reset({
//                 id: 0,
//                 bloodGroup: "",
//                 isActive: true,
//             })
//         }
//     }, [detail, mode, open])

//     const submit = async (formData) => {
//         try {
//             setProcessing("proccessing")
//             const result = await BloodGroupService.add(formData)
//             reactToaster(result.message, NotificationStatus.success)
//             onSubmit(result)
//         } catch {
//             reactToaster(NotificationStatus.error)
//         } finally {
//             setProcessing('')
//         }
//     }

//     return (
//         <PopUpModal open={open}>
//             <ModalHeader mode={mode} title="Blood Group " />
//             <div className=" max-h-[65vh] overflow-y-auto p-4 w-[30vw]  ">
//                 <div className="grid grid-cols-2 gap-2  gap-x-4 gap-y-3 md:grid-cols-2 max-h-[100vh] overflow-y-auto  ">                     <FormTextField
//                     mode={mode}
//                     control={control}
//                     label="Blood Group "
//                     name="bloodGroup"
//                     placeholder="Blood Group "
//                     required
//                     errors={errors?.bloodGroup}
//                     defaultValue=""
//                     className="col-span-2"
//                 />
//                     <FormCheckBox
//                         mode={mode}
//                         control={control}
//                         label={"Is Active"}
//                         name="isActive"
//                         errors={errors?.isActive}
//                         defaultValue={false}
//                         className={`${errors.BloodGroup && "mb-6"} col-span-1`}
//                     />
//                 </div>
//             </div>
//             <SubmitCancelButtons
//                 mode={mode}
//                 loading={proccessing}
//                 onSubmit={handleSubmit(submit)}
//                 onCancel={() => onSubmit(false)}
//             />
//         </PopUpModal>
//     )
// }

import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from "dayjs";
import { IoMdAdd } from "react-icons/io";
import { CustomButton1 } from "components";
import { AppTable, FormCheckBox, FormTextField, ModalHeader, PopUpModal, SubmitCancelButtons, TableHeaderBox } from "elements";
import { BloodGroupService, FormModes, NotificationStatus } from "utility";
import { GetBloodGroupDetail, GetBloodGroupList, reactToaster } from "hooks";
import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const BloodGroupSchema = yup.object().shape({
    bloodGroup: yup.string().required('BloodGroup is required'),
    isActive: yup.boolean(),
});

export function BloodGroup() {
    const { user } = useAuth();
    const [mounted, setMounted] = useState(true);
    const [Permission, setPermission] = useState({ 
        add: false, 
        view: false, 
        edit: false 
    });

    const [openPopUpModel, setPopUpModel] = useState({
        open: false,
        data: {},
        mode: ""
    });

    const { 
        data = [], 
        loading: dataLoading, 
        refresh, 
        filter, 
        totalCount = 0, 
        pageChanged, 
        filterChanged 
    } = GetBloodGroupList();
    useEffect(() => {
        if (Number(user?.roleId) !== 1) {
            const perms = getSinglePermission(user?.userRoleList, "ADMIN BLOOD GROUP");
            if (perms) {
                setPermission(perms);
            }
        }
    }, [user]);

    const openModel = (mode, data) => {
        setPopUpModel({
            open: true,
            mode: mode || FormModes.Add,
            data: data || {}
        });
    };

    const columns = [
        { header: "S.No.", field: "", index: true },
        { header: "Blood Group", field: "bloodGroup" },
        { header: "Status", field: "isActive", status: true },
        { 
            header: "Created Date", 
            field: "createdDate",
            render: (data) => dayjs(data).format("DD-MM-YYYY")
        },
        { header: "Created By", field: "creatorName" },
        {
            header: "Action",
            action: true,
            onEdit: Permission.edit ? (data) => openModel(FormModes.Edit, data) : null,
            onView: (data) => openModel(FormModes.View, data)
        }
    ];

    const onSubmit = (data) => {
        setPopUpModel({
            mode: "",
            open: false,
            data: {}
        });
        if (data) refresh();
    };

    if (!mounted) return null;

    return (
        <div className="flex flex-col gap-4">
            <TableHeaderBox
                showSearch
                onSearch={(val) => filterChanged({ searchText: val })}
                left={
                    
                        <CustomButton1
                            label={"Add"}
                            icon={<IoMdAdd />}
                            className="bg-prp-color text-white shrink grow md:grow-0 max-w-[50%]"
                            onClick={() => openModel(FormModes.Add)}
                        />
                    
                    
                }
            />
            
            
                <AppTable
                    columns={columns}
                    data={data}
                    loading={dataLoading}
                    pageNo={filter.pageNo}
                    pageSize={filter.pageSize}
                    totalCount={totalCount}
                    pageChanged={pageChanged}
                />
            

            {openPopUpModel.open && (
                <AddEditBloodGroupModel
                    open={openPopUpModel.open}
                    data={openPopUpModel.data}
                    mode={openPopUpModel.mode}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
}

const AddEditBloodGroupModel = ({ mode, open, onSubmit, data }) => {
    const { data: detail } = GetBloodGroupDetail(data.id);
    const [processing, setProcessing] = useState(false);
    
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(BloodGroupSchema),
    });

    useEffect(() => {
        if ([FormModes.Edit, FormModes.View].includes(mode)) {
            reset({
                ...detail
            });
        } else {
            reset({
                id: 0,
                bloodGroup: "",
                isActive: true,
            });
        }
    }, [detail, mode, open, reset]);

    const submit = async (formData) => {
        try {
            setProcessing(true);
            const result = await BloodGroupService.add(formData);
            reactToaster(result.message, NotificationStatus.success);
            onSubmit(result);
        } catch (error) {
            reactToaster(error.message, NotificationStatus.error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <PopUpModal open={open}>
            <ModalHeader mode={mode} title="Blood Group" />
            <div className="max-h-[65vh] overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormTextField
                        mode={mode}
                        control={control}
                        label="Blood Group"
                        name="bloodGroup"
                        placeholder="Blood Group"
                        errors={errors?.bloodGroup}
                        required
                        className="col-span-2"
                    />
                    <FormCheckBox
                        mode={mode}
                        control={control}
                        label="Is Active"
                        name="isActive"
                        errors={errors?.isActive}
                        className="col-span-1"
                    />
                </div>
            </div>
            <SubmitCancelButtons
                mode={mode}
                loading={processing}
                onSubmit={handleSubmit(submit)}
                onCancel={() => onSubmit(false)}
            />
        </PopUpModal>
    );
};