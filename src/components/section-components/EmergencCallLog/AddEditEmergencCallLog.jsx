import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Components and Helpers
import { FormTextField, FormSelectField, FormCheckBox, FormTextArea, SubmitCancelButtons, AppTable, TableHeaderBox } from 'elements';
import { PopUpModal, ModalHeader } from 'elements';
import { IoMdAdd } from 'react-icons/io';
import { CustomButton1 } from 'components/general-components';
import { GetEmergencyClosureList, GetVerifiedList, GetEmergencyTypeList, GetMaterialStatusList, GetUserList, GetEmergencyCallLogDetail, GetEmergencyCallLogList, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { formatDateTime } from 'helpers/dateHelper';
import { EmergencyCallLogService, FormModes, NotificationStatus, PaginationType } from "utility";

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const FaultSchema = yup.object().shape({
  shiftId: yup.string(),
  dateAndTime: yup.string().required('date And Time is required'),
  reportedBy: yup.string().required('reported By is required'),
  receivedById: yup.string().required('received By is required'),
  callDetails: yup.string().required('call Details is required'),
  emergencyTypeId: yup.string(),
  emergencyDesc: yup.string(),
  emergencyClosureId: yup.string(),
  actionToken: yup.string(),
});

export function AddEditEmergencCallLog() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "EMERGENCY CALL LOG"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetEmergencyCallLogList()
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
      onView: (data) => openModel(FormModes.View, data),
    },
    // { header: "Status", field: "isActive", status: true },
    {
      header: "date And Time",
      field: "dateAndTime",
      render: (data) => formatDateTime(data) // Use the helper function
    },
    { header: "CALLER DETAILS", field: "callDetails" },
    { header: "EMERGENCY TYPE", field: "emergencyTypeName" },
    { header: "EMERGENCY CLOSURE BY", field: "emergencyClosureName" },
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
        <AddEditEmergencCallLogModal
          open={openPopUpModel.open}
          data={openPopUpModel.data}
          mode={openPopUpModel.mode}
          onSubmit={onSubmit}
          onClose={() => onSubmit(false)}
        />
      )}
    </>
  )
}

export const AddEditEmergencCallLogModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const { data: detail } = GetEmergencyCallLogDetail(data.id)
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { options: EmergencyTypeList } = GetEmergencyTypeList(PaginationType.all, true)
  const { options: EmergencyClosureList } = GetEmergencyClosureList(PaginationType.all, true)
  const { options: MeterialStatusList } = GetMaterialStatusList(PaginationType.all, true)

  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  console.log("🚀 ~ file: AddEditEmergencCallLog.jsx:123 ~ AddEditEmergencCallLogModal ~ errors:", errors)

  useEffect(() => {
    if (open) {
      setValue('date', currentDate);
      setValue('time', currentTime);
    }
  }, [open, setValue, currentDate, currentTime]);

  const [processing, setProcessing] = useState('');
  useEffect(() => {
    if ([FormModes.Edit, FormModes.View].includes(mode)) {
      reset({
        ...detail
      })
    } else {
      reset({
        id: 0,
        shiftId: 0,
        dateAndTime: "",
        reportedBy: "",
        callDetails: "",
        receivedById: "",
        emergencyTypeId: 0,
        emergencyDesc: "",
        emergencyClosureId: 0,
        actionToken: ""
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await EmergencyCallLogService.add(formData)
      reactToaster(result.message, NotificationStatus.success)
      onSubmit(result)
    } catch {
      reactToaster(NotificationStatus.error)
    } finally {
      setProcessing('')
    }
  }

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <PopUpModal open={open}>
      <ModalHeader mode={mode} title="Emergency Call Log" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            label="Date"
            required
            name="dateAndTime"
            type="datetime-local"
            errors={errors?.dateAndTime}
          />

          <FormTextField
            mode={mode}
            control={control}
            required
            label="Caller Details"
            name="callDetails"
            errors={errors?.callDetails}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="received By"
            name="receivedById"
            errors={errors?.receivedById}
            options={UserList}
          />

          <FormSelectField
            mode={mode}
            control={control}
            label="Emergency Type"
            name="emergencyTypeId"
            options={EmergencyTypeList}
            errors={errors?.emergencyTypeId}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="reported by"
            name="reportedBy"
            options={UserList}
            errors={errors?.reportedBy}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Description"
            name="emergencyDesc"
            errors={errors?.emergencyDesc}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Emergency closure by"
            name="emergencyClosureId"
            options={EmergencyClosureList}
            errors={errors?.emergencyClosureId}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Action Taken"
            name="actionToken"
            errors={errors?.actionToken}
          />

        </div>
        <SubmitCancelButtons
          mode={mode}
          loading={processing}
          onSubmit={handleSubmit(submit)}
          onCancel={() => onClose()}
        />
      </div>
    </PopUpModal>
  );
};

