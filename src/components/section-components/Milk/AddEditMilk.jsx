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
import { GetFloorList, GetMilkList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetMilkDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { MilkService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  emailId: yup.string().required(' email is required').email("Email should be valid"),
  dcNumber: yup.string().required(' dc Number And Remarks is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
  serviceProvider: yup.string().required(' serviceProvider is required'),
  deliveryPersonName: yup.string().required(' deliveryPersonName is required'),
  deliveryPersonMobileNo: yup.string().test(
    "len",
    "delivery Person Mobile Nolength should be 10",
    (val) => val.length === 10
  ).required("delivery Person Mobile No is Required"),
  noofPacket: yup.string().required('noofPacket is required'),

});

export function AddEditMilk() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "MILK"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetMilkList()
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
      header: "date And Time",
      field: "dateAndTime",
      render: (data) => formatDateTime(data) // Use the helper function
    },

    // { header: "Status", field: "isActive", status: true },
    { header: "DC Number", field: "dcNumber" },
    { header: "Service Provider", field: "serviceProvider" },
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
        <AddEditMilkModal
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

export const AddEditMilkModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { data: detail } = GetMilkDetail(data.id)

  console.log("🚀 ~ file: AddEditMilk.jsx:123 ~ AddEditMilkModal ~ errors:", errors)
  useEffect(() => {
    if (open) {
      setValue('MilkDate', currentDateTime);
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
        emailId: "",
        dateAndTime: "",
        dcNumber: "",
        serviceProvider: "",
        deliveryPersonName: "",
        deliveryPersonMobileNo: "",
        noofPacket: null,
        isNotificationToAdmin: true
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await MilkService.add(formData)
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
      <ModalHeader mode={mode} title="Milk" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            label="Date and Time"
            name="dateAndTime"
            type="datetime-local"
            required
            errors={errors?.dateAndTime}
          />


          <FormTextField
            mode={mode}
            control={control}
            label="Email"
            name="emailId"
            required
            errors={errors?.emailId}
          />

          <FormTextField
            mode={mode}
            control={control}
            label="DC Number"
            name="dcNumber"
            required
            errors={errors?.dcNumber}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Service Provider"
            name="serviceProvider"
            required
            errors={errors?.serviceProvider}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Delivery Person Name"
            name="deliveryPersonName"
            required
            errors={errors?.deliveryPersonName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Delivery Person Mobile No"
            name="deliveryPersonMobileNo"
            required
            maxLength={10}
            type="number"
            errors={errors?.deliveryPersonMobileNo}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="No. of packets"
            name="noofPacket"
            type="number"
            required
            errors={errors?.noofPacket}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Notification to Admin"
            name="isNotificationToAdmin"
            errors={errors?.isNotificationToAdmin}
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

