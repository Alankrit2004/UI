import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';

// Components and Helpers
import {
  FormTextField,
  FormTextArea,
  SubmitCancelButtons,
  AppTable,
  TableHeaderBox,
  PopUpModal,
  ModalHeader,
  FormSelectField
} from 'elements';
import { IoMdAdd } from 'react-icons/io';
import { CustomButton1 } from 'components/general-components';
import { GetUserList, GetAttendanceRegisterDetail, GetAttendanceRegisterList, reactToaster } from 'hooks';
import { AttendanceRegisterService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

const BoldInput = ({ type, value }) => {
  if (type === 'datetime-local' || type === 'date') {
    return <strong>{value}</strong>;
  }
  return <>{value}</>;
};

// Validation Schema for Employee Log
const EmployeeLogSchema = yup.object().shape({
  dateInTime: yup.string().required('Date and In Time is required'),
  employeeId: yup.string().required('Employee Name is required'),
  dateOutTime: yup.string().required('Date and Out Time is required'),
  remarks: yup.string().nullable(),
});

export function AttendanceRegister() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "ATTENDANCE REGISTER"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  });
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetAttendanceRegisterList();

  const openModel = (mode, data) => {
    setPopUpModel({
      open: true,
      mode: mode || FormModes.Add,
      data: data || {}
    });
  };

  const onSubmit = (data) => {
    setPopUpModel({
      mode: "",
      open: false,
      data: {}
    });
    if (data) {
      refresh();
    }
  };

  const columns = [
    { header: "S.No.", field: "", index: true },
    {
      header: "DATE AND IN TIME",
      field: "dateInTime",
      render: (data) => formatDateTime(data) // Use the helper function
    },
    {
      header: "DATE AND OUT TIME",
      field: "dateOutTime",
      render: (data) => formatDateTime(data) // Use the helper function
    },
    { header: "EMPLOYEE NAME", field: "employeeName" },
    { header: "Created Date", field: "createdDate", render: (data) => <>{dayjs(data).format("DD-MM-YYYY")}</> },
    { header: "Created By", field: "creatorName" },
    {
      header: "Action",
      action: true,
      onEdit: Permission.edit ? (data) => openModel(FormModes.Edit, data) : null,
      // onEdit: (data) => openModel(FormModes.Edit, data),
      onView: (data) => openModel(FormModes.View, data)
    },
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
        <AddEditEmployeeLogModal
          open={openPopUpModel.open}
          data={openPopUpModel.data}
          mode={openPopUpModel.mode}
          onSubmit={onSubmit}
          onClose={() => onSubmit(false)}
        />
      )}
    </>
  );
}

export const AddEditEmployeeLogModal = ({ mode, open, onClose, onSubmit, data }) => {
  const { data: detail } = GetAttendanceRegisterDetail(data.id)
  const { options: UserList } = GetUserList(PaginationType.all, true)

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(EmployeeLogSchema)
  });

  const [processing, setProcessing] = useState('');

  useEffect(() => {
    if ([FormModes.Edit, FormModes.View].includes(mode)) {
      reset({
        ...detail
      })
    } else {
      reset({
        id: 0,
        emergencyClosureName: "",
        isActive: true,
      })
    }
  }, [detail, mode, open])
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await AttendanceRegisterService.add(formData)
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
      <ModalHeader mode={mode} title="Attendance Register" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            label="Date and In Time"
            name="dateInTime"
            type="datetime-local"
            required
            errors={errors?.dateInTime}
            render={({ field }) => (
              <BoldInput type={field.type} value={field.value || 'Select Date'} />
            )}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="EMPLOYEE NAME"
            name="employeeId"
            options={UserList}
            placeholder="select EMPLOYEE NAME"
            errors={errors?.employeeId}
            defaultValue=""
            className="col-span-2"
          ></FormSelectField>
          <FormTextField
            mode={mode}
            control={control}
            label="Date and Out Time"
            name="dateOutTime"
            type="datetime-local"
            required
            errors={errors?.dateOutTime}
          />
          <FormTextArea
            control={control}
            label="Remarks"
            name="remarks"
            className={"text-xl"}
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
