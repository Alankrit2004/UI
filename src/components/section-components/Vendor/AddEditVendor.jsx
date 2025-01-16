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
import { GetVisitPurposeList, GetFloorList, GetVendorList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetVendorDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { VendorService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  vendorName: yup.string().required(' vendor Name is required'),
  dateAndTime: yup.string().required(' dateAndTime is required'),
  visitPurposeId: yup.string().required(' visit Purpose is required'),
  phoneNumber: yup.string().test(
    "len",
    "phone Number length should be 10",
    (val) => val.length === 10
  ).required("phone Number  is Required"),
  mobileNo: yup.string().test(
    "len",
    "Mobile Number length should be 10",
    (val) => val.length === 10
  ).required("mobile Number  is Required"),
});

export function AddEditVendor() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "VENDOR"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetVendorList()
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
    { header: "VENDOR NAME", field: "vendorName" },
    { header: "Phone Number", field: "phoneNumber" },
    { header: "Mobile No", field: "mobileNo" },
    { header: "Visit Purpose", field: "visitPurposeName" },
    { header: "Badge No", field: "badgeNo" },
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
        <AddEditVendorModal
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

export const AddEditVendorModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { options: VisitPurposeList } = GetVisitPurposeList(PaginationType.all, true)
  const { data: detail } = GetVendorDetail(data.id)

  console.log("🚀 ~ file: AddEditKey.jsx:123 ~ AddEditVendorModal ~ errors:", errors)
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
        vendorName: "",
        phoneNumber: "",
        mobileNo: "",
        visitPurposeId: null,
        badgeNo: "",
        remarks: ""
      })
    }
  }, [detail, mode, open])
  // Handle form submission
  const submit = async (formData) => {
    try {
      setProcessing("proccessing")
      const result = await VendorService.add(formData)
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
      <ModalHeader mode={mode} title="Vendor" />
      <div className="p-4 w-[65vw]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormTextField
            mode={mode}
            control={control}
            label="Date"
            name="dateAndTime"
            type="date"
            required
            errors={errors?.dateAndTime}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="vendor Name"
            required

            name="vendorName"
            errors={errors?.vendorName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Phone Number"
            maxLength={10}
            required
            name="phoneNumber"
            type="number"
            errors={errors?.phoneNumber}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Mobile No"
            maxLength={10}
            name="mobileNo"
            type="number"
            required
            errors={errors?.mobileNo}
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="Visit Purpose"
            name="visitPurposeId"
            required
            options={VisitPurposeList}
            errors={errors?.visitPurposeId}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Badge No"
            name="badgeNo"
            errors={errors?.badgeNo}
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

