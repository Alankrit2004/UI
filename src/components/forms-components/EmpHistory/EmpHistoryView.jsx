import * as React from "react";
import { useState } from "react";
import { CustomButton1 } from "components";
import { CustomCheckBox2 } from "components";
import { Accordion } from "components"; import { CustomViewLabel } from "components";

export function EmpHistoryView({ statusEmployeeHistoryView, setStatusEmployeeHistoryView, onCancel }) {

    let [checkboxWebUserEmployeeView, setCheckboxWebUserEmployeeView] = useState(true);
    let [checkboxMobileUserEmployeeView, setCheckboxMobileUserEmployeeView] = useState(true);

    const employeeHistoryData = [
        {
            id: 1,
            name: "Lorem ipsum",
            employeCode: "",
            emailId: "Lorem ipsum",
            mobileNo: "Lorem ipsum",
            department: "Lorem ipsum",
            role: "Lorem ipsum",
            reportingTo: "Lorem ipsum",
            dateOfBirth: "Lorem ipsum",
            dateOfJoin: "Lorem ipsum",
            bloodGroup: "Lorem ipsum",
            gender: "Lorem ipsum",
            meterialStatus: "Lorem ipsum",
            companyNumber: "Lorem ipsum",

            address: "Lorem ipsum",
            region: "Lorem ipsum",
            state: "Lorem ipsum",
            district: "Lorem ipsum",
            city: "Lorem ipsum",
            pincode: "Lorem ipsum",

            T_address: "Lorem ipsum",
            T_region: "Lorem ipsum",
            T_state: "Lorem ipsum",
            T_district: "Lorem ipsum",
            T_city: "Lorem ipsum",
            T_pincode: "Lorem ipsum",

            emr_name: "Lorem ipsum",
            emr_con: "Lorem ipsum",
            emr_rel: "Lorem ipsum",

            past_comp: "Lorem ipsum",
            total_exp: "Lorem ipsum",
            remark: "Lorem ipsum",
            adhar_no: "Lorem ipsum",
            pan_no: "Lorem ipsum",
            otherProof: "Lorem ipsum",
            img_upload: "Lorem ipsum",
            createdDate: "10/08/2023",
            createdBy: "Admin"
        },
    ];

    return (
        <>
            <div className="bg-white min-w-[350px] pb-5 rounded-lg overflow-visible">
                <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                    <h1 className="text-l font-weight-[300]">View Employee History</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                {employeeHistoryData.map((emp, index) => (
                    <div key={index} className="p-4 gap-4 max-h-[70vh] overflow-y-auto ">
                        <Accordion title={"Employee Details"}>
                            <div className="grid grid-cols-1  gap-4 md:grid-cols-3 max-w-full w-[1100px]">

                                <CustomViewLabel label="Employee Name" value={emp.name} />
                                <CustomViewLabel label="Employee Code" value={emp.employeCode} />
                                <CustomViewLabel label="Email" value={emp.emailId} />
                                <CustomViewLabel label="Mobile Number" value={emp.mobileNo} />
                                <CustomViewLabel label="Department" value={emp.department} />
                                <CustomViewLabel label="Role" value={emp.role} />
                                <CustomViewLabel label="Reporting To" value={emp.reportingTo} />
                                <CustomViewLabel label="Date of Birth" value={emp.dateOfBirth} />
                                <CustomViewLabel label="Date of Joining" value={emp.dateOfJoin} />
                                <CustomViewLabel label="Blood Group" value={emp.bloodGroup} />
                                <CustomViewLabel label="Gender" value={emp.gender} />
                                <CustomViewLabel label="Material Status" value={emp.meterialStatus} />
                                <CustomViewLabel label="Company Number" value={emp.companyNumber} />
                            </div>
                        </Accordion>

                        <Accordion title="Permanent Address">
                            <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                                <CustomViewLabel label="Address" value={emp.address} />
                                <CustomViewLabel label="Region" value={emp.region} />
                                <CustomViewLabel label="State" value={emp.state} />
                                <CustomViewLabel label="District" value={emp.district} />
                                <CustomViewLabel label="City" value={emp.city} />
                                <CustomViewLabel label="Company Number" value={emp.pincode} />
                            </div>
                        </Accordion>
                        <Accordion title="Temporary Address">
                            <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                                <CustomViewLabel label="Address" value={emp.T_address} />
                                <CustomViewLabel label="Region" value={emp.T_region} />
                                <CustomViewLabel label="State" value={emp.T_state} />
                                <CustomViewLabel label="District" value={emp.T_district} />
                                <CustomViewLabel label="City" value={emp.T_city} />
                                <CustomViewLabel label="Company Number" value={emp.T_pincode} />
                            </div>
                        </Accordion>
                        <Accordion title="Emergency ">
                            <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                                <CustomViewLabel label="Emergency Name" value={emp.emr_name} />
                                <CustomViewLabel label="Emergency Contact" value={emp.emr_con} />
                                <CustomViewLabel label="Emergency Relation" value={emp.emr_rel} />
                            </div>
                        </Accordion>
                        <Accordion title="Other Details">

                            <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                                <CustomViewLabel label="Past Company Name" value={emp.past_comp} />
                                <CustomViewLabel label="Total Exp" value={emp.total_exp} />
                                <CustomViewLabel label="Remarks" value={emp.remark} />

                                <CustomViewLabel label="Addhar Number" value={emp.adhar_no} />
                                <CustomViewLabel label="PAN No." value={emp.pan_no} />
                                <CustomViewLabel label=" Other Proof" value={emp.otherProof} />
                                <CustomCheckBox2
                                    label={"Is Web User"}
                                    state={checkboxWebUserEmployeeView}
                                    setState={setCheckboxWebUserEmployeeView}
                                    disabled={true}
                                ></CustomCheckBox2>

                                <CustomCheckBox2
                                    label={" Is Mobile User"}
                                    state={checkboxMobileUserEmployeeView}
                                    setState={setCheckboxMobileUserEmployeeView}
                                    disabled={true}
                                ></CustomCheckBox2>

                                <CustomCheckBox2
                                    label={"Is Active"}
                                    state={statusEmployeeHistoryView}
                                    setState={setStatusEmployeeHistoryView}
                                    disabled={true}
                                ></CustomCheckBox2>

                                <CustomViewLabel label="Image Upload" value={emp.img_upload} />
                            </div>
                        </Accordion>
                    </div>
                ))}

                <div className="flex justify-center gap-5 mt-5">
                    <div>
                        <CustomButton1
                            label={"Cancel"}
                            variant="outlined"
                            className="txt-prp-color"
                            onClick={onCancel}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
