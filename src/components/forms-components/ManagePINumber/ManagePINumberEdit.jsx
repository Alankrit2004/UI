import React, { useState } from 'react'
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomSelect1} from "components";
import {CustomDate} from "components";
import {CustomCheckBox2} from "components";
import {CustomInputNumber} from "components";

export function ManagePINumberEdit({ onCancel }) {
    const [checkboxEdit, setCheckboxEdit] = useState(true);

    const [seq, setSeq] = useState("");
    const [amt, setAmt] = useState("");

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className=" font-weight-[400]">Edit PI Number</h1>
                    <div className="flex items-center text-sm"></div>
                </div>
                {/* <div className="p-5 mx-auto">
                    <table className="max-w-full popup-table w-[1000px]">
                        <tbody>
                            <tr>
                                <td>
                                    <CustomInputNumber
                                        label={"Payment Seq."}
                                        placeholder={"ENTER"}
                                        value={seq}
                                        onChange={setSeq}
                                    ></CustomInputNumber>
                                </td>
                                <td>
                                    <CustomDate
                                        label={"Payemnt date"}
                                        placeholder={"ENTER"}
                                    ></CustomDate>
                                </td>
                                <td>
                                    <CustomInputNumber
                                        label={"Total Amount"}
                                        placeholder={"Read Only"}
                                        readOnly={true}
                                    ></CustomInputNumber>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomInputNumber
                                        label={"Payment amount"}
                                        placeholder={"ENTER"}
                                        value={amt}
                                        onChange={setAmt}
                                    ></CustomInputNumber>
                                </td>
                                <td>
                                    Pending Payment (Auto calculate = Total Amount - Payment amount)
                                    <CustomInputNumber
                                        label={"Pending Payment"}
                                        placeholder={"Read Only"}
                                        readOnly={true}
                                    ></CustomInputNumber>
                                </td>
                                <td>
                                    <CustomSelect1
                                        label={"Payment status"}
                                        placeholder={"ENTER"}
                                        options={[
                                            { value: 'p', label: 'Pending' },
                                            { value: 'c', label: 'Closed' },
                                        ]}
                                    ></CustomSelect1>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomCheckBox2
                                        label={"Is Active"}
                                        state={checkboxEdit}
                                        setState={setCheckboxEdit}
                                    ></CustomCheckBox2>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}

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
