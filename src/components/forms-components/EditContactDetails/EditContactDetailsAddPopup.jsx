import * as React from "react";
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomEmail} from "components";
import {CustomNumber} from "components";
import { useState } from "react";

export function EditContactDetailsAddPopup({ onCancel }) {
    const [custName, setCustName] = useState("");
    const [conPerson, setConPerson] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [phoneNoAlt, setphoneNoAlt] = useState("");
    const [email, setEmail] = useState("");
    const [emailAlt, setEmailAlt] = useState("");
    const [designation, setDesignation] = useState("");

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className=" font-weight-[400]">Edit Contact Details</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-2 mx-auto">
                    <table className="max-w-full popup-table w-[900px]">
                        <tbody>
                            <tr>
                                <td>
                                    <CustomTextField2
                                        label={"Customer Name"}
                                        placeholder={"ENTER"}
                                        value={custName}
                                        onChange={setCustName}
                                    ></CustomTextField2>
                                </td>
                                <td>
                                    <CustomTextField2
                                        label={"Contact Person"}
                                        placeholder={"ENTER"}
                                        value={conPerson}
                                        onChange={setConPerson}
                                    ></CustomTextField2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomNumber
                                        label={"Mobile Number"}
                                        placeholder={"ENTER"}
                                        value={phoneNo}
                                        onChange={setphoneNo}
                                    ></CustomNumber>
                                </td>
                                <td>
                                    <CustomNumber
                                        label={"Alternet Mobile Number"}
                                        placeholder={"ENTER"}
                                        value={phoneNoAlt}
                                        onChange={setphoneNoAlt}
                                    ></CustomNumber>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomEmail
                                        label={"Email Id"}
                                        placeholder={"ENTER"}
                                        value={email}
                                        onChange={setEmail}
                                    ></CustomEmail>
                                </td>
                                <td>
                                    <CustomEmail
                                        label={"Alternet Email Id"}
                                        placeholder={"ENTER"}
                                        value={emailAlt}
                                        onChange={setEmailAlt}
                                    ></CustomEmail>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomTextField2
                                        label={"Designation"}
                                        placeholder={"ENTER"}
                                        value={designation}
                                        onChange={setDesignation}
                                    ></CustomTextField2>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="flex justify-center gap-5 mt-5">
                    <div >
                        <CustomButton1 label={"Submit"} className="text-white bg-prp-color" />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                    </div>
                </div>
            </div>
        </>
    )
}
