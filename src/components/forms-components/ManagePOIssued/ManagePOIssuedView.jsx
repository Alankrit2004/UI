// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {CustomCheckBox3} from "components";
import {CustomViewLabel} from "components";
import {Accordion} from "components";

export function ManagePOIssuedView({ onCancel }) {
    let [checkboxAdd, setCheckboxAdd] = useState(true);
    const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

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

    const handleAccordionClick = (index) => {
        setOpenAccordionIndex(index === openAccordionIndex ? -1 : index);
    };

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className=" font-weight-[400]">View PO Issued</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-5 mx-auto max-w-full w-[1000px] max-h-[600px] overflow-x-auto">
                    {custData.map((data, index) => (
                        <div key={index}>
                            <Accordion title={"PO recieved"}
                                isOpen={openAccordionIndex === 0 || openAccordionIndex === 1}
                                onClick={() => handleAccordionClick(0)}
                            >
                                <div className="max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                                    <CustomViewLabel label="Customer Name" value={data.name} />
                                    <CustomViewLabel label="Parent Customer" value={data.parent_customer} />
                                    <CustomViewLabel label="Country" value={data.country} />
                                    <CustomViewLabel label="Payment Terms" value={data.name} />
                                    <CustomViewLabel label="Qty" value={data.name} />
                                    <CustomViewLabel label="PO Number" value={data.name} />
                                    <CustomViewLabel label="PI Number" value={data.name} />
                                    <CustomViewLabel label="Type of Packaging" value={data.name} />
                                    <CustomViewLabel label="Delivery Terms" value={data.name} />
                                    <CustomViewLabel label="PO UPload" value={data.name} />
                                    <CustomViewLabel label="PI Status" value={data.name} />
                                </div>
                            </Accordion>
                            <Accordion title={"PI Issued"}
                                isOpen={openAccordionIndex === 1 || openAccordionIndex === 2}
                                onClick={() => handleAccordionClick(1)}
                            >
                                <div className="max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                                    <CustomViewLabel label="PI Number" value={data.name} />
                                    <CustomViewLabel label="Dispatch Schedule" value={data.name} />
                                    <CustomViewLabel label="Dispatch Date" value={data.name} />
                                    <CustomCheckBox3
                                        label={"PI Closed"}
                                        state={checkboxAdd}
                                        setState={setCheckboxAdd}
                                        disabled={true}
                                    ></CustomCheckBox3>
                                    <CustomViewLabel label="Created Date " value={data.createdDate} />
                                    <CustomViewLabel label="Created By " value={data.createdBy} />
                                </div>
                            </Accordion>
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
