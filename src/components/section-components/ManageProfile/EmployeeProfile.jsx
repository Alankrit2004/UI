// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import { CustomButton1 } from "components";

// ICONS
import { IoMdAdd } from "react-icons/io";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from "context";
import { AppTable, FormCheckBox, FormSelectField, FormUploadField, FormTextField, FormTextArea, ModalHeader, PopUpModal, SubmitCancelButtons, TableHeaderBox } from "elements";
import { UserService, RoleService, FormModes, NotificationStatus, PaginationType } from "utility";
import { GetUserDetail, reactToaster, GetReportingToEmpListForSelectList } from "hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { GetBranchList, GetRoleListEmp, GetRoleDetail, GetDepartmentList, GetCompanyList, GetTerritories_State_Dist_City_Area_List_ById, GetUserList, GetBloodGroupList } from "hooks";
import { useNavigate } from "react-router-dom";
import { getSinglePermission } from "helpers";
// import { useAuth } from "context";

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const UserSchema = yup.object().shape({
  companyId: yup.string().nullable(),
  departmentId: yup.string().nullable(),
  userCode: yup.string().required("EMPLOYEE CODE  is Required"),
  userName: yup.string().required("EMPLOYEE name  is Required"),
  mobileNumber: yup.string().test(
    "len",
    "Mobile Number length should be 10",
    (val) => val.length === 10
  ).required("mobile Number  is Required"),
  emailId: yup.string().email("Email should be valid").required("EMPLOYEE email  is Required"),
  password: yup.string().nullable(),
  userType: yup.string(),
  roleId: yup.string().nullable(),
  reportingTo: yup.string().nullable(),
  addressLine: yup.string(),
  regionId: yup.string().nullable(),
  stateId: yup.string().nullable(),
  districtId: yup.string().nullable(),
  reportingId: yup.string().nullable(),
  cityId: yup.string().nullable(),
  areaId: yup.string().nullable(),
  pincode: yup
    .string()
    .nullable()
    .notRequired() // Make it optional
    .test('is-valid-pincode', 'PIN code must be exactly 6 digits', (value) => {
      // Only validate if there's a value
      if (!value) return true; // If empty, return true (no validation)
      return /^\d{6}$/.test(value); // Validate against the regex
    }),
  emergencyContactNumber: yup
    .string()
    .nullable()
    .notRequired()
    .test('is-valid-emergency-contact', 'Emergency contact number must be exactly 10 digits', (value) => {
      // Only validate if there's a value
      if (!value) return true; // If empty, return true (no validation)
      return /^\d{10}$/.test(value); // Validate against the regex
    }),
  dateOfBirth: yup.date().nullable(),
  dateOfJoining: yup.date().nullable(),

  bloodGroup: yup.string(),
  mobileUniqueId: yup.string(),
  // aadharNumber: yup.string(),
  aadharNumber: yup
    .string()
    .nullable()
    .test("len", "Aadhaar Number length should be 12 digits", (val) => {
      return val === null || val === "" || val.length === 12;
    }),
  aadharImage: yup.string(),
  aadharImage_Base64: yup.string(),
  aadharOriginalFileName: yup.string().nullable(),
  // panNumber: yup.string().nullable(),
  panNumber: yup
    .string()
    .nullable(),
  panCardImage: yup.string(),
  panCardImage_Base64: yup.string(),
  panCardOriginalFileName: yup.string().nullable(),
  profileImage: yup.string().nullable(),
  profileImage_Base64: yup.string(),
  profileOriginalFileName: yup.string().nullable(),
  isMobileUser: yup.boolean(),
  isWebUser: yup.boolean(),
  isActive: yup.boolean(),
})

