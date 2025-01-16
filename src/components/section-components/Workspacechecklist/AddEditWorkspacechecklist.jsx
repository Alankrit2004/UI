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
import { GetVisitPurposeList, GetFloorList, GetWorkspaceChecklistList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetWorkspaceChecklistDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { WorkspaceChecklistService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  requestNo: yup.string().required(' requestNo is required'),
  requesterName: yup.string().required(' requester Name is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
  workLocation: yup.string().required('work Location is required'),
  approvedById: yup.string().required('approved By is required'),

});

export function AddEditWorkspacechecklist() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "WORKSPACE CHECKLIST"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetWorkspaceChecklistList()
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
    { header: "REQUEST NO", field: "requestNo" },
    { header: "REQUESTER NAME", field: "requesterName" },
    { header: "work Location", field: "workLocation" },
    { header: "approved By", field: "approvedByName" },
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
        <AddEditWorkspacechecklistModal
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

export const AddEditWorkspacechecklistModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { options: VisitPurposeList } = GetVisitPurposeList(PaginationType.all, true)
  const { data: detail } = GetWorkspaceChecklistDetail(data.id)

  console.log("🚀 ~ file: AddEditKey.jsx:123 ~ AddEditWorkspacechecklistModal ~ errors:", errors)
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
        requestNo: "",
        requesterName: "",
        workLocation: "",
        workDescription: "",
        approvedById: null,
        workPermitNo: "",
        vendorName: "",
        workExecutionDate: "",
        isAfterWorkCleaning: false,
        remarks: ""
      }
      )
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await WorkspaceChecklistService.add(formData)
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
      <ModalHeader mode={mode} title="Workspace checklist" />
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
            label="Request No"
            name="requestNo"
            required
            errors={errors?.requestNo}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Requester Name"
            name="requesterName"
            required
            errors={errors?.requesterName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Work Location"
            name="workLocation"
            required
            errors={errors?.workLocation}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Work Description"
            name="workDescription"
            errors={errors?.workDescription}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Approved By"
            required
            name="approvedById"
            options={UserList}
            errors={errors?.approvedById}
          />

          <FormTextField
            mode={mode}
            control={control}
            label="Work Permit No"
            name="workPermitNo"
            errors={errors?.workPermitNo}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Vendor Name"
            name="vendorName"
            errors={errors?.vendorName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Work Execution Date"
            type="date"
            name="workExecutionDate"
            errors={errors?.workExecutionDate}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="After work Cleaning"
            name="isAfterWorkCleaning"
            errors={errors?.isAfterWorkCleaning}
          />
          <FormTextField
            mode={mode}
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

