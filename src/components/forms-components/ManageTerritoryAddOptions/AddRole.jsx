import React from 'react'
import {CustomButton1} from "components";

export function AddRole({ regionName, handleRegionNameChange, isActive, handleIsActiveChange, onSubmit, onCancel }) {
    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                    <h1 className="text-l font-weight-[300]">Add Country</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-2 mx-auto">
                    <table className="max-w-full popup-table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="id" className="text-xs font-[400]">
                                            Country Name <span className="text-red-500 gap-3">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="p-2  border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs"
                                            id="id"
                                            placeholder="Enter"
                                            value={regionName}
                                            onChange={handleRegionNameChange}
                                        />
                                    </div>
                                </td>
                                <td className="align-bottom">
                                    <div className="flex gap-1">
                                        <input
                                            type="checkbox"
                                            checked={isActive}
                                            onChange={handleIsActiveChange}
                                            className=" border flex justify-center items-center rounded h-[34px] w-[34px]"
                                        />
                                        <label htmlFor="id" className="text-xs font-400 flex items-center">
                                            Is Active
                                        </label>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center gap-5">
                    <div>
                        <CustomButton1 label="Submit" onClick={onSubmit} className="bg-prp-color w-full" />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                    </div>
                </div>
            </div>
        </>
    )
}
