// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomSelect1} from "components";
import {CustomCheckBox3} from "components";
import {CustomBrowse} from "components"
import {CustomInputNumber} from "components"
import {Accordion} from "components";
import {CustomDate} from "components";

export function ManagePOIssuedEdit({ onCancel }) {
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
                    <h1 className=" font-weight-[400]">Edit PO Issued</h1>
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
                                <CustomCheckBox3
                                    label={"PI Closed"}
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
