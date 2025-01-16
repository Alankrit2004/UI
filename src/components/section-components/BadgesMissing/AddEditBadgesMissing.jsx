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
  DropDown,
  AppTable,
  TableHeaderBox,
  PopUpModal,
  FormCheckBox,
  ModalHeader,
  FormSelectField
} from 'elements';
import { IoMdAdd } from 'react-icons/io';
import { CustomButton1 } from 'components/general-components';
import { GetReasonTypeList, GetBadgesMissingList, GetUserList, GetBadgesMissingDetail, GetVisitorTypeList } from 'hooks'
import { GetRoleList, GetFloorList, GetAccessDoorChecklistList, GetAccessDoorChecklistDetail, GetLocationList, reactToaster } from 'hooks';
import { BadgesMissingService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema for Visitor Log
const VisitorLogSchema = yup.object().shape({
  badgesMissingDate: yup.date().required('badges Missing Date is required'),
  visitorName: yup.string(),
  employeeId: yup.string(),
  visitorTypeId: yup.string().required('visitor Type is required'),
  reasonTypeId: yup.string().required('reason Type is required'),
  badgeDesc: yup.string().required('badge Desc is required'),
  badgeNo: yup.string(),
  badgeLostDate: yup.string(),
  isVisitor: yup.boolean()
});

export function BadgesMissing() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "BADGES MISSING"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  });

  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetBadgesMissingList();

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
      header: "Action",
      action: true,
      onEdit: Permission.edit ? (data) => openModel(FormModes.Edit, data) : null,
      // onEdit: (data) => openModel(FormModes.Edit, data),
      onView: (data) => openModel(FormModes.View, data)
    },
    {
      header: "DATE AND TIME",
      field: "badgesMissingDate",
      render: (data) => formatDateTime(data) // Use the helper function
    },
    { header: "visitor Type Name", field: "visitorTypeName" },
    { header: "badge No", field: "badgeNo" },
    {
      header: "badge Lost Date And Time",
      field: "badgeLostDate",
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
      />
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
        <AddEditBadgesMissingModal
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

export const AddEditBadgesMissingModal = ({ mode, data, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(VisitorLogSchema)
  });
  const isVisitor = watch("isVisitor")
  console.log("🚀 ~ file: AddEditBadgesMissing.jsx:119 ~ AddEditBadgesMissingModal ~ isVisitor:", isVisitor)
  const { data: detail } = GetBadgesMissingDetail(data.id)
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { options: VisitorTypeList } = GetVisitorTypeList(PaginationType.all, true)
  const { options: ReasonTypeList } = GetReasonTypeList(PaginationType.all, true)

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
      const result = await BadgesMissingService.add(formData)
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
      <ModalHeader mode={mode} title="Badges Missing" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            label="Date and Time"
            name="badgesMissingDate"
            required
            type="datetime-local"
            errors={errors?.badgesMissingDate}
          />
          <FormCheckBox
            mode={mode}
            control={control}
            label="is Visitor"
            name="isVisitor"
            errors={errors?.isVisitor}
          />
          {!isVisitor ? <FormSelectField
            mode={mode}
            control={control}
            label="Employee"
            name="employeeId"
            options={UserList}
            errors={errors?.employeeId}
          />
            :
            <FormTextField
              mode={mode}
              control={control}
              label=" Visitor Name"
              name="visitorName"
              type="text"
              errors={errors?.visitorName}
            />}
          <FormSelectField
            mode={mode}
            control={control}
            label="Visitor Type"
            name="visitorTypeId"
            required
            options={VisitorTypeList}
            errors={errors?.visitorTypeId}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Reason Type"
            name="reasonTypeId"
            required
            options={ReasonTypeList}
            errors={errors?.reasonTypeId}
          />
          <FormTextArea
            control={control}
            label="Description"
            required
            name="badgeDesc"
            errors={errors?.badgeDesc}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Badge No"
            name="badgeNo"
            type="text"
            errors={errors?.badgeNo}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Badge Lost Date and Time"
            name="badgeLostDate"
            type="datetime-local"
            errors={errors?.badgeLostDate}
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
