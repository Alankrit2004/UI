// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {CustomCheckBox2} from "components";
import {CustomViewLabel} from "components";
import {Accordion} from "components";
import {CustomCheckBox3} from "components";

export function ManageContainersUnderLoadingView({ onCancel }) {
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
                    <h1 className=" font-weight-[400]">View Containers Under Loading </h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-5 mx-auto max-w-full w-[1000px] max-h-[600px] overflow-x-auto">
                    {custData.map((data, dataIndex) => (
                        <div key={dataIndex}>
                            <Accordion
                                title={"PO received"}
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
                                    <CustomViewLabel label="PO Upload" value={data.name} />
                                    <CustomViewLabel label="PI Status" value={data.name} />
                                </div>
                            </Accordion>
                            <Accordion
                                title={"PI Issued"}
                                isOpen={openAccordionIndex === 1 || openAccordionIndex === 2}
                                onClick={() => handleAccordionClick(1)}
                            >
                                <div className="max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                                    <CustomViewLabel label="PI Number" value={data.name} />
                                    <CustomViewLabel label="Dispatch Schedule" value={data.name} />
                                    <CustomViewLabel label="Dispatch Date" value={data.name} />
                                    <CustomCheckBox2
                                        label={"PI Closed"}
                                        state={checkboxAdd}
                                        setState={setCheckboxAdd}
                                        disabled={true}
                                    ></CustomCheckBox2>
                                </div>
                            </Accordion>
                            <Accordion
                                title={"PI Confirmation"}
                                isOpen={openAccordionIndex === 2 || openAccordionIndex === 3}
                                onClick={() => handleAccordionClick(2)}
                            >
                                <div className="max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                                    <CustomViewLabel label="PI Issued date" value={data.name} />
                                    <CustomViewLabel label="Attachment" value={data.name} />
                                    <CustomCheckBox2
                                        label={"PI Confirmed"}
                                        state={checkboxAdd}
                                        setState={setCheckboxAdd}
                                        disabled={true}
                                    ></CustomCheckBox2>
                                    <CustomCheckBox2
                                        label={"Is Active"}
                                        state={checkboxAdd}
                                        setState={setCheckboxAdd}
                                        disabled={true}
                                    ></CustomCheckBox2>
                                    <CustomViewLabel label="Created Date " value={data.createdDate} />
                                    <CustomViewLabel label="Created By " value={data.createdBy} />
                                </div>
                            </Accordion>
                            <Accordion title={"Payment Received / LC Received"}
                                isOpen={openAccordionIndex === 3 || openAccordionIndex === 4}
                                onClick={() => handleAccordionClick(3)}
                            >
                                <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                                    <div className="">
                                        <CustomCheckBox3
                                            label={"Payment Received"}
                                            state={checkboxAdd}
                                            setState={setCheckboxAdd}
                                            disabled={true}
                                        ></CustomCheckBox3>
                                    </div>
                                    <div className="">
                                        <CustomCheckBox3
                                            label={"LC Received"}
                                            state={checkboxAdd}
                                            setState={setCheckboxAdd}
                                            disabled={true}
                                        ></CustomCheckBox3>
                                    </div>
                                </div>
                            </Accordion>
                            <Accordion title={"Order Accepted"}
                                isOpen={openAccordionIndex === 4 || openAccordionIndex === 5}
                                onClick={() => handleAccordionClick(4)}
                            >
                                <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                                    <div className="">
                                        <CustomCheckBox3
                                            label={"Order Accepted"}
                                            state={checkboxAdd}
                                            setState={setCheckboxAdd}
                                            disabled={true}
                                        ></CustomCheckBox3>
                                    </div>
                                </div>
                            </Accordion>
                            <Accordion title={"Order Under Process"}
                                isOpen={openAccordionIndex === 5 || openAccordionIndex === 6}
                                onClick={() => handleAccordionClick(5)}
                            >
                                <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                                    <div className="">
                                        <CustomCheckBox3
                                            label={"Order Under Process"}
                                            state={checkboxAdd}
                                            setState={setCheckboxAdd}
                                            disabled={true}
                                        ></CustomCheckBox3>
                                    </div>
                                </div>
                            </Accordion>
                            <Accordion title={"Booking Issue"}
                                isOpen={openAccordionIndex === 6 || openAccordionIndex === 7}
                                onClick={() => handleAccordionClick(6)}
                            >
                                <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                                    <div className="">
                                        <CustomCheckBox3
                                            label={"Booking Issue"}
                                            state={checkboxAdd}
                                            setState={setCheckboxAdd}
                                            disabled={true}
                                        ></CustomCheckBox3>
                                    </div>
                                </div>
                            </Accordion>
                            <Accordion title={"Containers Under Loading"}
                                isOpen={openAccordionIndex === 7}
                                onClick={() => handleAccordionClick(7)}
                            >
                                <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                                    <div className="">
                                        <CustomCheckBox3
                                            label={"Containers Under Loading"}
                                            state={checkboxAdd}
                                            setState={setCheckboxAdd}
                                            disabled={true}
                                        ></CustomCheckBox3>
                                    </div>
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
    );
}
