// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {CustomCheckBox2} from "components";
import {CustomViewLabel} from "components";

export function ManagePOView({ onCancel }) {

    const custData = [
        {
            name: "Lorem ipsum",
            parent_customer: "Lorem ipsum",
            track_status: "Lorem ipsum",
            con_name: "Lorem ipsum",
            country: "Lorem ipsum",
            con_mobile: "Lorem ipsum",
            createdDate: "10/08/2023",
            createdBy: "Admin"
        },
    ];

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className=" font-weight-[400]">View PO</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-5 mx-auto">
                    {custData.map((data, index) => (
                        <div key={index} className="max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <CustomViewLabel label="Customer Name" value={data.name} />
                            <CustomViewLabel label="Parent Customer" value={data.parent_customer} />
                            <CustomViewLabel label="Country" value={data.country} />
                            <CustomViewLabel label="Port of Discharge" value={data.country} />
                            <CustomViewLabel label="PO Received" value={data.country} />
                            <CustomViewLabel label="PO Number" value={data.name} />
                            <CustomViewLabel label="Payment Terms" value={data.name} />
                            <CustomViewLabel label="Qty" value={data.name} />
                            <CustomViewLabel label="Currency Type" value={data.name} />
                            <CustomViewLabel label="Currency Value" value={data.name} />
                            <CustomViewLabel label="Paper Type" value={data.country} />
                            <CustomViewLabel label="Brand" value={data.country} />
                            <CustomViewLabel label="Type of Packaging" value={data.name} />
                            <CustomViewLabel label="Delivery Terms" value={data.name} />
                            <CustomViewLabel label="Tracking Status" value={data.name} />
                            <CustomViewLabel label="PO UPload" value={data.name} />
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
