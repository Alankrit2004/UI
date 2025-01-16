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
import { GetFloorList, GetLostAndFoundList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetLostAndFoundDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { LostAndFoundService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  itemName: yup.string().required(' item Name is required'),
  foundByName: yup.string().required(' found By Name is required'),
  foundLocation: yup.string().required(' found Location is required'),
  itemHandoverDate: yup.string().required(' itemHandoverDate is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
  receiverId: yup.string().required('receiver is required'),
  receiverIDNo: yup.string().required('receiver Id No  is required'),
  remarks: yup.string(),
});

export function AddEditLostAndFound() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "LOST AND FOUND"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetLostAndFoundList()
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
      header: "Item Handover Date and Time",
      field: "itemHandoverDate",
      render: (data) => formatDateTime(data) // Use the helper function
    },
    // { header: "Status", field: "isActive", status: true },
    { header: "Item Name", field: "itemName" },
    { header: "Found byName", field: "foundByName" },
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
        <AddEditLostAndFoundModal
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

export const AddEditLostAndFoundModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { data: detail } = GetLostAndFoundDetail(data.id)

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
        itemName: "",
        foundByName: "",
        foundLocation: "",
        itemHandoverDate: "",
        receiverId: null,
        receiverIDNo: "",
        isnotificationToEmployee: true,
        remarks: ""
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await LostAndFoundService.add(formData)
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
      <ModalHeader mode={mode} title="Lost And Found" />
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
          <FormTextField
            mode={mode}
            control={control}
            label="Item Name"
            name="itemName"
            required
            errors={errors?.itemName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Found by Name"
            name="foundByName"
            required
            errors={errors?.foundByName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Found Location"
            name="foundLocation"
            required
            errors={errors?.foundLocation}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Item Handover Date and Time"
            name="itemHandoverDate"
            type="datetime-local"
            required
            errors={errors?.itemHandoverDate}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="Receiver Name"
            name="receiverId"
            options={UserList}
            errors={errors?.receiverId}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Receiver Id No"
            name="receiverIDNo"
            required
            errors={errors?.receiverIDNo}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Remarks"
            name="remarks"
            errors={errors?.remarks}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Notification to Employee"
            name="isnotificationToEmployee"
            errors={errors?.isnotificationToEmployee}
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