export function EmployeeProfile() {
  const { user } = useAuth()
  const [Permission, setPermission] = useState({ add: true, view: true, edit: true })

  useEffect(() => {
    if (Number(user?.roleId) !== 1) {
      setPermission(getSinglePermission(user?.userRoleList, "ADMIN PROFILE"))
    }
  }, [user])

  const [openPopUpModel, setPopUpModel] = useState({
    open: false,
    data: {},
    mode: ""
  })
  const { data, loading, refresh, filter, totalCount, pageChanged, filterChanged } = GetUserList()
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
  const navigate = useNavigate();


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
      header: "Manage Access",
      action: true,
      onNavigate: (data) => navigate(`employee-permission/${data?.id}`, data)
    },
    { header: "EMPLOYEE CODE", field: "userCode" },
    { header: "EMPLOYEE NAME", field: "userName" },
    { header: "mobile", field: "mobileNumber" },
    {
      header: 'MOBILE USER ?',
      field: "isMobileUser",
      render: (data) => (
        <div>
          {
            data ?
              (<span className="bg-green-600 px-1 rounded-md text-white">YES</span>) :
              (<span className="bg-red-600 text-white px-1 rounded-md">NO</span>)
          }
        </div>
      )
    },
    {
      header: 'WEB USER ?',
      field: "isWebUser",
      render: (data) => (
        <div>
          {
            data ?
              (<span className="bg-green-600 px-1 rounded-md text-white">YES</span>) :
              (<span className="bg-red-600 text-white px-1 rounded-md">NO</span>)
          }
        </div>
      )
    },
    { header: "EMAIL ID	", field: "emailId" },
    { header: "role	", field: "roleName" },
    { header: "REPORTING TO	", field: "reportingToName" },
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
          data={data?.filter(user => user.isActive === true)}  // Filter the data here
          loading={loading}
          pageNo={filter.pageNo}
          pageSize={filter.pageSize}
          totalCount={totalCount}
          pageChanged={pageChanged}
        />
      )}
      {(Permission.add || Permission.edit || Permission.view) && (
        <AddEditUserModel
          open={openPopUpModel.open}
          data={openPopUpModel.data}
          mode={openPopUpModel.mode}
          onSubmit={onSubmit}
        />
      )}
    </>
  )
}

