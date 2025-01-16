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

// ICONS
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch, AiOutlineDownload, AiTwotoneEdit, AiOutlineImport } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

export function EmployeeView() {
    const [activeTab, setActiveTab] = useState(0);

    // TAB-1 : POPUPS
    let [popupCustomerTypeAdd, setPopupCustomerTypeAdd] = useState(false);
    let [popupCustomerTypeEdit, setPopupCustomerTypeEdit] = useState(false);
    let [checkboxCustomerTypeAdd, setCheckboxCustomerTypeAdd] = useState(true);
    let [checkboxCustomerTypeEdit, setCheckboxCustomerTypeEdit] = useState(true);
    const getStatusColor = (status) => {
        return status === 'Active' ? 'text-green-500' : 'text-red-500';
    };

    return (
        <div className="flex flex-col h-full uppercase">
            <div className="p-4 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"View Employee"} title2={"Admin Profile"} />

                <div className="  flex md:justify-between items-center flex-row flex-wrap justify-start gap-1 mt-5 md:flex-nowrap pb-5minbox">
                    <button className="smlbtn"> Excel</button>

                    <div className="flex flex-wrap items-center justify-between gap-1  ml-auto">
                        {/* <CustomButton1
                            label={"Import "}
                            icon={<AiOutlineImport />}
                            className=" bg-sixt text-white grow "
                        />
                        <CustomButton1
                            label={"Download"}
                            icon={<AiOutlineDownload />}
                            className=" bg-sixt text-white grow "
                        /> */}
                    </div>
                </div>

                <div className="p-2 mt-2 bg-white rounded grow">
                    {/* TAB 1 CONTENT : PRODUCT */}
                    <TabContent index={0} activeTab={activeTab}>
                        {/* 4 BUTTONS + TABLE */}
                        <div className="px-2 lg:px-2 ">
                            {/* 4 BUTTONS */}
                            <div className="flex flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap">
                                <CustomButton1
                                    label={"Add "}
                                    icon={<IoMdAdd />}
                                    className="bg-prp-color text-white shrink grow md:grow-0 max-w-[50%]"
                                // onClick={() => setPopupCustomerTypeAdd(true)}
                                />

                                <div className="flex items-center justify-between gap-1 px-2 py-2 ml-auto text-white rounded bg-prp-color shrink grow md:grow-0">
                                    <input
                                        type="text"
                                        className="w-[150px] grow capitalize bg-transparent placeholder:text-white"
                                        placeholder="SEARCH"
                                    />
                                    <AiOutlineSearch className="min-w-[20px]" />
                                </div>
                            </div>

                            {/* TABLE */}
                            <div className="mt-7 max-w-[100vw] overflow-auto table-container">
                                <table className="w-full custom-table" border={1}>
                                    <thead>
                                        <tr className="table-heading">
                                            <td className="">S.No</td>
                                            <td>Employee Code</td>
                                            <td>Employee Name</td>
                                            <td>Email Address</td>
                                            <td>Mobile No.</td>
                                            <td>Role Name</td>
                                            <td>Reporting To</td>
                                            <td>Area</td>
                                            <td>Address</td>
                                            <td>Date Of Birth</td>
                                            <td>Date of Joining</td>
                                            <td>Emergency Contact Number</td>
                                            <td>Blood Group</td>

                                            <td>Latitude</td>
                                            <td>Longitude</td>

                                            <td>Is Punched</td>
                                            <td>Status</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td className={getStatusColor('Active')}>Active</td>
                                            {/* <td>
                                                <div>
                                                    <CustomButton1
                                                        label={"Edit"}
                                                        className="bg-sixt text-white grow max-w-[150px]"
                                                        icon={<AiTwotoneEdit />}
                                                        onClick={() => setPopupCustomerTypeEdit(true)}
                                                    />
                                                </div>
                                            </td> */}
                                        </tr>
                                        <tr>
                                            <td>2</td>

                                            <td>Employee</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td> <td>Lorem</td>
                                            <td>Lorem</td>
                                            <td className={getStatusColor('Active')}>Active</td>
                                            <td>
                                                <div>
                                                    <h2 className={getStatusColor('Active')}>Active</h2>
                                                </div>
                                            </td>
                                            {/* <td>
                                                <div>
                                                    <CustomButton1
                                                        label={"Edit"}
                                                        icon={<AiTwotoneEdit />}
                                                        className="bg-sixt text-white grow max-w-[150px]"
                                                        // onClick={() => setPopupCustomerTypeEdit(true)}
                                                    />
                                                </div>
                                            </td> */}
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                        {/* POPUP 1 : ADD */}
                        {popupCustomerTypeAdd && (
                            <PopUp>
                                <div className="pb-10 bg-white rounded-lg">
                                    <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                                        <h1 className="text-xl font-weight-[300]">Add Customer Type</h1>
                                        <div className="flex items-center text-sm">
                                            <p>Manage Customer Type</p>
                                        </div>
                                    </div>

                                    <div className="p-2 mx-auto">
                                        <table className="max-w-full popup-table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <CustomTextField2
                                                            label={"Customer Type"}
                                                            placeholder={"ENTER"}
                                                        ></CustomTextField2>
                                                    </td>
                                                    <td>
                                                        <CustomCheckBox2
                                                            label={"Status"}
                                                            state={checkboxCustomerTypeAdd}
                                                        // setState={setCheckboxCustomerTypeAdd}
                                                        ></CustomCheckBox2>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex justify-center gap-5">
                                        <div>
                                            <CustomButton1 label={"Submit"} className="text-white bg-prp-color" />
                                        </div>
                                        {/* <div onClick={() => setPopupCustomerTypeAdd(false)}>
                                            <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                                        </div> */}
                                    </div>
                                </div>
                            </PopUp>
                        )}

                        {/* POPUP 2 : EDIT */}
                        {popupCustomerTypeEdit && (
                            <PopUp>
                                <div className="pb-10 bg-white rounded-lg">
                                    <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                                        <h1 className="text-xl font-weight-[300]">Edit Customer Type</h1>
                                        <div className="flex items-center text-sm">
                                            <p>Manage Customer Type</p>
                                        </div>
                                    </div>
                                    <div className="p-5 mx-auto">
                                        <table className="max-w-full popup-table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <CustomTextField2
                                                            label={"Customer Type"}
                                                            placeholder={"ENTER"}
                                                        ></CustomTextField2>
                                                    </td>
                                                    <td>
                                                        <CustomCheckBox2
                                                            label={"Status"}
                                                            state={checkboxCustomerTypeEdit}
                                                            setState={setCheckboxCustomerTypeEdit}
                                                        ></CustomCheckBox2>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex justify-center gap-5">
                                        <div>
                                            <CustomButton1 label={"Update"} className="text-white bg-prp-color" />
                                        </div>
                                        {/* <div onClick={() => setPopupCustomerTypeEdit(false)}>
                                            <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                                        </div> */}
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
