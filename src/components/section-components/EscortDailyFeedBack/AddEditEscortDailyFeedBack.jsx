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
import { GetUserList, GetRouteList, GetShiftList, GetEscortDailyFeedbackList, GetEscortDailyFeedbackDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { formatDateTime } from 'helpers/dateHelper';
import { EscortDailyFeedbackService, FormModes, NotificationStatus, PaginationType } from "utility";

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  dateAndTime: yup.string().required('date is required'),
  // shiftId: yup.string().required('shift is required'),
  employeeId: yup.string().required('employee is required'),
  routeId: yup.string().required('route is required'),
  isUsingMobileWhileDriving: yup.boolean(),
  isDrivingRash: yup.boolean(),
  isFollowedTrafficRules: yup.boolean(),
  isPoliteToEmployee: yup.boolean(),
  isSecurityGuardAlert: yup.boolean(),
  isPepperOrChillySprayIssued: yup.boolean(),
  remarks: yup.string(),
});

export function AddEditEscortDailyFeedBack() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "ESCORT DAILY FEED BACK"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetEscortDailyFeedbackList()
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
      render: (data) => formatDateTime(data)
    },
    { header: "Shift", field: "shiftName" },
    { header: "Employee Name", field: "employeeName" },
    { header: "Route", field: "routeName" },
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
        <AddEditEscortDailyFeedBackModal
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

export const AddEditEscortDailyFeedBackModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const { options: ShiftList } = GetShiftList(PaginationType.all, true)
  const { options: RouteList } = GetRouteList(PaginationType.all, true)
  const { options: UserList } = GetUserList(PaginationType.all, true)

  const { data: detail } = GetEscortDailyFeedbackDetail(data.id)

  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');

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
        shiftId: null,
        dateAndTime: '',
        employeeId: null,
        routeId: null,
        isUsingMobileWhileDriving: false,
        isDrivingRash: false,
        isFollowedTrafficRules: false,
        isPoliteToEmployee: false,
        isSecurityGuardAlert: false,
        isPepperOrChillySprayIssued: false,
        remarks: ""
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await EscortDailyFeedbackService.add(formData)
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
      <ModalHeader mode={mode} title="Escort Daily Feed Back" />
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
          <FormSelectField
            mode={mode}
            control={control}
            label="Shift"
            required
            name="shiftId"
            options={ShiftList}
            errors={errors?.shiftId}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Employee Name"
            required
            name="employeeId"
            options={UserList}
            errors={errors?.employeeId}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Route"
            required
            name="routeId"
            options={RouteList}
            errors={errors?.routeId}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Using Mobile while driving"
            name="isUsingMobileWhileDriving"
            errors={errors?.isUsingMobileWhileDriving}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Driving Rash"
            name="isDrivingRash"
            errors={errors?.isDrivingRash}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Followed Traffic Rules"
            name="isFollowedTrafficRules"
            errors={errors?.isFollowedTrafficRules}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Polite to Employees"
            name="isPoliteToEmployee"
            errors={errors?.isPoliteToEmployee}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Was security guard alert during the Journey"
            name="isSecurityGuardAlert"
            errors={errors?.isSecurityGuardAlert}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Pepper or Chilly spray issued"
            name="isPepperOrChillySprayIssued"
            errors={errors?.isPepperOrChillySprayIssued}
          />
          <FormTextArea
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

