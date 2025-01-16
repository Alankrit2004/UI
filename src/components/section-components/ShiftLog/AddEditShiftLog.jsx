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
import { GetShiftLogList, GetUserList, GetShiftLogDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { ShiftLogService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  handedOverById: yup.string().required(' handed Over By Id is required'),
  handedOverToId: yup.string().required(' handed Over To Id is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
});

export function AddEditShiftLog() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "SHIFT LOG"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetShiftLogList()
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
    { header: "handed Over By Name", field: "handedOverByName" },
    { header: "handed Over To Name", field: "handedOverToName" },
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
        <AddEditShiftLogModal
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

export const AddEditShiftLogModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { data: detail } = GetShiftLogDetail(data.id)

  console.log("🚀 ~ file: AddEditKey.jsx:123 ~ AddEditShiftLogModal ~ errors:", errors)
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
        handedOverById: null,
        handedOverToId: null,
        isCheckComplaintAndActionTaken: false,
        isCheckAllUPSParameters: false,
        isCheckTransformerProperWorking: false,
        isCheckLightFitting: false,
        isCheckAllLTPanels: false,
        isCheckAllElevators: false,
        isCheckAirCompressorProperWorking: false,
        isCheckDGParameter: false,
        isCheckSwitchOnOffAllCommonAreaLight: false,
        isRegulateFloorLighting: false
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await ShiftLogService.add(formData)
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
      <ModalHeader mode={mode} title="Shift Log" />
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
            label="Handed Over by Name"
            name="handedOverById"
            options={UserList}
            required
            errors={errors?.handedOverById}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Handed Over to Name"
            name="handedOverToId"
            options={UserList}
            required
            errors={errors?.handedOverToId}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Check the complaints and action taken"
            name="isCheckComplaintAndActionTaken"
            errors={errors?.isCheckComplaintAndActionTaken}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Check all UPS parameters"
            name="isCheckAllUPSParameters"
            errors={errors?.isCheckAllUPSParameters}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Check transformer and its proper working"
            name="isCheckTransformerProperWorking"
            errors={errors?.isCheckTransformerProperWorking}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Check the light fittings in all the blocks"
            name="isCheckLightFitting"
            errors={errors?.isCheckLightFitting}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Check all the LT Panels in LT Rooms"
            name="isCheckAllLTPanels"
            errors={errors?.isCheckAllLTPanels}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Check all the elevators in all the blocks"
            name="isCheckAllElevators"
            errors={errors?.isCheckAllElevators}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Check air compressor for proper working condition"
            name="isCheckAirCompressorProperWorking"
            errors={errors?.isCheckAirCompressorProperWorking}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Check DG Parameter"
            name="isCheckDGParameter"
            errors={errors?.isCheckDGParameter}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Switch ON or OFF all the common area lights"
            name="isCheckSwitchOnOffAllCommonAreaLight"
            errors={errors?.isCheckSwitchOnOffAllCommonAreaLight}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="Regulate floor lighting"
            name="isRegulateFloorLighting"
            errors={errors?.isRegulateFloorLighting}
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