const AddEditUserModel = ({ mode, open, onSubmit, data }) => {
  const { user } = useAuth()
  console.log("🚀 ~ file: User.jsx:121 ~ AddEditUserModel ~ user:", user)
  const { data: detail } = GetUserDetail(data.id)
  const [proccessing, setProcessing] = useState('');
  const { regionList,
    stateList,
    districtList,
    cityList,
    statefilterChanged,
    districtfilterChanged,
    regionfilterChanged } = GetTerritories_State_Dist_City_Area_List_ById(PaginationType.all)
  const { options: CompanyList } = GetCompanyList(PaginationType.all, true)
  // const { options: RoleList } = GetRoleListEmp(PaginationType.all)
  const { options: BranchList } = GetBranchList(PaginationType.all, true)
  const { options: BloodGroupList } = GetBloodGroupList(PaginationType.all, true)
  const { options: DepartmentList } = GetDepartmentList(PaginationType.all, true)
  // const { options: ReportingToList } = GetReportingToEmpListForSelectList(PaginationType.all)

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  })
  console.log("🚀 ~ file: EmployeeProfile.jsx:202 ~ AddEditUserModel ~ errors:", errors)
  const aadharImageURL = watch("aadharImageURL")
  const panCardImageURL = watch("panCardImageURL")
  const profileImageURL = watch("profileImageURL")
  const regionId = watch("regionId")
  const stateId = watch("stateId")
  const districtId = watch("districtId")
  const roleId = watch("roleId")
  const dateOfBirth = watch("dateOfBirth")
  const departmentId = watch("departmentId"); // Watch for department selection

  const { options: RoleList, refresh: roleRefresh, filterChanged } = GetRoleListEmp(PaginationType.all, true, departmentId);
  // const { data: RoleDetail, refresh: roleIdrefresh } = GetRoleDetail(roleId)
  // console.log("🚀 ~ file: EmployeeProfile.jsx:223 ~ AddEditUserModel ~ RoleDetail:", RoleDetail)

  // useEffect(() => {
  //   if (!roleId === 0 || !roleId === null) {
  //     roleIdrefresh()
  //   }
  // }, [roleId])

  useEffect(() => {
    if (departmentId) {
      filterChanged({ departmentId }); // Trigger role filtering based on departmentId
    }
  }, [departmentId]);

  // const roleId = watch("roleId");

  // Fetch ReportingToList based on roleId
  const { options: ReportingToList, refresh: refreshReportingToList } = GetReportingToEmpListForSelectList(roleId);

  useEffect(() => {
    if (roleId) {
      refreshReportingToList(); // Fetch updated ReportingTo list when roleId changes
    }
  }, [roleId]);

  // useEffect(() => {
  //   if (RoleDetail.employeeLevel) {
  //     setValue("employeeLevel", RoleDetail.employeeLevel, { shouldValidate: true, shouldDirty: true });
  //   }
  // }, [RoleDetail.employeeLevel])
  useEffect(() => {
    if (roleId) {
      // Fetch user details based on the selected employee ID
      const fetchRoleDetails = async () => {
        try {
          const result = await RoleService.byId({ Id: roleId });
          const roleData = result.data;
          setValue('employeeLevel', roleData.employeeLevel); // Set the department field
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchRoleDetails();
    }
  }, [roleId, setValue]);
  useEffect(() => {
    if (!user?.companyId === 0 || !user?.companyId === undefined) {
      setValue("companyId", user?.companyId, { shouldValidate: true, shouldDirty: true });
    }
  }, [user?.companyId])
  console.log("🚀 ~ file: EmployeeProfile.jsx:240 ~ AddEditUserModel ~ user?.companyId:", user?.companyId)
  useEffect(() => {
    if (regionId) {
      regionfilterChanged({ regionId: Number(regionId) })
    }
  }, [regionId])
  useEffect(() => {
    if (regionId && stateId) {
      statefilterChanged({ regionId: Number(regionId), stateId: Number(stateId) })
    }
  }, [stateId, regionId])
  useEffect(() => {
    if (regionId && regionId && districtId) {
      districtfilterChanged({ regionId: Number(regionId), stateId: Number(stateId), districtId: Number(districtId) })
    }
  }, [districtId, regionId, stateId])

  useEffect(() => {
    if ([FormModes.Edit, FormModes.View].includes(mode)) {
      reset({
        ...detail
      })
    } else {
      reset({
        id: 0,
        companyId: 0,
        departmentId: 0,
        userCode: "",
        userName: "",
        mobileNumber: null,
        emailId: "",
        password: null,
        userType: 0,
        roleId: null,
        reportingTo: 0,
        addressLine: "",
        regionId: 0,
        stateId: 0,
        districtId: 0,
        cityId: 0,
        areaId: 0,
        pincode: null,
        dateOfBirth: null,
        dateOfJoining: null,
        emergencyContactNumber: null,
        bloodGroup: 0,
        mobileUniqueId: 0,
        aadharNumber: "",
        aadharImage: "",
        aadharImage_Base64: "",
        aadharOriginalFileName: "",
        panNumber: "",
        panCardImage: "",
        panCardImage_Base64: "",
        panCardOriginalFileName: "",
        profileImage: 0,
        profileImage_Base64: "",
        profileOriginalFileName: "",
        isMobileUser: true,
        isWebUser: true,
        isActive: true,
        branchList: [
          {
            id: 0,
            branchId: 0
          }
        ]
      })
    }
  }, [detail, mode, open])

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  };

  const submit = async (formData) => {
    try {
      setProcessing("proccessing");

      // Adjust the dates to avoid timezone differences
      const adjustedData = {
        ...formData,
        dateOfBirth: formatDate(formData.dateOfBirth),
        dateOfJoining: formatDate(formData.dateOfJoining),
        emergencyContactNumber: formData.emergencyContactNumber?.trim() ? formData.emergencyContactNumber : null,
        pincode: formData.pincode?.trim() ? formData.pincode : null,
        branchList: formData.branchList.filter(branch => branch.branchId != null) // Remove branches with null ID
      };

      console.log("api_data-->", adjustedData);

      const result = await UserService.add(adjustedData);
      reactToaster(result.message, NotificationStatus.success);
      onSubmit(result);
    } catch {
      reactToaster(NotificationStatus.error)
    } finally {
      setProcessing('')
    }
  }

  return (
    <PopUpModal open={open}>
      <ModalHeader mode={mode} title="EMPLOYEE" />
      <div className=" max-h-[65vh] overflow-y-auto p-4 w-[65vw]  ">
        <div className="grid grid-cols-2 gap-2  gap-x-4 gap-y-3 md:grid-cols-3 ">                    <div>
          <FormTextField
            mode={mode}
            control={control}
            label="EMPLOYEE Name"
            name="userName"
            required
            placeholder="enter User Name"
            errors={errors?.userName}
            defaultValue=""
            className="col-span-2"
          />
        </div>
          <FormTextField
            mode={mode}
            control={control}
            label="EMPLOYEE CODE"
            name="userCode"
            required
            placeholder="enter User Name"
            errors={errors?.userCode}
            defaultValue=""
            className="col-span-2"
          />
          <FormTextField
            mode={mode}
            control={control}
            label="mobile#"
            name="mobileNumber"
            maxLength={10}
            type="number"
            required
            placeholder="enter mobile#"
            errors={errors?.mobileNumber}
            defaultValue=""
            className="col-span-2"
          />
          <FormTextField
            mode={mode}
            control={control}
            required
            label="email"
            name="emailId"
            placeholder="enter email"
            errors={errors?.emailId}
            defaultValue=""
            className="col-span-2"
          />
          <div>
            <FormSelectField
              mode={mode}
              control={control}
              label="COMPANY"
              name="companyId"
              readOnly={!user?.companyId === 0}
              options={CompanyList}
              placeholder="select COMPANY"
              errors={errors?.companyId}
              defaultValue=""
              className="col-span-2"
            ></FormSelectField>
          </div>
          <div>
            <FormSelectField
              mode={mode}
              control={control}
              label="BRANCH"
              name="branchList[0].branchId"
              options={BranchList}
              placeholder="select BRANCH"
              errors={errors?.branchId}
              defaultValue=""
              className="col-span-2"
            ></FormSelectField>
          </div>
          <div>
            <FormSelectField
              mode={mode}
              control={control}
              label="Department"
              name="departmentId"
              options={DepartmentList}
              placeholder="select Department"
              errors={errors?.departmentId}
              defaultValue=""
              className="col-span-2"
            ></FormSelectField>
          </div>
          <div>
            <FormSelectField
              mode={mode}
              control={control}
              label="ROLE NAME"
              name="roleId"
              options={RoleList}
              placeholder="select ROLE NAME"
              errors={errors?.roleId}
              defaultValue=""
              className="col-span-2"
            ></FormSelectField>
          </div>
          <div>
            <FormTextField
              mode={mode}
              control={control}
              name="employeeLevel"
              label="EMPLOYEE TYPE"
              placeholder="Auto populate"
              disabled
              className="col-span-2"
            ></FormTextField>
          </div>
          <div>
            <FormSelectField
              mode={mode}
              control={control}
              label="REPORTING TO"
              name="reportingTo"
              options={ReportingToList}
              placeholder="select REPORTING TO"
              errors={errors?.reportingId}
              defaultValue=""
              className="col-span-2"
            ></FormSelectField>
          </div>

          <FormTextArea
            control={control}
            label="address"
            type="textarea"
            name="addressLine"
            placeholder="enter address"
            errors={errors?.addressLine}
            defaultValue=""
            className="col-span-2"
          />
          <FormSelectField
            mode={mode}
            control={control}
            label="region"
            name="regionId"
            options={regionList}
            handelOnChenge={() => {
              setValue("stateId", 0, { shouldValidate: true, shouldDirty: true });
              setValue("districtId", 0, { shouldValidate: true, shouldDirty: true });
              setValue("cityId", 0, { shouldValidate: true, shouldDirty: true });
            }}
            placeholder="select region"
            errors={errors?.regionId}
            valueId="value"
            optionlabel="text"
            defaultValue=""
            className="col-span-2"
          ></FormSelectField>
          <FormSelectField
            mode={mode}
            control={control}
            label="state"
            name="stateId"
            readOnly={regionId === 0 || regionId === null}
            options={stateList}
            placeholder="select state"
            handelOnChenge={() => {
              setValue("districtId", 0, { shouldValidate: true, shouldDirty: true });
              setValue("cityId", 0, { shouldValidate: true, shouldDirty: true });
            }}
            errors={errors?.stateId}
            valueId="value"
            optionlabel="text"
            defaultValue=""
            className="col-span-2"
          ></FormSelectField>
          <FormSelectField
            mode={mode}
            control={control}
            label="district"
            name="districtId"
            options={districtList}
            handelOnChenge={() => {
              setValue("cityId", 0, { shouldValidate: true, shouldDirty: true });
            }}
            readOnly={stateId === 0 || stateId === null}
            placeholder="select district"
            errors={errors?.districtId}
            valueId="value"
            optionlabel="text"
            defaultValue=""
            className="col-span-2"
          ></FormSelectField>
          <FormSelectField
            mode={mode}
            control={control}
            label="city"
            name="cityId"
            options={cityList}
            readOnly={districtId === 0 || districtId === null}
            placeholder="select city"
            errors={errors?.cityId}
            valueId="value"
            optionlabel="text"
            defaultValue=""
            className="col-span-2"
          ></FormSelectField>
          <FormTextField
            mode={mode}
            control={control}
            label="PINCODE"
            name="pincode"
            maxLength={6}
            type="text"
            placeholder="enter PINCODE"
            errors={errors?.pincode}
            defaultValue=""
            className="col-span-2"
          />
          <FormTextField
            mode={mode}
            control={control}
            label="date Of Birth"
            name="dateOfBirth"
            type="date"
            value={dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : ''}
            placeholder="enter date Of Birth"
            errors={errors?.dateOfBirth}
            defaultValue=""
            className="col-span-2"
          />

          <FormTextField
            mode={mode}
            control={control}
            label="date Of joining"
            name="dateOfJoining"
            // value={dateOfJoining ? new Date(dateOfJoining).toISOString().split('T')[0] : ''}
            type="date"
            placeholder="enter date Of joining"
            errors={errors?.dateOfJoining}
            defaultValue=""
            className="col-span-2"
          />
          <FormTextField
            mode={mode}
            control={control}
            label="EMERGENCY CONTACT NUMBER"
            name="emergencyContactNumber"
            maxLength={10}
            type="text"
            placeholder="enter EMERGENCY CONTACT NUMBER"
            errors={errors?.emergencyContactNumber}
            defaultValue=""
            className="col-span-2"
          />
          <div>
            <FormSelectField
              mode={mode}
              control={control}
              label="BLOOD GROUP"
              name="bloodGroup"
              options={BloodGroupList}
              placeholder="select BLOOD GROUP"
              errors={errors?.bloodGroup}
              defaultValue=""
              className="col-span-2"
            ></FormSelectField>
          </div>
          <FormTextField
            mode={mode}
            control={control}
            label="password"
            placeholder="enter password"
            name="password"
            errors={errors?.password}
            defaultValue=""
            className="col-span-2"
          />
          <FormTextField
            mode={mode}
            control={control}
            label="MOBILE UNIQUE ID"
            placeholder="enter MOBILE UNIQUE ID"
            name="mobileUniqueId"
            errors={errors?.mobileUniqueId}
            defaultValue=""
            className="col-span-2"
          />

          <FormTextField
            mode={mode}
            control={control}
            label="aadhar Number"
            placeholder="enter aadhar Number"
            name="aadharNumber"
            type="number"
            maxLength={12}
            errors={errors?.aadharNumber}
            defaultValue=""
            className="col-span-2"
          />
          <FormTextField
            mode={mode}
            control={control}
            label="pan Number"
            placeholder="enter pan Number"
            name="panNumber"
            errors={errors?.panNumber}
            defaultValue=""
            className="col-span-2"
          />
          <div className="mt-4">
            <FormUploadField
              mode={mode}
              setValue={setValue}
              label="PROFILE PHOTO"
              base64Name="profileImage_Base64"
              urlName="profileImageURL"
              orignalFileName="profileOriginalFileName"
              url={profileImageURL}
              className="col-span-2"
            />
          </div>
          <div className="mt-4">
            <FormUploadField
              mode={mode}
              setValue={setValue}
              label="AADHAAR CARD"
              base64Name="aadharImage_Base64"
              urlName="aadharImageURL"
              orignalFileName="aadharOriginalFileName"
              url={aadharImageURL}
              className="col-span-2"
            />
          </div>
          <div className="mt-4">
            <FormUploadField
              mode={mode}
              setValue={setValue}
              label="PAN CARD"
              base64Name="panCardImage_Base64"
              urlName="panCardImageURL"
              orignalFileName="panCardOriginalFileName"
              url={panCardImageURL}
              className="col-span-2"
            />
          </div>
          <div className="mt-3">
            <FormCheckBox
              mode={mode}
              control={control}
              label={"Is Active"}
              name="isActive"
              errors={errors?.isActive}
              defaultValue={false}
              className={`${errors.User && "mb-6"} col-span-1`}
            />
          </div>
          <div className="mt-3">
            <FormCheckBox
              mode={mode}
              control={control}
              label={"is Mobile User"}
              name="isMobileUser"
              errors={errors?.isMobileUser}
              defaultValue={false}
              className={`${errors.User && "mb-6"} col-span-1`}
            />
          </div>
          <div className="mt-3">
            <FormCheckBox
              mode={mode}
              control={control}
              label={"is Web User"}
              name="isWebUser"
              errors={errors?.isWebUser}
              defaultValue={false}
              className={`${errors.User && "mb-6"} col-span-1`}
            />
          </div>
        </div>
      </div>
      <SubmitCancelButtons
        mode={mode}
        loading={proccessing}
        onSubmit={handleSubmit(submit)}
        onCancel={() => onSubmit(false)}
      />
    </PopUpModal >
  )
}
