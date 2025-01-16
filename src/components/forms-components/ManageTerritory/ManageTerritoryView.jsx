// CORE
import * as React from "react";
import '../../../assets/css/selectbar.css'
import { CustomButton1 } from "components";
import { CustomCheckBox2 } from "components";
import { CustomViewLabel } from "components";

export function ManageTerritoryView({ checkboxView, setCheckboxView, onCancel }) {
    const ter_Data = [
        {
            region: "Lorem ipsum",
            state: "Lorem ipsum",
            district: "Lorem ipsum",
            createdDate: "10/08/2023",
            createdBy: "Admin"
        },
    ];
    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                    <h1 className="text-l font-weight-[300]">View Territories</h1>
                    <div className="flex items-center text-sm"></div>
                </div>
                <div className="p-4 mx-auto">
                    {ter_Data.map((trData, index) => (
                        <div key={index} className="w-[700px] grid grid-cols-2 gap-4 md:grid-cols-3">
                            <CustomViewLabel label="Country" value={trData.region} />
                            <CustomViewLabel label="State" value={trData.state} />
                            <CustomViewLabel label="District / Provience" value={trData.district} />
                            <CustomCheckBox2
                                label={"Is Active"}
                                state={checkboxView}
                                setState={setCheckboxView}
                                disabled={true}
                            ></CustomCheckBox2>
                            <CustomViewLabel label="Created Date " value={trData.createdDate} />
                            <CustomViewLabel label="Created By " value={trData.createdBy} />
                        </div>
                    ))}

                </div>

                <div className="flex justify-center gap-5">
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                    </div>
                </div>
            </div>
        </>
    )
}
