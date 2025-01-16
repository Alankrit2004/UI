// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {CustomCheckBox2} from "components";
import {CustomViewLabel} from "components";

export function ManageCustomersView({ onCancel }) {
    let [checkboxAdd, setCheckboxAdd] = useState(true);

    const custData = [
        {
            name: "Lorem ipsum",
            createdDate: "10/08/2023",
            createdBy: "Admin"
        },
    ];

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className=" font-weight-[400]">View Customers</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-5 mx-auto">
                    {custData.map((data, index) => (
                        <div key={index} className="max-w-full grid grid-cols-2 gap-4 md:grid-cols-3">
                            <CustomViewLabel label="Customer Name" value={data.name} />
                            <CustomViewLabel label="Parent Customer" value={data.name} />
                            <CustomViewLabel label="Tracking Status" value={data.name} />
                            <CustomViewLabel label="Contact Name" value={data.name} />
                            <CustomViewLabel label="Country" value={data.name} />
                            <CustomViewLabel label="Contact Mobile# " value={data.name} />
                            <CustomCheckBox2
                                label={"Is Active"}
                                state={checkboxAdd}
                                setState={setCheckboxAdd}
                                disabled={true}
                            ></CustomCheckBox2>
                            <CustomViewLabel label="Created Date " value={data.createdDate} />
                            <CustomViewLabel label="Created By " value={data.createdBy} />
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

