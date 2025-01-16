// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomSelect1} from "components";
import {CustomCheckBox2} from "components";
import {CustomCheckBox3} from "components";
import {CustomBrowse} from "components"
import {CustomInputNumber} from "components"
import {Accordion} from "components";
import {CustomDate} from "components";
import {CustomBrowse3} from "components";

export function ManageOrderCompletedPendingEdit({ onCancel }) {
    const [checkboxEdit, setCheckboxEdit] = useState(true);
    const [piNo, setPiNo] = useState("");
    const [dispatch, setDispatch] = useState("");
    const [checkboxPi, setCheckboxPi] = useState(true);
    const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

    const handleAccordionClick = (index) => {
        setOpenAccordionIndex(index === openAccordionIndex ? -1 : index);
    };

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className=" font-weight-[400]">Edit Order Completed-Pending</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="p-5 mx-auto max-w-full w-[1000px] max-h-[600px] overflow-x-auto">
                    <Accordion title={"PO recieved"}
                        isOpen={openAccordionIndex === 0 || openAccordionIndex === 1}
                        onClick={() => handleAccordionClick(0)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div className="">
                                <CustomSelect1
                                    label={"Customer Name"}
                                    placeholder={"ENTER"}
                                ></CustomSelect1>
                            </div>
                            <div>
                                <CustomTextField2 label={"Parent Customer"} placeholder={"Read Only"} readOnly={true} />
                            </div>
                            <div>
                                <CustomTextField2 label={"Country"} placeholder={"Read Only"} readOnly={true} />
                            </div>
                            <div>
                                <CustomTextField2 label={"Payment Terms"} placeholder={"Read Only"} readOnly={true} />
                            </div>
                            <div className="">
                                <CustomTextField2 label={"Qty"} placeholder={"Read Only"} readOnly={true} />
                            </div>
                            <div className="">
                                <CustomTextField2 label={"PO Number"} placeholder={"Read Only"} readOnly={true} />
                            </div>
                            <div className="">
                                <CustomInputNumber
                                    label={"PI Number"}
                                    placeholder={"ENTER"}
                                    value={piNo}
                                    onChange={setPiNo}
                                ></CustomInputNumber>
                            </div>
                            <div className="">
                                <CustomSelect1 label={"Type of Packaging"} />
                            </div>
                            <div className="">
                                <CustomSelect1 label={"Delivery Terms"} />
                            </div>
                            <div className="">
                                <CustomBrowse id="pi-upload-issue-add" label="PO UPload" />
                            </div>
                            <div className="">
                                <CustomSelect1 label={"PI Status"}
                                    placeholder={"ENTER"}
                                    options={[
                                        { value: 'p', label: 'Pending' },
                                        { value: 'c', label: 'Closed' },
                                    ]}
                                />
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"PI Issued"}
                        isOpen={openAccordionIndex === 1 || openAccordionIndex === 2}
                        onClick={() => handleAccordionClick(1)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div>
                                <CustomInputNumber label="PI Number" placeholder="Enter" />
                            </div>
                            <div>
                                <CustomTextField2 label="Dispatch Schedule" placeholder="Enter"
                                    value={dispatch}
                                    onChange={setDispatch}
                                />
                            </div>
                            <div>
                                <CustomDate label="Dispatch Date" />
                            </div>

                            <div className="">
                                <CustomCheckBox2
                                    label={"PI Closed"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox2>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"PI Confirmation"}
                        isOpen={openAccordionIndex === 2 || openAccordionIndex === 3}
                        onClick={() => handleAccordionClick(2)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div>
                                <CustomDate label="PI Issued date" />
                            </div>
                            <div className="mt-4">
                                <CustomBrowse3 id="pi-upload-issue-add" />
                            </div>
                            <div className="">
                                <CustomCheckBox2
                                    label={"PI Confirmed"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox2>
                            </div>
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
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                            <div className="">
                                <CustomCheckBox3
                                    label={"LC Received"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
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
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
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
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
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
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"Containers Under Loading"}
                        isOpen={openAccordionIndex === 7 || openAccordionIndex === 8}
                        onClick={() => handleAccordionClick(7)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div className="">
                                <CustomCheckBox3
                                    label={"Containers Under Loading"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"Invoice Generated"}
                        isOpen={openAccordionIndex === 8 || openAccordionIndex === 9}
                        onClick={() => handleAccordionClick(8)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div className="">
                                <CustomCheckBox3
                                    label={"Invoice Generated"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"Bi Draft Issued"}
                        isOpen={openAccordionIndex === 9 || openAccordionIndex === 10}
                        onClick={() => handleAccordionClick(9)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div className="">
                                <CustomCheckBox3
                                    label={"Bi Draft Issued"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"Final Bi Issued"}
                        isOpen={openAccordionIndex === 10 || openAccordionIndex === 11}
                        onClick={() => handleAccordionClick(10)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div className="">
                                <CustomCheckBox3
                                    label={"Final Bi Issued"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"Final Amount To Pay"}
                        isOpen={openAccordionIndex === 11 || openAccordionIndex === 12}
                        onClick={() => handleAccordionClick(11)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div className="">
                                <CustomCheckBox3
                                    label={"Final Amount To Pay"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"Document Send Dhl / Submitted"}
                        isOpen={openAccordionIndex === 12 || openAccordionIndex === 13}
                        onClick={() => handleAccordionClick(12)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div className="">
                                <CustomCheckBox3
                                    label={"Document Send Dhl / Submitted"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"Awb Generated-Pending"}
                        isOpen={openAccordionIndex === 13 || openAccordionIndex === 14}
                        onClick={() => handleAccordionClick(13)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div className="">
                                <CustomCheckBox3
                                    label={"Awb Generated-Pending"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={"Order Completed-Pending"}
                        isOpen={openAccordionIndex === 14}
                        onClick={() => handleAccordionClick(14)}
                    >
                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
                            <div className="">
                                <CustomCheckBox3
                                    label={"Order Completed-Pending"}
                                    state={checkboxPi}
                                    setState={setCheckboxPi}
                                ></CustomCheckBox3>
                            </div>
                        </div>
                    </Accordion>
                </div>

                <div className="flex justify-center gap-5">
                    <div>
                        <CustomButton1 label={"Update"} className="text-white bg-prp-color" />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                    </div>
                </div>
            </div>
        </>
    )
}




