import React, { useState } from 'react'
// COMPONENTS
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomSelect1} from "components";

// ICONS
import {CustomDate} from "components";
import {Accordion} from "components";
import {CustomTextArea} from "components";
import { FiPlus } from "react-icons/fi";
import Button from "@mui/material/Button";
import {CustomNumber} from "components";
import {CustomEmail} from "components";
import { RiDeleteBinLine } from "react-icons/ri";
import {CustomUpload} from "components";
import {CustomImageUpload} from "components";
import {CustomInputNumber} from "components";
import {CustomCheckBox3} from "components";
import '../../../assets/css/selectbar.css';
import { theme } from 'layout';

export function EmployeeProfileAdd({ statusEmployeeAdd, setStatusEmployeeAdd, onSubmit, onCancel }) {
    let [checkboxWebUserEmployeeAdd, setCheckboxWebUserEmployeeAdd] = useState(true);
    let [checkboxMobileUserEmployeeAdd, setCheckboxMobileUserEmployeeAdd] = useState(true);

    const [compName, setCompName] = useState("");
    const [empCode, setEmpCode] = useState("");
    const [email, setEmail] = useState("");
    const [mobNo, setMobNo] = useState("");
    const [dob, setDob] = useState("");
    const [doj, setDoj] = useState("");
    const [compNo, setCompNo] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [pincodeTwo, setPincodeTow] = useState("");
    const [emgName, setEmgName] = useState("");
    const [emgNo, setEmgNo] = useState("");
    const [emgRel, setEmgRel] = useState("");
    const [adharNo, setAdharNo] = useState("");
    const [panNo, setPanNo] = useState("");
    const [otherProof, setOtherProof] = useState("");

    const [past_comp, setPast_Comp] = useState("");
    const [past_compErr, setPast_CompErr] = useState("");
    const [totalExp, setTotalExp] = useState("");
    const [totalExpErr, setTotalExpErr] = useState("");
    const [remark, setRemark] = useState("");
    const [remarkErr, setRemarkErr] = useState("");
    const [entries, setEntries] = useState([]);

    const handlePastCompChange = (e) => setPast_Comp(e.target.value);
    const handleTotalExpChange = (e) => setTotalExp(e.target.value);
    const handleRemarkChange = (e) => setRemark(e.target.value);

    const handleAddRow = () => {
        let hasError = false;

        if (past_comp.trim() === "") {
            setPast_CompErr("Field must be filled out");
            hasError = true;
        } else {
            setPast_CompErr("");
        }

        if (totalExp.trim() === "") {
            setTotalExpErr("Field must be filled out");
            hasError = true;
        } else {
            setTotalExpErr("");
        }

        if (remark.trim() === "") {
            setRemarkErr("Field must be filled out");
            hasError = true;
        } else {
            setRemarkErr("");
        }

        if (hasError) return;

        const newEntry = {
            past_comp,
            totalExp,
            remark,
        };
        setEntries([...entries, newEntry]);
        setPast_Comp("");
        setTotalExp("");
        setRemark("");
    };

    const handleDeleteRow = (indexToDelete) => {
        setEntries(entries.filter((_, index) => index !== indexToDelete));
    };

    return (
        <>
            <div className="bg-white min-w-[350px] pb-5 rounded-lg overflow-visible">
                <div className="flex justify-end">

                </div>
                <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                    <h1 className="text-l font-weight-[300]">Add Employee</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-4 gap-4 max-h-[70vh] overflow-y-auto max-w-full w-[1100px]">
                    <Accordion title={"Employee Details"}>
                        <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                            <CustomTextField2 label="Employee Name" placeholder="Enter"
                                value={compName}
                                onChange={setCompName}
                            />
                            <CustomTextField2 label="Employee Code" placeholder="Enter"
                                value={empCode}
                                onChange={setEmpCode}
                            />
                            <CustomEmail label="Email" isRequired={false} placeholder="Enter"
                                value={email}
                                onChange={setEmail}
                            />
                            <CustomNumber label="Mobile Number" placeholder="Enter"
                                value={mobNo}
                                onChange={setMobNo}
                            />
                            <CustomSelect1
                                label="Department"
                                isRequired={false}
                                placeholder="Enter"
                            />
                            <CustomSelect1 label="Role" />
                            <CustomSelect1 label="Reporting To" />
                            <CustomDate label="Date of Birth" />
                            <CustomDate label="Date of Joining" />

                            <CustomSelect1 label="Blood Group" />
                            <CustomSelect1 label="Gender" />
                            <CustomSelect1 label="Material Status" />
                            <CustomNumber label="Company Number" placeholder="Enter"
                                value={compNo}
                                onChange={setCompNo}
                            />
                        </div>
                    </Accordion>

                    <Accordion title="Permanent Address">
                        <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                            <CustomTextArea label="Address" placeholder="Enter"
                                value={address}
                                onChange={setAddress}
                            />
                            <CustomSelect1 label="Country" />
                            <CustomSelect1 label="State" />
                            <CustomSelect1 label="District" />
                            <CustomInputNumber label="Pin Code" placeholder="Enter"
                                value={pincode}
                                onChange={setPincode}
                            />
                        </div>
                    </Accordion>

                    <Accordion title="Temporary Address">
                        <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                            <CustomTextArea label="Address" placeholder="Enter" />
                            <CustomSelect1 label="Country" />
                            <CustomSelect1 label="State" />
                            <CustomSelect1 label="District" />
                            <CustomInputNumber label="Pin Code" placeholder="Enter"
                                value={pincodeTwo}
                                onChange={setPincodeTow}
                            />
                        </div>
                    </Accordion>

                    <Accordion title="Emergency ">
                        <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                            <CustomTextField2 label="Emergency Name" placeholder="Enter"
                                value={emgName}
                                onChange={setEmgName}
                            />
                            <CustomNumber label="Emergency Contact" placeholder="Enter"
                                value={emgNo}
                                onChange={setEmgNo}
                            />
                            <CustomTextField2 label="Emergency Relation" placeholder="Enter"
                                value={emgRel}
                                onChange={setEmgRel}
                            />
                        </div>
                    </Accordion>

                    <Accordion title="Other Details">
                        <div className="flex justify-end">
                            <Button
                                variant={"contained"}
                                size={"small"}
                                type="submit"
                                className={"flex gap-1 capitalize justify-center items-center bg-prp-color relative"}
                                onClick={handleAddRow}
                                style={{ backgroundColor: theme.colors.primary }}
                            >
                                <FiPlus />
                                <span className="whitespace-nowrap text-xs font-[400] font-Mitr uppercase">
                                    Add Row
                                </span>
                            </Button>
                        </div>
                        <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                            <div className="flex flex-col gap-1 relative">
                                <label htmlFor="id" className="text-xs font-[400] uppercase">
                                    Past Company Name<span className="text-red-500 gap-3">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={past_comp}
                                    className="p-2  border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs uppercase"
                                    id="id"
                                    placeholder="Enter"
                                    onChange={handlePastCompChange}
                                />
                                {past_compErr && <p className="absolute -bottom-4 text-xs font-normal " style={{ color: 'red' }}>{past_compErr}</p>}
                            </div>
                            <div className="flex flex-col gap-1 relative">
                                <label htmlFor="id" className="text-xs font-[400] uppercase">
                                    Total Exp<span className="text-red-500 gap-3">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={totalExp}
                                    className="p-2  border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs uppercase"
                                    id="id"
                                    placeholder="Enter"
                                    onChange={handleTotalExpChange}
                                />
                                {totalExpErr && <p className="absolute -bottom-4 text-xs font-normal" style={{ color: 'red' }}>{totalExpErr}</p>}
                            </div>
                            <div className="flex flex-col gap-1 relative">
                                <label htmlFor="id" className="text-xs font-[400] uppercase">
                                    Remark<span className="text-red-500 gap-3">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={remark}
                                    className="p-2  border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs uppercase"
                                    id="id"
                                    placeholder="Enter"
                                    onChange={handleRemarkChange}
                                />
                                {remarkErr && <p className="absolute -bottom-4 text-xs font-normal" style={{ color: 'red' }}>{remarkErr}</p>}
                            </div>
                        </div>

                        <div className="w-full mb-4 mt-4 overflow-hidden rounded">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-center ">
                                        <tr className="text-center text-md  text-gray-900 bg-gray-100 uppercase border border-gray-200 border-collapse">
                                            <td className="text-xs py-2 border border-gray-200"> S. No </td>
                                            <td className="text-xs py-2 border border-gray-200"> Past Company Name </td>
                                            <td className="text-xs py-2 border border-gray-200"> Total Exp </td>
                                            <td className="text-xs py-2 border border-gray-200"> Remark </td>
                                            <td className="text-xs py-2 border border-gray-200"> Action </td>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {entries.map((entry, index) => (
                                            <tr key={index} className="text-xs text-center border border-gray-200 border-collapse text-gray-600">
                                                <td className="text-xs border border-gray-200">{index + 1}</td>
                                                <td className="text-xs border border-gray-200">{entry.past_comp}</td>
                                                <td className="text-xs border border-gray-200">{entry.totalExp}</td>
                                                <td className="text-xs border border-gray-200">{entry.remark}</td>
                                                <td className="flex items-center justify-center">
                                                    {/* <RiDeleteBinLine /> delete  */}
                                                    <button className="bg-prp-color text-white p-2 rounded" onClick={() => handleDeleteRow(index)}>
                                                        <RiDeleteBinLine />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                        <div className="grid grid-cols-1  gap-4 md:grid-cols-3 ">
                            <CustomUpload id="addhar-number-add" isRequired={false} label="Addhar Number" />
                            <CustomUpload id="pan-upload-add" isRequired={false} label="PAN No." />
                            <CustomUpload id="other-proof-upload-add" isRequired={false} label="Other Proof" />
                            <CustomCheckBox3
                                label={"Is Web User"}
                                state={checkboxWebUserEmployeeAdd}
                                setState={setCheckboxWebUserEmployeeAdd}
                            >
                            </CustomCheckBox3>
                            <CustomCheckBox3
                                label={"Is Mobile User"}
                                state={checkboxMobileUserEmployeeAdd}
                                setState={setCheckboxMobileUserEmployeeAdd}
                            >
                            </CustomCheckBox3>
                            <CustomCheckBox3
                                label={"Is Active"}
                                state={statusEmployeeAdd}
                                setState={setStatusEmployeeAdd}
                            >
                            </CustomCheckBox3>
                            <CustomImageUpload id="image-upload-add" isRequired={false} label="Image Upload" />
                        </div>
                    </Accordion>
                </div>

                <div className="flex justify-center gap-5 mt-5">
                    <div>
                        <CustomButton1 label={"Submit"} className="text-white bg-prp-color" onClick={onSubmit} />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} className="text-white bg-prp-color" onClick={onSubmit} />
                    </div>
                </div>
            </div>
        </>
    )
}
