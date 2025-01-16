import * as React from "react";
import { useState } from "react";

import {CustomButton1} from "components";
import {CustomSelect1} from "components";
import {CustomTextArea} from "components";
import {CustomInputNumber} from "components";
import { BsCheck } from "react-icons/bs";

export function BillingDetails({ next, back, onCancel }) {
    let [checkboxSameAddress, setCheckboxSameAddress] = useState(false);
    const [street, setStreet] = useState("");
    const [zipCode, setZipCode] = useState("");

    return (
        <>
            <div>
                <div className="p-2 mx-auto">
                    <table className="max-w-full popup-table w-[900px]">
                        <tbody>
                            <tr>
                                <td>
                                    <CustomTextArea
                                        label={"Street"}
                                        placeholder={"ENTER"}
                                        value={street}
                                        onChange={setStreet}
                                    ></CustomTextArea>
                                </td>
                                <td>
                                    <CustomSelect1
                                        label={"Country"}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomSelect1
                                        label={"State/Providance"}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                                <td>
                                    <CustomInputNumber
                                        label={"Postal Zip Code"}
                                        placeholder={"ENTER"}
                                        value={zipCode}
                                        onChange={setZipCode}
                                    ></CustomInputNumber>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <hr className="mx-5 mt-5" /> */}
                <div className="flex items-center gap-4 mt-3 ps-5">
                    <label htmlFor="id" className="text-sm font-400">
                        Is Shipping and Billing address is same ?
                    </label>
                    <div
                        className={`${checkboxSameAddress ? "bg-prp-color" : "bg-white"
                            } border border-gray-300 flex justify-center items-center rounded h-[25px] w-[25px]`}
                        onClick={() => setCheckboxSameAddress(!checkboxSameAddress)}
                    >
                        <BsCheck className="text-2xl text-white" />
                    </div>
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
