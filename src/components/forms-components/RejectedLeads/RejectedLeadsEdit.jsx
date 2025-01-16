// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomCheckBox2} from "components";
import {CustomSelect1} from "components";
import {CustomNumber} from "components";
import {CustomEmail} from "components";
import {CustomPassword} from "components"

export function RejectedLeadsEdit({ onCancel }) {
    const [checkbox, setCheckbox] = useState(true);
    const [compName, setCompName] = useState("");
    const [conNo, setConNo] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [loginNo, setloginNo] = useState("");
    const [password, setPassowrd] = useState("");


    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                    <h1 className="text-l font-weight-[300]">Edit Rejected Leads</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-2 mx-auto">
                    <table className="max-w-full popup-table w-[900px]">
                        <tbody>
                            <tr>
                                <td>
                                    <CustomTextField2
                                        label={"Company Name"}
                                        placeholder={"ENTER"}
                                        value={compName}
                                        onChange={setCompName}
                                    ></CustomTextField2>
                                </td>
                                <td>
                                    <CustomSelect1
                                        label={"Country Name"}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                                <td>
                                    <CustomNumber
                                        label={"Contact Name"}
                                        placeholder={"ENTER"}
                                        value={conNo}
                                        onChange={setConNo}
                                    ></CustomNumber>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <CustomNumber
                                        label={"Mobile #"}
                                        placeholder={"ENTER"}
                                        value={mobileNo}
                                        onChange={setMobileNo}
                                    ></CustomNumber>
                                </td>
                                <td>
                                    <CustomEmail
                                        label={"Email Id"}
                                        placeholder={"ENTER"}
                                        value={email}
                                        onChange={setEmail}
                                    ></CustomEmail>
                                </td>
                                <td>
                                    <CustomNumber
                                        label={"Login Id (Mobile#)"}
                                        placeholder={"ENTER"}
                                        value={loginNo}
                                        onChange={setloginNo}
                                    ></CustomNumber>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <CustomPassword
                                        label={"Password (System Generated)"}
                                        placeholder={"ENTER"}
                                        id='custom-password-input'
                                        value={password}
                                        onChange={setPassowrd}
                                    ></CustomPassword>
                                </td>
                                <td>
                                    <CustomCheckBox2
                                        label={"Is Active"}
                                        state={checkbox}
                                        setState={setCheckbox}
                                    ></CustomCheckBox2>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center gap-5">
                    <div>
                        <CustomButton1 label={"Update"} className="text-white bg-prp-color" />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                    </div>
                </div>
            </div>
        </>
    )
}

