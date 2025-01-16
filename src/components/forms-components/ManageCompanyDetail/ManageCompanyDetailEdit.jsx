// CORE
import * as React from "react";
import { useState, useEffect } from "react";

import {CustomTextField2} from "components";
import {CustomSelect1} from "components";
import {CustomCheckBox2} from "components";
import {CustomEmail} from "components";
import {CustomTextArea} from "components";
import {CustomImageUpload} from "components";
import {CustomButton1} from "components";
import {CustomNumber} from "components";
import {CustomInputNumber} from "components";
import {CustomAlphatext } from "components";

export const ManageCompanyDetailEdit = ({ checkboxCompanyNameEdit, setCheckboxCompanyNameEdit, onSubmit, onCancel }) => {

    const [compName, setCompName] = useState("");
    const [regNo, setRegNo] = useState("");
    const [conNo, setConNo] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [gstNo, setGSTNo] = useState("");
    const [panNo, setPanNo] = useState("");
    const [texNo, setTaxNo] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [userNo, setUserNo] = useState("");
    const [branchNo, setBranchNo] = useState("");
    const [img, setImg] = useState("");

    return (
        <div className="pb-10 bg-white rounded-lg">
            <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                <h1 className="text-xl font-weight-[400]">Edit Company</h1>
                <div className="flex item-center text-sm"></div>
            </div>

            <div className="p-2 mx-auto overflow-scroll overflow-x-auto" style={{ maxHeight: "500px" }}>
                <table className="max-w-full popup-table w-[1100px]">
                    <tbody>
                        <tr>
                            <td>
                                <CustomTextField2 label={"Company Name"} placeholder={"ENTER"}
                                    value={compName}
                                    onChange={setCompName}
                                />
                            </td>
                            <td>
                                <CustomSelect1 label={"Company type"} placeholder={"ENTER"}

                                />
                            </td>
                            <td>
                                <CustomAlphatext label={"Registration number"} placeholder={"ENTER"}
                                    value={regNo}
                                    onChange={setRegNo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <CustomNumber label={"Contact Number"} placeholder={"ENTER"}
                                    value={conNo}
                                    onChange={setConNo}
                                />
                            </td>
                            <td>
                                <CustomEmail label="Email" placeholder="Enter"
                                    value={email}
                                    onChange={setEmail}
                                />
                            </td>
                            <td>
                                <CustomTextField2 label={"Website"} placeholder={"ENTER"}
                                    value={website}
                                    onChange={setWebsite}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <CustomAlphatext label={"GST Number"} placeholder={"ENTER"}
                                    value={gstNo}
                                    onChange={setGSTNo}
                                />
                            </td>
                            <td>
                                <CustomAlphatext label={"Pan Number"} placeholder={"ENTER"}
                                    value={panNo}
                                    onChange={setPanNo}
                                />
                            </td>
                            <td>
                                <CustomAlphatext label={"Tax Number / CIN"} placeholder={"ENTER"}
                                    value={texNo}
                                    onChange={setTaxNo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <CustomTextArea label={"Address"} placeholder={"ENTER"}
                                    value={address}
                                    onChange={setAddress}
                                />
                            </td>
                            <td>
                                <CustomSelect1 label={"Country"} placeholder={"ENTER"}

                                />
                            </td>
                            <td>
                                <CustomSelect1 label={"State"} placeholder={"ENTER"}

                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <CustomSelect1 label={"District"} placeholder={"ENTER"}

                                />
                            </td>
                            <td>
                                <CustomInputNumber label={"Pin code"} placeholder={"ENTER"}
                                    value={pinCode}
                                    onChange={setPinCode}
                                />
                            </td>
                            <td>
                                <CustomInputNumber label={"Total Number of User"} placeholder={"ENTER"}
                                    value={userNo}
                                    onChange={setUserNo}
                                />
                            </td>
                        </tr>
                        <tr>

                            <td>
                                <CustomInputNumber label={"Total branches"} placeholder={"ENTER"}
                                    value={branchNo}
                                    onChange={setBranchNo}
                                />
                            </td>
                            <td>
                                <CustomImageUpload id="image-upload-mnc-add" label="Image Upload"
                                    value={img}
                                    onChange={setImg}
                                />
                            </td>
                            <td>
                                <CustomCheckBox2
                                    label={"Is Active"}
                                    state={checkboxCompanyNameEdit}
                                    setState={setCheckboxCompanyNameEdit}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center gap-5">
                <div>
                    <CustomButton1 label={"Update"} className="text-white bg-prp-color" onClick={onSubmit} />
                </div>
                <div onClick={onCancel}>
                    <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                </div>
            </div>
        </div>
    );
};


