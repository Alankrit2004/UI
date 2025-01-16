import * as React from "react";
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomSelect1} from "components";
import {CustomNumber} from "components";

export function EditClientDetailsAddPopup({onCancel}) {
    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className=" font-weight-[400]">Edit Client Details</h1>
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
                                    ></CustomTextField2>
                                </td>
                                <td>
                                    <CustomNumber
                                        label={"Phone Number"}
                                        placeholder={"ENTER"}
                                    ></CustomNumber>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomSelect1
                                        label={"Parent Customer"}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                                <td>
                                    <CustomNumber
                                        label={"Landline Number"}
                                        placeholder={"ENTER"}
                                    ></CustomNumber>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <CustomSelect1
                                        label={"Customer Type"}
                                        placeholder={"ENTER"}
                                    ></CustomSelect1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center gap-5 mt-5">
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
