import * as React from "react";
import { useState } from "react";
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomPassword} from "components";
import {CustomCheckBox2} from "components";

export function LoginCredentialsEditPopup({ onCancel }) {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(true);
    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className=" font-weight-[400]">Edit Login Credentials</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-2 mx-auto">
                    <table className="max-w-full popup-table w-[900px]">
                        <tbody>
                            <tr>
                                <td>
                                    <CustomTextField2
                                        label={"User Name"}
                                        placeholder={"ENTER"}
                                        value={uname}
                                        onChange={setUname}
                                    ></CustomTextField2>
                                </td>
                                <td>
                                    <CustomPassword
                                        label={"Password"}
                                        placeholder={"ENTER"}
                                        value={password}
                                        onChange={setPassword}
                                    ></CustomPassword>
                                </td>
                            </tr>
                            <tr>
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

                <div className="flex justify-center gap-5 mt-5">
                    <div >
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
