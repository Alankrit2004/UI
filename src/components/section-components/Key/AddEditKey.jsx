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
import { GetFloorList, GetKeyList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetKeyDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { KeyService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  keyIssuedToId: yup.string().required(' Name is required'),
  key: yup.string().required(' Key is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
  keyReturnDate: yup.string().required('key Return Date is required'),

});

export function AddEditKey() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "KEY"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetKeyList()
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
    {
      header: "key Return Date",
      field: "keyReturnDate",
      render: (data) => formatDateTime(data) // Use the helper function
    },
    // { header: "Status", field: "isActive", status: true },
    { header: "key Issued To", field: "keyIssuedTo" },
    { header: "key", field: "key" },
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
        <AddEditKeyModal
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

export const AddEditKeyModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { data: detail } = GetKeyDetail(data.id)

  console.log("🚀 ~ file: AddEditKey.jsx:123 ~ AddEditKeyModal ~ errors:", errors)
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
        keyIssuedToId: null,
        key: "",
        tokeyIssuedToId: null,
        fromkeyIssuedToId: null,
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
      const result = await KeyService.add(formData)
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
      <ModalHeader mode={mode} title="key" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            label="Date time"
            name="dateAndTime"
            type="datetime-local"
            required
            errors={errors?.dateAndTime}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="Key Issued To"
            name="keyIssuedToId"
            options={UserList}
            errors={errors?.keyIssuedToId}
          />

          <FormTextField
            mode={mode}
            control={control}
            label="Key"
            name="key"
            required
            errors={errors?.key}
          />

          <FormTextField
            mode={mode}
            control={control}
            label="Key Returned Date and Time"
            name="keyReturnDate"
            type="datetime-local"
            required
            errors={errors?.keyReturnDate}
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
