import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Components and Helpers
import { FormUploadField, FormUploadFieldMulti, FormTextField, FormSelectField, FormCheckBox, FormTextArea, SubmitCancelButtons, AppTable, TableHeaderBox } from 'elements';
import { PopUpModal, ModalHeader } from 'elements';
import { IoMdAdd } from 'react-icons/io';
import { CustomButton1 } from 'components/general-components';
import { GetDepartmentList, GetMaterialStatusList, GetMaterialInwardReturnableList, GetLocationList, GetFireAlarmChecklistList, GetUserList, GetMaterialInwardReturnableDetail, reactToaster } from 'hooks';
import dayjs from 'dayjs';
import { MaterialInwardReturnableService, UserService, FormModes, NotificationStatus, PaginationType } from "utility";
import { formatDateTime } from 'helpers/dateHelper';

import { getSinglePermission } from "helpers";
import { useAuth } from "context";

// Validation Schema
const FaultSchema = yup.object().shape({
  employeeId: yup.string().required('Employee Name is required'),
  DepartmentId: yup.string().nullable(),
  senderCompanyName: yup.string().required('Sender Company Name is required'),
  senderName: yup.string().required('Sender Name is required'),
  dateAndTime: yup.string().required('Date and Time are required'),
  address: yup.string().required('Address is required'),
  transporterCompanyName: yup.string().required('Transporter Company Name is required'),
  natureOfSupply: yup.string().required('Nature of Supply is required'),
  remarks: yup.string(),
  returnableDate: yup.string().required('Returnable Date & time is required'),
  materialName: yup.string().required('Material Name is required'),
  materialStatusId: yup.string().required('material Status is required'),
  poNumber: yup.string(),
  challanList: yup.array().of(
    yup.object().shape({
      challanNumber: yup.string().required('Challan Number is required'),
      challanOriginalFileName: yup.string(),
      challanImage_Base64: yup.string()
    })
  ),
});

export function AddEditMaterialInwardReturnable() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "MATERIAL INWARD RETURNABLE"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetMaterialInwardReturnableList()
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
    { header: "employee Name", field: "employeeName" },
    { header: "material Name", field: "materialName" },
    { header: "material Status Name", field: "materialStatusName" },
    { header: "sender Company Name", field: "senderCompanyName" },
    { header: "sender Name", field: "senderName" },
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
        <AddEditMaterialInwardReturnableModal
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

