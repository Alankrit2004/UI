// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {Title} from "components";
import {CustomButton1} from "components";
import {PopUp} from "components";
import {CustomTextField2} from "components";
import {CustomSelect1} from "components";
import {CustomCheckBox2} from "components";
import { Tab, TabContainer, TabContent } from "components";

// ICONSbg-white
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineImport } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";

import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import {CustomTextArea} from "components";
import {CustomViewLabel} from "components";

export function VisitorCompany() {
    const [activeTab, setActiveTab] = useState(0);

    // TAB-1 : POPUPS
    let [popupVisitorCompanyAdd, setPopupVisitorCompanyAdd] = useState(false);
    let [popupVisitorCompanyEdit, setPopupVisitorCompanyEdit] = useState(false);
    let [popupVisitorCompanyView, setPopupVisitorCompanyView] = useState(false);
    let [checkboxVisitorCompanyAdd, setCheckboxVisitorCompanyAdd] = useState(true);
    let [checkboxVisitorCompanyEdit, setCheckboxVisitorCompanyEdit] = useState(true);

    const getStatusColor = (status) => {
        return status === 'Active' ? 'text-green-500' : 'text-red-500';
    };

    const visitor_company_Data = [
        {
            com_name: "Lorem ipsum",
            address: "Lorem ipsum",
            country: "Lorem ipsum",
            state: "Lorem ipsum",
            city: "Lorem ipsum",
            pincode: "Lorem ipsum",
            phone: "Lorem ipsum",
            gst: "Lorem ipsum",
            createdDate: "10/08/2023",
            createdBy: "Admin"
        },
    ];

    return (
        <div className="flex flex-col h-full p-2 uppercase">
            <div className="p-4 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"Manage Visitor Company"} title2={"Visitor Company"} />

                <div className="  flex md:justify-between items-center flex-row flex-wrap justify-start gap-1 mt-5 md:flex-nowrap p-2">
                    <button className="smlbtn"> Excel</button>

                    <div className="flex flex-wrap items-center justify-between gap-1 text-xs ml-auto">
                        {/* <CustomButton1
                            label={"Import Visitor Company"}
                            icon={<AiOutlineImport />}
                            className=" bg-prp-color text-white grow "
                        />
                        <CustomButton1
                            label={"Sample Download"}
                            icon={<AiOutlineDownload />}
                            className=" bg-prp-color text-white grow "
                        /> */}
                    </div>
                </div>

                <div className=" bg-white rounded grow">
                    {/* TAB 1 CONTENT : PRODUCT */}
                    <TabContent index={0} activeTab={activeTab}>
                        {/* 4 BUTTONS + TABLE */}
                        <div className="px-2 lg:px-4">
                            {/* 4 BUTTONS */}
                            <div className="flex flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap minbox">
                                <CustomButton1
                                    label={"Add "}
                                    icon={<IoMdAdd />}
                                    className="bg-prp-color text-white shrink grow md:grow-0 max-w-[50%]"
                                    onClick={() => setPopupVisitorCompanyAdd(true)}
                                />

                                <div className="flex items-center justify-between gap-1 px-2  ml-auto text-[rgba(0, 0, 0, 0.50)] boreder rounded bg-white shrink grow md:grow-0">
                                    <input
                                        type="text"
                                        className="w-[150px] grow capitalize bg-transparent placeholder:text-sm"
                                        placeholder="SEARCH"
                                    />
                                    <AiOutlineSearch className="min-w-[20px]" />
                                </div>
                            </div>

                            {/* TABLE */}
                            <div className="mt-7 max-w-[100vw] hide-scrollbar overflow-auto table-container">
                                <table className="w-full custom-table" border={1}>
                                    <thead>
                                        <tr className="table-heading">
                                            <td className="">S.No</td>
                                            <td>Action</td>
                                            <td>Status</td>
                                            <td>Company Name</td>
                                            <td>Address</td>
                                            <td>Country</td>
                                            <td>State</td>
                                            <td>City</td>
                                            <td>Pincode</td>
                                            <td>Company Phone</td>
                                            <td>GST</td>
                                            <td>Created Date </td>
                                            <td>Created By </td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div className="gap-2">
                                                    <CustomButton1
                                                        className="bg-sixt text-white grow max-w-[50px]"
                                                        icon={<BiEdit />}
                                                        onClick={() => setPopupVisitorCompanyEdit(true)}
                                                    />
                                                    <CustomButton1
                                                        className="bg-eye text-white grow max-w-[50px]"
                                                        icon={<BsEyeFill />}
                                                        onClick={() => setPopupVisitorCompanyView(true)}
                                                    />
                                                </div>
                                            </td>
                                            <td className={getStatusColor('Active')}>Active</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>10/08/2023</td>
                                            <td>Admin</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>

                                            <td>
                                                <div className="gap-2">
                                                    <CustomButton1
                                                        className="bg-sixt text-white grow max-w-[50px]"
                                                        icon={<BiEdit />}
                                                        onClick={() => setPopupVisitorCompanyEdit(true)}
                                                    />
                                                    <CustomButton1
                                                        className="bg-eye text-white grow max-w-[50px]"
                                                        icon={<BsEyeFill />}
                                                        onClick={() => setPopupVisitorCompanyView(true)}
                                                    />
                                                </div>
                                            </td>
                                            <td className={getStatusColor('Active')}>Active</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>10/08/2023</td>
                                            <td>Admin</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                        {/* POPUP 1 : ADD */}
                        {popupVisitorCompanyAdd && (
                            <PopUp>
                                <div className="pb-10 bg-white rounded-lg">
                                    <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                                        <h1 className="text-l font-weight-[400]">Add Visitor Company</h1>
                                        <div className="flex items-center text-sm"></div>
                                    </div>

                                    <div className="p-5 mx-auto">
                                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3">
                                            <div className="">
                                                <CustomTextField2
                                                    label={"Company Name"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>
                                            <div className="">
                                                <CustomTextArea
                                                    label={"Address"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextArea>
                                            </div>
                                            <div className="">
                                                <CustomTextField2
                                                    label={"Country"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>
                                            <div>
                                                <CustomSelect1 label={"State"} />
                                            </div>
                                            <div>
                                                <CustomSelect1 label={"City"} />
                                            </div>
                                            <div className="">
                                                <CustomTextField2
                                                    label={"Pincode"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>
                                            <div className="">
                                                <CustomTextField2
                                                    label={"Company Phone"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>
                                            <div className="">
                                                <CustomTextField2
                                                    label={"GST"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>
                                            <div className="">
                                                <CustomCheckBox2
                                                    label={"Is Active"}
                                                    state={checkboxVisitorCompanyAdd}
                                                    setState={setCheckboxVisitorCompanyAdd}
                                                ></CustomCheckBox2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center gap-5">
                                        <div>
                                            <CustomButton1 label={"Submit"} className="text-white bg-prp-color" />
                                        </div>
                                        <div onClick={() => setPopupVisitorCompanyAdd(false)}>
                                            <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                                        </div>
                                    </div>
                                </div>
                            </PopUp>
                        )}

                        {/* POPUP 2 : EDIT */}
                        {popupVisitorCompanyEdit && (
                            <PopUp>
                                <div className="pb-10 bg-white rounded-lg">
                                    <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                                        <h1 className=" font-weight-[400]">Edit Visitor Company</h1>
                                        <div className="flex items-center text-sm"></div>
                                    </div>

                                    <div className="p-5 mx-auto">
                                        <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3">
                                            <div className="">
                                                <CustomTextField2
                                                    label={"Company Name"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>
                                            <div className="">
                                                <CustomTextArea
                                                    label={"Address"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextArea>
                                            </div>
                                            <div className="">
                                                <CustomTextField2
                                                    label={"Country"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>
                                            <div>
                                                <CustomSelect1 label={"State"} />
                                            </div>
                                            <div>
                                                <CustomSelect1 label={"City"} />
                                            </div>
                                            <div className="">
                                                <CustomTextField2
                                                    label={"Pincode"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>
                                            <div className="">
                                                <CustomTextField2
                                                    label={"Company Phone"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>
                                            <div className="">
                                                <CustomTextField2
                                                    label={"GST"}
                                                    placeholder={"ENTER"}
                                                ></CustomTextField2>
                                            </div>

                                            <div className="">
                                                <CustomCheckBox2
                                                    label={"Is Active"}
                                                    state={checkboxVisitorCompanyAdd}
                                                    setState={setCheckboxVisitorCompanyAdd}
                                                ></CustomCheckBox2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-5">
                                        <div>
                                            <CustomButton1 label={"Update"} className="text-white bg-prp-color" />
                                        </div>
                                        <div onClick={() => setPopupVisitorCompanyEdit(false)}>
                                            <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                                        </div>
                                    </div>
                                </div>
                            </PopUp>
                        )}

                        {popupVisitorCompanyView && (
                            <PopUp>
                                <div className="pb-10 bg-white rounded-lg">
                                    <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                                        <h1 className=" font-weight-[400]">Edit Visitor Company</h1>
                                        <div className="flex items-center text-sm"></div>
                                    </div>

                                    <div className="p-5 mx-auto">
                                        {visitor_company_Data.map((visComp_Data, index) => (
                                            <div key={index} className="max-w-full grid grid-cols-2 gap-4 md:grid-cols-3">
                                                <CustomViewLabel label="Company Name" value={visComp_Data.com_name} />
                                                <CustomViewLabel label="Address" value={visComp_Data.address} />
                                                <CustomViewLabel label="Country" value={visComp_Data.country} />
                                                <CustomViewLabel label="State" value={visComp_Data.state} />
                                                <CustomViewLabel label="City" value={visComp_Data.city} />
                                                <CustomViewLabel label="Pincode" value={visComp_Data.pincode} />
                                                <CustomViewLabel label="Company Phone" value={visComp_Data.phone} />
                                                <CustomViewLabel label="GST" value={visComp_Data.gst} />
                                                <CustomCheckBox2
                                                    label={"Is Active"}
                                                    state={checkboxVisitorCompanyAdd}
                                                    setState={setCheckboxVisitorCompanyAdd}
                                                    disabled={true}
                                                ></CustomCheckBox2>
                                                <CustomViewLabel label="Created Date " value={visComp_Data.createdDate} />
                                                <CustomViewLabel label="Created By " value={visComp_Data.createdBy} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center gap-5">
                                        <div onClick={() => setPopupVisitorCompanyView(false)}>
                                            <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                                        </div>
                                    </div>
                                </div>
                            </PopUp>
                        )}
                    </TabContent>
                </div>
            </div>
        </div>
    );
}

