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
import { GetGenderList, GetEmployeeTypeList, GetBloodGroupList, GetNewJoiningAccessCardList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetNewJoiningAccessCardDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { NewJoiningAccessCardService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const FaultSchema = yup.object().shape({
  dateAndTime: yup.string().required(' date And Time is required'),
  firstName: yup.string().required(' firstName is required'),
  lastName: yup.string().required(' lastName is required'),
  eid: yup.string().required(' eid is required'),
  idNo: yup.string().required(' idNo is required'),
  bloodGroupId: yup.string(),
  employeeTypeId: yup.string(),
  genderId: yup.string(),
  remarks: yup.string().required(' remarks is required'),
});

export function AddEditNewJoiningAccessCard() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "NEW JOINING ACCESS CARD"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetNewJoiningAccessCardList()
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
    { header: "First Name", field: "firstName" },
    { header: "Last Name", field: "lastName" },
    { header: "EID", field: "eid" },
    { header: "ID No", field: "idNo" },
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
        <AddEditNewJoiningAccessCardModal
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

export const AddEditNewJoiningAccessCardModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: BloodGroupList } = GetBloodGroupList(PaginationType.all, true)
  const { options: GenderList } = GetGenderList(PaginationType.all, true)
  const { options: EmployeeTypeList } = GetEmployeeTypeList(PaginationType.all, true)
  const { data: detail } = GetNewJoiningAccessCardDetail(data.id)

  console.log("🚀 ~ file: AddEditNewJoiningAccessCard.jsx:123 ~ AddEditNewJoiningAccessCardModal ~ errors:", errors)
  useEffect(() => {
    if (open) {
      setValue('NewJoiningAccessCardDate', currentDateTime);
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
        firstName: "",
        lastName: "",
        eid: "",
        bloodGroupId: null,
        employeeTypeId: null,
        genderId: null,
        idNo: "",
        isNotificationToAdmin: true,
        remarks: ""
      }
      )
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await NewJoiningAccessCardService.add(formData)
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
      <ModalHeader mode={mode} title="New Joining Access Card" />
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
            label="First Name"
            name="firstName"
            required
            errors={errors?.firstName}
          />

          <FormTextField
            mode={mode}
            control={control}
            label="Last Name"
            name="lastName"
            required
            errors={errors?.lastName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="EID"
            name="eid"
            required
            errors={errors?.eid}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="Blood Group"
            name="bloodGroupId"
            options={BloodGroupList}
            errors={errors?.bloodGroupId}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="Employee Type"
            name="employeeTypeId"
            options={EmployeeTypeList}
            errors={errors?.employeeTypeId}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="Gender"
            name="genderId"
            options={GenderList}
            errors={errors?.genderId}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="ID No"
            name="idNo"
            required
            errors={errors?.idNo}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Remarks"
            name="remarks"
            required
            errors={errors?.remarks}
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

