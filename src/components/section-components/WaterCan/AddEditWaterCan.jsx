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
import { GetVisitPurposeList, GetFloorList, GetWaterCanList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetWaterCanDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { WaterCanService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  serviceProvider: yup.string().required(' service Provider is required'),
  deliveryPersonName: yup.string().required(' delivery Person Name is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
  // keyReturnDate: yup.string().required('key Return Date is required'),
  deliveryPersonMobileNo: yup.string().test(
    "len",
    "delivery Person Mobile No length should be 10",
    (val) => val.length === 10
  ).required("delivery Person Mobile No  is Required"),
});

export function AddEditWaterCan() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "WATER CAN"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetWaterCanList()
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
    { header: " Date", field: "Date", render: (data) => <>{dayjs(data).format("DD-MM-YYYY")}</> },


    // { header: "Status", field: "isActive", status: true },
    { header: "Service Provider", field: "serviceProvider" },
    { header: "Delivery person Name", field: "deliveryPersonName" },
    { header: "Delivery person Mobile No", field: "deliveryPersonMobileNo" },
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
        <AddEditWaterCanModal
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

export const AddEditWaterCanModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { options: VisitPurposeList } = GetVisitPurposeList(PaginationType.all, true)
  const { data: detail } = GetWaterCanDetail(data.id)

  console.log("🚀 ~ file: AddEditKey.jsx:123 ~ AddEditWaterCanModal ~ errors:", errors)
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
        serviceProvider: "",
        deliveryPersonName: "",
        deliveryPersonMobileNo: "",
        noOfWaterCanDelivered: 0,
        noOfWaterEmptyCanTaken: 0,
        isNotificationToAdmin: false
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await WaterCanService.add(formData)
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
      <ModalHeader mode={mode} title="Water Can" />
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
            required
            label="Service Provider"
            name="serviceProvider"
            errors={errors?.serviceProvider}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Delivery person Name"
            required
            name="deliveryPersonName"
            errors={errors?.deliveryPersonName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Delivery person Mobile No"
            maxLength={10}
            name="deliveryPersonMobileNo"
            type="number"
            required
            errors={errors?.deliveryPersonMobileNo}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="No of Water Cans Delivered"
            name="noOfWaterCanDelivered"
            errors={errors?.noOfWaterCanDelivered}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="No of Water Empty Cans taken"
            name="noOfWaterEmptyCanTaken"
            errors={errors?.noOfWaterEmptyCanTaken}
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

