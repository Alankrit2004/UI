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
import { GetEBIServerList, GetCCTVMonitoringList, GetDVMServerList, GetCCTVMonitoringDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { formatDateTime } from 'helpers/dateHelper';
import { CCTVMonitoringService, FormModes, NotificationStatus, PaginationType } from "utility";

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  // shiftId: yup.string().required('shift is required'),
  cctvMonitoringDate: yup.string().required(' Date is required'),
  ebiServerId: yup.string().required('EBI Server Id is required'),
  dvmServerId: yup.string().required('DVM Server Id is required'),
  // entryBy: yup.string().required('entry By is required'),
  // reason: yup.string().required('reason is required'),
  // actionToken: yup.string().required('reason is required'),
  diffBWSyncTime: yup.string().required('diff BWSync Time Name is required'),
  syncDiffResolvedDate: yup.string().required('SyncDiff Resolved Date Id is required'),
  isTimeSyncOnDifferenceResolved: yup.boolean(),
  isCCTV1_FeedCheck: yup.boolean(),
  isCCTV2_FeedCheck: yup.boolean(),
  isCCTV3_FeedCheck: yup.boolean(),
  remarks: yup.string(),
});

export function AddEditCctvMonitoring() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "CCTV MONITORING"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetCCTVMonitoringList()
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
    { header: "DVM Server Name", field: "dvmServerName" },
    { header: "EBI Server Name", field: "ebiServerName" },
    { header: "Diff BW Synchronization Time", field: "diffBWSyncTime" },
    {
      header: "Synchronization Diff Resolved Date and Time",
      field: "syncDiffResolvedDate",
      render: (data) => formatDateTime(data) // Use the helper function
    },
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
        <AddEditAddEditCctvMonitoringModal
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

export const AddEditAddEditCctvMonitoringModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const { data: detail } = GetCCTVMonitoringDetail(data.id)
  const { options: DVMServerList } = GetDVMServerList(PaginationType.all, true)
  const { options: EBIServerList } = GetEBIServerList(PaginationType.all, true)
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
        cctvMonitoringDate: "",
        dvmServerId: null,
        ebiServerId: null,
        isTimeSync: false,
        diffBWSyncTime: "",
        syncDiffResolvedDate: "",
        isTimeSyncOnDifferenceResolved: false,
        isCCTV1_FeedCheck: false,
        isCCTV2_FeedCheck: false,
        isCCTV3_FeedCheck: false,
        remarks: ""
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await CCTVMonitoringService.add(formData)
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
      <ModalHeader mode={mode} title="CCTV MONITORING" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            label="Date"
            name="cctvMonitoringDate"
            type="datetime-local"
            required
            errors={errors?.cctvMonitoringDate}
          />

          <FormSelectField
            mode={mode}
            control={control}
            label="DVM Server Name"
            name="dvmServerId"
            options={DVMServerList}
            required
            errors={errors?.dvmServerId}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="EBI Server Name"
            name="ebiServerId"
            required
            options={EBIServerList}
            errors={errors?.ebiServerId}
          />

          <FormCheckBox
            mode={mode}
            control={control}
            label="Time Synchronized"
            name="isTimeSync"
            errors={errors?.isTimeSync}
          />
          <FormTextField
            mode={mode}
            control={control}
            required
            label="Diff BW Synchronization Time"
            name="diffBWSyncTime"
            errors={errors?.diffBWSyncTime}
          />
          <FormTextField
            mode={mode}
            control={control}
            required
            label="Synchronization Diff Resolved Date and Time"
            type="date"
            name="syncDiffResolvedDate"
            errors={errors?.syncDiffResolvedDate}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Time Synchronization on Difference Resolved"
            name="isTimeSyncOnDifferenceResolved"
            errors={errors?.isTimeSyncOnDifferenceResolved}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="CCTV 1 Feed Check"
            name="isCCTV1_FeedCheck"
            errors={errors?.isCCTV1_FeedCheck}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="CCTV 2 Feed Check"
            name="isCCTV2_FeedCheck"
            errors={errors?.isCCTV2_FeedCheck}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="CCTV 3 Feed Check"
            name="isCCTV3_FeedCheck"
            errors={errors?.isCCTV3_FeedCheck}
          />

          <FormTextArea
            control={control}
            label="remarks"
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

