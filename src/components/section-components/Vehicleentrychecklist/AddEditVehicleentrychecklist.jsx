import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Components and Helpers
import { FormUploadField, FormTextField, FormSelectField, FormCheckBox, FormTextArea, SubmitCancelButtons, AppTable, TableHeaderBox } from 'elements';
import { PopUpModal, ModalHeader } from 'elements';
import { IoMdAdd } from 'react-icons/io';
import { CustomButton1 } from 'components/general-components';
import { GetVehicleTypeList, GetVehicleEntryChecklistList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetVehicleEntryChecklistDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { VehicleEntryChecklistService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  employeeId: yup.string().required(' SECURITY NAME is required'),
  outDate: yup.string().required(' OUT DATE AND TIME is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
  vehicleNumber: yup.string().required('vehicle Number is required'),
});

export function AddEditVehicleentrychecklist() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "VEHICLE ENTRY CHECKLIST"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetVehicleEntryChecklistList()
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
    {
      header: "In Date and Time",
      field: "dateAndTime",
      render: (data) => formatDateTime(data) // Use the helper function
    },

    // { header: "Status", field: "isActive", status: true },
    { header: "Vehicle type", field: "vehicleTypeName" },
    { header: "Vehicle number", field: "vehicleNumber" },
    {
      header: "out Date",
      field: "outDate",
      render: (data) => formatDateTime(data) // Use the helper function
    },
    { header: "Security Name", field: "employeeName" },
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
        <AddEditVehicleentrychecklistModal
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

export const AddEditVehicleentrychecklistModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { options: VehicleTypeList } = GetVehicleTypeList(PaginationType.all, true)
  const { data: detail } = GetVehicleEntryChecklistDetail(data.id)

  console.log("🚀 ~ file: AddEditKey.jsx:123 ~ AddEditVehicleentrychecklistModal ~ errors:", errors)
  useEffect(() => {
    if (open) {
      setValue('KeyDate', currentDateTime);
      setValue('dateAndTime', currentDateTime);
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
        vehicleTypeId: 0,
        vehicleNumber: "",
        outDate: "",
        employeeId: 0,
        remarks: ""
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await VehicleEntryChecklistService.add(formData)
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
      <ModalHeader mode={mode} title="Vehicle entry checklist" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            label="In Date and Time"
            name="dateAndTime"
            type="datetime-local"
            required
            errors={errors?.dateAndTime}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Vehicle type"
            name="vehicleTypeId"
            options={VehicleTypeList}
            errors={errors?.vehicleTypeId}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Vehicle number"
            required
            name="vehicleNumber"
            errors={errors?.vehicleNumber}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Out Date and Time"
            name="outDate"
            type="datetime-local"
            required
            errors={errors?.outDate}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Security Name"
            name="employeeId"
            options={UserList}
            errors={errors?.employeeId}
          />

          <FormTextField
            mode={mode}
            control={control}
            label="Remarks"
            name="remarks"
            errors={errors?.remarks}
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

