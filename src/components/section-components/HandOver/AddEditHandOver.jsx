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
import { GetFloorList, GetHandOverList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetHandOverDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { HandOverService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  handOverDate: yup.string().required('Hand Over Date is required'),
  employeeId: yup.string().required(' Name is required'),
  dutyBriefingAndRemarks: yup.string().required(' dutyBriefing And Remarks is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
  toEmployeeId: yup.string().required('employee is required'),
  fromEmployeeId: yup.string().required('employee is required'),
  shopName: yup.string(),
  mobileNumber: yup.string().test(
    "len",
    "Mobile Number length should be 10",
    (val) => val.length === 10
  ).required("mobile Number  is Required"),
});

export function AddEditHandOver() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "HAND OVER"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetHandOverList()
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
    { header: "Date", field: "handOverDate", render: (data) => <>{dayjs(data).format("DD-MM-YYYY")}</> },
    // { header: "Status", field: "isActive", status: true },
    { header: " Name", field: "employeeName" },
    { header: "to Employee", field: "toEmployee" },
    { header: "from Employee", field: "fromEmployee" },
    { header: "airway Bill Number", field: "airwayBillNumber" },
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
        <AddEditHandOverModal
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

export const AddEditHandOverModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { data: detail } = GetHandOverDetail(data.id)

  console.log("🚀 ~ file: AddEditHandOver.jsx:123 ~ AddEditHandOverModal ~ errors:", errors)
  useEffect(() => {
    if (open) {
      setValue('handOverDate', currentDateTime);
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
        employeeId: null,
        dutyBriefingAndRemarks: "",
        toEmployeeId: null,
        fromEmployeeId: null,
        courierName: "",
        airwayBillNumber: "",
        receivedById: 0
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await HandOverService.add(formData)
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
      <ModalHeader mode={mode} title="Hand Over" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            label="Date"
            name="handOverDate"
            type="date"
            required
            errors={errors?.handOverDate}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="Name"
            name="employeeId"
            options={UserList}
            errors={errors?.employeeId}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Phone Number"
            name="mobileNumber"
            required

            maxLength="10"
            type="number"
            errors={errors?.mobileNumber}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Duty Briefing and Remarks"
            name="dutyBriefingAndRemarks"
            required
            errors={errors?.dutyBriefingAndRemarks}
          />
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
            label="to Employee"
            name="toEmployeeId"
            options={UserList}
            errors={errors?.toEmployeeId}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="From Name"
            name="fromEmployeeId"
            options={UserList}
            errors={errors?.fromEmployeeId}
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
            label="Airway Bill Number"
            name="airwayBillNumber"
            errors={errors?.airwayBillNumber}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="received By"
            name="receivedById"
            options={UserList}
            errors={errors?.receivedById}
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

