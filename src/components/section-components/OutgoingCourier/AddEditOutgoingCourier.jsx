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
import { GetCourierNameList, GetOutgoingCourierList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetOutgoingCourierDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { OutgoingCourierService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";


// Validation Schema
const FaultSchema = yup.object().shape({
  dateAndTime: yup.string().required(' dateAndTime is required'),
  dispatchedDate: yup.string().required(' Dispacth Date is required'),
  employeeId: yup.string().required(' GIVEN BY EMPLOYEE NAME is required'),
  toCompany: yup.string().required(' toCompany And Remarks is required'),
  address: yup.string().required('address is required'),
  toCity: yup.string().required('to City is required'),
  pincode: yup.string().test(
    "len",
    "pincode length should be 6",
    (val) => val.length === 6
  ).required("pincode  is Required"),
});

export function AddEditOutgoingCourier() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "OUTGOING COURIER"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetOutgoingCourierList()
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
    { header: "GIVEN BY EMPLOYEE NAME", field: "employeeName" },
    { header: "to Company", field: "toCompany" },
    { header: "to City", field: "toCity" },
    { header: "courier Name", field: "courierName" },
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
        <AddEditOutgoingCourierModal
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

export const AddEditOutgoingCourierModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { options: CourierNameList } = GetCourierNameList(PaginationType.all, true)
  const { data: detail } = GetOutgoingCourierDetail(data.id)

  console.log("🚀 ~ file: AddEditKey.jsx:123 ~ AddEditOutgoingCourierModal ~ errors:", errors)
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
        employeeId: null,
        toCompany: "",
        address: "",
        toCity: "",
        pincode: "",
        courierNameId: 0,
        airwayBillNo: "",
        dispatchedDate: "",
        isNotificationToAdmin: false
      }
      )
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await OutgoingCourierService.add(formData)
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
      <ModalHeader mode={mode} title="Outgoing Courier" />
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
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="Given By Employee Name"
            name="employeeId"
            options={UserList}
            errors={errors?.employeeId}
          />

          <FormTextField
            mode={mode}
            control={control}
            label="To Company"
            name="toCompany"
            required
            errors={errors?.toCompany}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Address"
            name="address"
            required
            errors={errors?.address}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="To City"
            name="toCity"
            required
            errors={errors?.toCity}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Pincode"
            name="pincode"
            maxLength={6}
            required
            type="number"
            errors={errors?.pincode}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Courier Name"
            name="courierNameId"
            options={CourierNameList}
            errors={errors?.courierNameId}
          />

          <FormTextField
            mode={mode}
            control={control}
            label="Airway Bill No"
            name="airwayBillNo"
            required
            errors={errors?.airwayBillNo}
          />
          <FormTextField
            mode={mode}
            control={control}
            required
            label="Dispatched Date and Time"
            name="dispatchedDate"
            type="datetime-local"
            errors={errors?.dispatchedDate}
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