export const AddEditMaterialInwardReturnableModal = ({ data, mode, open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(FaultSchema)
  });
  const currentDateTime = new Date();
  const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
  const currentTime = dayjs(currentDateTime).format('HH:mm');
  const { options: UserList } = GetUserList(PaginationType.all, true)
  const { options: DepartmentList } = GetDepartmentList(PaginationType.all, true)
  const { options: MaterialStatusList } = GetMaterialStatusList(PaginationType.all, true)
  const { data: detail } = GetMaterialInwardReturnableDetail(data.id)
  const selectedEmployeeId = watch('employeeId'); // Watch the employeeId field
  const [challanList, setChallanList] = useState([{ id: 0, challanNumber: "", challanImage_Base64: "" }]);

  useEffect(() => {
    if (selectedEmployeeId) {
      // Fetch user details based on the selected employee ID
      const fetchUserDetails = async () => {
        try {
          const result = await UserService.byId({ Id: selectedEmployeeId });
          const userData = result.data;
          setValue('Email', userData.emailId); // Set the email field
          setValue('DepartmentId', userData.departmentName); // Set the department field
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, [selectedEmployeeId, setValue]);

  console.log("🚀 ~ file: AddEditKey.jsx:123 ~ AddEditMaterialInwardReturnableModal ~ errors:", errors)
  useEffect(() => {
    if (open) {
      setValue('KeyDate', currentDateTime);
      setValue('dateAndTime', currentDateTime);
    }
  }, [open, setValue, currentDate, currentTime]);

  const [processing, setProcessing] = useState('');

  useEffect(() => {
    // Reset form fields and manage challanList based on the mode
    if ([FormModes.Edit, FormModes.View].includes(mode)) {
      // Reset form with existing data in Edit or View mode
      reset({
        ...detail,
        challanList: detail?.challanList || [{ id: 0, challanNumber: "", challanImage_Base64: "" }]
      });
      setChallanList(detail?.challanList || [{ id: 0, challanNumber: "", challanImage_Base64: "" }]);
    } else {
      // Initialize with a default challanList in Add mode
      reset({
        id: 0,
        shiftId: 0,
        dateAndTime: "",
        employeeId: null,
        senderCompanyName: "",
        senderName: "",
        address: "",
        transporterCompanyName: "",
        natureOfSupply: "",
        poNumber: "",
        materialName: "",
        quantity: 0,
        serialno: "",
        assetno: "",
        materialStatusId: null,
        remarks: "",
        challanList: [{ id: 0, challanNumber: "", challanImage_Base64: "" }]
      });
      setChallanList([{ id: 0, challanNumber: "", challanImage_Base64: "" }]);
    }
  }, [open, mode, detail]);

  // Handle form submission
  const submit = async (formData) => {
    console.log("api-data", formData);

    try {
      setProcessing("proccessing")
      const result = await MaterialInwardReturnableService.add(formData)
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

  // Add new row
  const addNewChallanRow = () => {
    setChallanList([...challanList, { id: 0, challanNumber: "", challanImage_Base64: "" }]);
  };

  // Remove a newly added row (only for rows without an `id`)
  const removeChallanRow = (index) => {
    setChallanList(challanList.filter((_, i) => i !== index));
  };

  return (
    <PopUpModal open={open}>
      <ModalHeader mode={mode} title="Material Inward Returnable" />
      <div className="p-4 w-[65vw] max-h-[500px] overflow-auto">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 ">
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
            required
            label="Employee Name"
            name="employeeId"
            options={UserList}
            errors={errors?.employeeId}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Email"
            name="Email"
            placeholder="Auto Populate"
            disabled
            errors={errors?.Email}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Department"
            name="DepartmentId"
            placeholder="Auto Populate"
            disabled
            className="col-span-2"
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Sender Company Name"
            name="senderCompanyName"
            required
            errors={errors?.senderCompanyName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Sender Name"
            name="senderName"
            required
            errors={errors?.senderName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Address"
            name="address"
            required
            errors={errors?.address}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Transporter Company Name"
            name="transporterCompanyName"
            required
            errors={errors?.transporterCompanyName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Nature of Supply"
            name="natureOfSupply"
            required
            errors={errors?.natureOfSupply}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="PO Number"
            name="poNumber"
            errors={errors?.poNumber}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Material Name"
            required
            name="materialName"
            errors={errors?.materialName}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="quantity"
            name="quantity"
            type="number"
            errors={errors?.quantity}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="serialno"
            name="serialno"
            errors={errors?.serialno}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="assetno"
            name="assetno"
            errors={errors?.assetno}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Returnable Date and Time"
            name="returnableDate"
            type="datetime-local"
            required
            errors={errors?.returnableDate}
          />
          <FormSelectField
            mode={mode}
            control={control}
            required
            label="Material Status"
            name="materialStatusId"
            options={MaterialStatusList}
            errors={errors?.materialStatusId}
          />
          <FormTextField
            mode={mode}
            control={control}
            label="Remarks"
            name="remarks"
            errors={errors?.remarks}
          />
          <div></div>
          {challanList.map((challan, index) => (
            <React.Fragment key={challan.id} className="">
              <FormTextField
                mode={mode}
                control={control}
                label={`Challan Number ${index + 1}`}
                name={`challanList[${index}].challanNumber`}
                required
                errors={errors?.challanList?.[index]?.challanNumber}
              />
              <FormUploadField
                mode={mode}
                setValue={setValue}
                label={`Challan Image ${index + 1}`}
                base64Name={`challanList[${index}].challanImage_Base64`}
                urlName={`challanList[${index}].challanImageURL`}
                orignalFileName={`challanList[${index}].challanOriginalFileName`}
                url={watch(`challanList[${index}].challanImageURL`)}
                className="col-span-2"
              />
              {index == 0 && (
                <div className='flex justify-center items-center'>
                  <CustomButton1
                    variant={"contained"}
                    size={"small"}
                    type={"button"}
                    className="text-white bg-prp-color"
                    onClick={addNewChallanRow}
                    label={" Add New Challan"}
                  />
                </div>
              )}

              {/* {(challan.id === 0) && (
                <div className='flex justify-center items-center'>
                  <CustomButton1
                    variant={"contained"}
                    size={"small"}
                    type={"button"}
                    className="text-white bg-red-500"
                    onClick={() => removeChallanRow(index)}
                    label={" Delete Row"}
                  />
                </div>
              )} */}

              {(challan.id !== 0 && index !== 0) && (
                <div className='flex justify-center items-center'>
                </div>
              )}

              {(challan.id === 0 && index !== 0) && (
                <div className='flex justify-center items-center'>
                  <CustomButton1
                    variant={"contained"}
                    size={"small"}
                    type={"button"}
                    className="text-white bg-red-500"
                    onClick={() => removeChallanRow(index)}
                    label={" Delete Row"}
                  />
                </div>
              )}

            </React.Fragment>
          ))}
        </div>
        </div>
        <SubmitCancelButtons
          mode={mode}
          loading={processing}
          onSubmit={handleSubmit(submit)}
          onCancel={() => onClose()}
        />
    </PopUpModal>
  );
};

