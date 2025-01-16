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
import { GetUserList, GetRouteList, GetShiftList, GetExitEmployeeList, GetExitEmployeeDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { formatDateTime } from 'helpers/dateHelper';
import { ExitEmployeeService, FormModes, NotificationStatus, PaginationType } from "utility";
import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  dateAndTime: yup.string().required('date And Time is required'),
  shiftId: yup.string(),
  employeeId: yup.string().required('employee is required'),
  isBadgeHandedOver: yup.boolean(),
  isMaterialsCarried: yup.boolean(),
  isNotificationToAdmin: yup.boolean(),
  yesDesc: yup.string(),
  anyObservations: yup.string(),
  vehicleNo: yup.string(),
});

export function AddEditExitEmployee() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "EXIT EMPLOYEE"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetExitEmployeeList()
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
      render: (data) => formatDateTime(data)
    },
    // { header: "Status", field: "isActive", status: true },
    { header: "EMPLOYEE NAME", field: "employeeName" },
    { header: "IF YES, DESCRIPTION", field: "yesDesc" },
    { header: "ANY OBSERVATIONS", field: "anyObservations" },
    { header: "VEHICLE NO", field: "vehicleNo" },
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
        <AddEditExitEmployeeModal
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

export const AddEditExitEmployeeModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { data: detail } = GetExitEmployeeDetail(data.id)

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
        employeeId: null,
        isBadgeHandedOver: false,
        isMaterialsCarried: false,
        yesDesc: "",
        anyObservations: "",
        vehicleNo: "",
        isNotificationToAdmin: true
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await ExitEmployeeService.add(formData)
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
      <ModalHeader mode={mode} title="Exit Employee" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            required
            label="Date"
            name="dateAndTime"
            type="datetime-local"
            errors={errors?.dateAndTime}
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
          <FormCheckBox
            mode={mode}
            control={control}
            label="Badge Handed Over"
            name="isBadgeHandedOver"
            errors={errors?.isBadgeHandedOver}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Materials Carried"
            name="isMaterialsCarried"
            errors={errors?.isMaterialsCarried}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="If Yes, description"
            name="yesDesc"
            errors={errors?.yesDesc}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Any observations"
            name="anyObservations"
            errors={errors?.anyObservations}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Vehicle No"
            name="vehicleNo"
            errors={errors?.vehicleNo}
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

