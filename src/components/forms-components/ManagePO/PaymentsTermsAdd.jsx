// CORE
import * as React from "react";
import {CustomButton1} from "components";
import {CustomCheckBox2} from "components";

export function PaymentsTermsAdd({ paymentsTerms, handlePaymentsChange, isActivePayment, setIsActivePayment, handleSubmitPayments, onCancel }) {
    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                    <h1 className="text-l font-weight-[300]">Add Payment Terms</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-2 mx-auto">
                    <table className="max-w-full popup-table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="id" className="text-xs font-[400]">
                                            Payment Terms <span className="text-red-500 gap-3">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="p-2  border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs"
                                            id="id"
                                            placeholder="Enter"
                                            value={paymentsTerms}
                                            onChange={handlePaymentsChange}
                                        />
                                    </div>
                                </td>
                                <td className="align-bottom">
                                    <div className="flex gap-1">
                                        <CustomCheckBox2
                                            label={"Is Active"}
                                            state={isActivePayment}
                                            setState={setIsActivePayment}
                                        ></CustomCheckBox2>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center gap-5">
                    <div onClick={handleSubmitPayments}>
                        <CustomButton1 label="Submit" className="bg-prp-color w-full" />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                    </div>
                </div>
            </div>
        </>
    )
}

