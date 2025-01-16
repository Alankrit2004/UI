import React, { useState } from 'react'
import { BsCheck } from "react-icons/bs"
import { CustomTextField2 } from "components";
import { CustomSelect1 } from "components";
import { CustomEmail } from "components";
import { CustomTextArea } from "components";
import { CustomButton1 } from "components";
import { CustomNumber } from "components";
import { CustomCheckBox2 } from "components";
import { CustomInputNumber } from "components"

export function ManageBranchDetailsEdit({ checkboxBranchNameEdit, setCheckboxBranchNameEdit, onSubmit, onCancel }) {

    const [branchName, setBranchName] = useState("");
    const [mobNo, setMobNo] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [branchUser, setBranchUser] = useState("");

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                    <h1 className="text-xl font-weight-[400]">Edit Branch Details</h1>
                    <div className="flex  item-center text-sm"></div>
                </div>

                <div className="p-2 mx-auto">
                    <table className="max-w-full popup-table w-[1050px]">
                        <tbody>
                            <tr>
                                <td>
                                    <CustomTextField2
                                        label={"Branch Name"}
                                        placeholder={"ENTER"}
                                        value={branchName}
                                        onChange={setBranchName}
                                    ></CustomTextField2>
                                </td>
                                <td>
                                    <CustomSelect1
                                        label={" Company"}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                                <td>
                                    <CustomNumber label="Mobile Number" placeholder="Enter"
                                        value={mobNo}
                                        onChange={setMobNo}
                                    />
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <CustomEmail label="Email" placeholder="Enter"
                                        value={email}
                                        onChange={setEmail}
                                    />
                                </td>
                                <td>
                                    <CustomSelect1
                                        label={" Branch Head  "}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                                <td>
                                    <CustomTextArea
                                        label={" Address "}
                                        placeholder={"ENTER"}
                                        value={address}
                                        onChange={setAddress}
                                    ></CustomTextArea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomSelect1
                                        label={" Country "}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                                <td>
                                    <CustomSelect1
                                        label={" State "}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                                <td>
                                    <CustomSelect1
                                        label={" District "}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                            </tr>
                            <tr>


                                <td>
                                    <CustomInputNumber
                                        label={" PinCode "}
                                        placeholder={"Enter"}
                                        value={pinCode}
                                        onChange={setPinCode}
                                    ></CustomInputNumber>
                                </td>
                                <td>
                                    <CustomInputNumber
                                        label={"Branch Total User Allow"}
                                        placeholder={"Enter"}
                                        value={branchUser}
                                        onChange={setBranchUser}
                                    ></CustomInputNumber>
                                </td>
                                <td>
                                    <div className="py-1 flex items-end">
                                        <CustomCheckBox2
                                            label={"Is Active"}
                                            state={checkboxBranchNameEdit}
                                            setState={setCheckboxBranchNameEdit}
                                        ></CustomCheckBox2>
                                    </div>
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
        </>
    )
}

