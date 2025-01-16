// CORE
import * as React from "react";
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomNumber} from "components";
import {CustomEmail} from "components";
import { useState } from "react";

export function ContactDetails({ next, back, onCancel }) {

    const [custName, setCustName] = useState("");
    const [conPerson, setConPerson] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [phoneNoAlt, setphoneNoAlt] = useState("");
    const [email, setEmail] = useState("");
    const [emailAlt, setEmailAlt] = useState("");
    const [designation, setDesignation] = useState("");

    return (
        <>
            <div>
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
                    <div onClick={back}>
                        <CustomButton1 label={"Back"} variant="outlined" className="txt-prp-color" />
                    </div>
                    <div onClick={next}>
                        <CustomButton1 label={"Save and Continue"} className="text-white bg-prp-color" />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                    </div>
                </div>
            </div>
        </>
    )
}
