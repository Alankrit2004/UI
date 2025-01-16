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
import { GetVisitPurposeList, GetDepartmentList, GetIncomingCourierList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetIncomingCourierDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { IncomingCourierService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  employeeId: yup.string().required(' TO EMPLOYEE NAME is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
  fromCompany: yup.string().required('from Company is required'),
});

export function AddEditIncomingCourier() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "INCOMING COURIER"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetIncomingCourierList()
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
    { header: "TO EMPLOYEE NAME", field: "employeeName" },
    // { header: "DEPARTMENT", field: "departmentName" },
    { header: "FROM COMPANY", field: "fromCompany" },
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
        <AddEditIncomingCourierModal
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

export const AddEditIncomingCourierModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { options: DepartmentList } = GetDepartmentList(PaginationType.all, true)
  const { data: detail } = GetIncomingCourierDetail(data.id)

  console.log("🚀 ~ file: AddEditKey.jsx:123 ~ AddEditIncomingCourierModal ~ errors:", errors)
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
        fromCompany: "",
        address: "",
        fromCity: "",
        pincode: "",
        courierName: "",
        airwayBillNo: "",
        isNotifyToEmployee: false
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await IncomingCourierService.add(formData)
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
      <ModalHeader mode={mode} title="Incoming Courier" />
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
            label="To Employee Name"
            required
            name="employeeId"
            options={UserList}
            errors={errors?.employeeId}
          />

          <FormTextField
            mode={mode}
            control={control}
            label="From Company"
            required
            name="fromCompany"
            errors={errors?.fromCompany}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Address"
            name="address"
            errors={errors?.address}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="From City"
            name="fromCity"
            errors={errors?.fromCity}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Pincode"
            name="pincode"
            maxLength={6}
            type="number"
            errors={errors?.pincode}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Courier Name"
            name="courierName"
            errors={errors?.courierName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Airway Bill No."
            name="airwayBillNo"
            errors={errors?.airwayBillNo}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Notify To Employee"
            name="isNotifyToEmployee"
            errors={errors?.isNotifyToEmployee}
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

