// CORE
import * as React from "react";
import { useState } from "react";

import {CustomButton1} from "components";
import {CustomSelect1} from "components";
import {CustomTextArea} from "components";
import {CustomInputNumber} from "components";

export function ShippingDetails({ next, back, onCancel }) {
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
                <div className="flex justify-center gap-5 mt-5">
                    <div onClick={back}>
                        <CustomButton1 label={"Back"} variant="outlined" className="txt-prp-color" />
                    </div>
                    <div>
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
