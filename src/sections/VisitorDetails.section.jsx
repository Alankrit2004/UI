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
import {CustomDate} from "components";
import {CustomEmail} from "components";

// ICONSbg-white
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";

export function VisitorDetails() {
    let [popupVisitorDetailsAdd, setPopupVisitorDetailsAdd] = useState(false);
    let [popupVisitorDetailsEdit, setPopupVisitorDetailsEdit] = useState(false);
    let [checkboxVisitorDetailsAdd, setCheckboxVisitorDetailsAdd] = useState(true);
    let [checkboxVisitorDetailsEdit, setCheckboxVisitorDetailsEdit] = useState(true);

    const getStatusColor = (status) => {
        return status === 'Active' ? 'text-green-500' : 'text-red-500';
    };

    return (
        <div className="flex flex-col h-full p-2 uppercase">
            <div className="p-4 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"Manage Visitor Details"} title2={"Manage Visitor"} />

                <div className="  flex md:justify-between items-center flex-row flex-wrap justify-start gap-1 mt-5 md:flex-nowrap p-2">
                    <button className="smlbtn"> Excel</button>

                    <div className="flex flex-wrap items-center justify-between gap-1 text-xs ml-auto">

                    </div>
                </div>

                <div className=" bg-white rounded grow">
                    <div className="px-2 lg:px-4">
                        {/* 4 BUTTONS */}
                        <div className="flex flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap minbox">
                            <CustomButton1
                                label={"Add "}
                                icon={<IoMdAdd />}
                                className="bg-prp-color text-white shrink grow md:grow-0 max-w-[50%]"
                                onClick={() => setPopupVisitorDetailsAdd(true)}
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
                                        <td>Visitor Company</td>
                                        <td>Visitor Type</td>
                                        <td>Visitor Name</td>
                                        <td>Visitor Phone</td>
                                        <td>Email id</td>
                                        <td>Date of Birth</td>
                                        <td>Vehicle</td>
                                        <td>License</td>
                                        <td>License expiry Date</td>
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
                                                    onClick={() => setPopupVisitorDetailsEdit(true)}
                                                />
                                                <CustomButton1
                                                    className="bg-eye text-white grow max-w-[50px]"
                                                    icon={<BsEyeFill />}
                                                //  onClick={() =>setPopupItemInformationInView(true)}
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
                                        <td>Lorem ipsum</td>
                                        <td>10/08/2023</td>
                                        <td>Admin</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <div className="gap-2">
                                                <CustomButton1
                                                    className="bg-sixt text-white grow max-w-[50px] "
                                                    icon={<BiEdit />}
                                                    onClick={() => setPopupVisitorDetailsEdit(true)}
                                                />
                                                <CustomButton1
                                                    className="bg-eye text-white grow max-w-[50px] "
                                                    icon={<BsEyeFill />}
                                                //onClick={() =>setPopupItemInformationInView(true)}
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
                                        <td>Lorem ipsum</td>
                                        <td>10/08/2023</td>
                                        <td>Admin</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                    {/* POPUP 1 : ADD */}
                    {popupVisitorDetailsAdd && (
                        <PopUp>
                            <div className="pb-10 bg-white rounded-lg">
                                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                                    <h1 className="text-l font-weight-[400]">Add Visitor Details</h1>
                                    <div className="flex items-center text-sm"></div>
                                </div>

                                <div className="p-5 mx-auto">
                                    <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3">
                                        <div>
                                            <CustomSelect1 label={"Visitor Company"} placeholder={"ENTER"} />
                                        </div>
                                        <div>
                                            <CustomSelect1 label={"Visitor Type"} placeholder={"ENTER"} />
                                        </div>

                                        <div className="">
                                            <CustomTextField2
                                                label={"Visitor Name"}
                                                placeholder={"ENTER"}
                                            ></CustomTextField2>
                                        </div>
                                        <div className="">
                                            <CustomTextField2
                                                label={"Visitor Phone"}
                                                placeholder={"ENTER"}
                                            ></CustomTextField2>
                                        </div>
                                        <div>
                                            {/* <CustomTextField2
                                                    label={"Email Id"}
                                                    placeholder={"ENTER"}
                                                /> */}
                                            <CustomEmail label="Email" placeholder="Enter" />
                                        </div>
                                        <div>
                                            <CustomDate
                                                label={"Date"}
                                                placeholder={"ENTER"}
                                            />
                                        </div>
                                        <div>
                                            <CustomTextField2
                                                label={"Vehicle"}
                                                placeholder={"ENTER"}
                                            />
                                        </div>
                                        <div>
                                            <CustomTextField2
                                                label={"License"}
                                                placeholder={"ENTER"}
                                            />
                                        </div>
                                        <div>
                                            <CustomDate
                                                label={"Date"}
                                                placeholder={"ENTER"}
                                            />
                                        </div>
                                        <div className="">
                                            <CustomCheckBox2
                                                label={"Is Active"}
                                                state={checkboxVisitorDetailsAdd}
                                                setState={setCheckboxVisitorDetailsAdd}
                                            ></CustomCheckBox2>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-5">
                                    <div>
                                        <CustomButton1 label={"Submit"} className="text-white bg-prp-color" />
                                    </div>
                                    <div onClick={() => setPopupVisitorDetailsAdd(false)}>
                                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                                    </div>
                                </div>
                            </div>
                        </PopUp>
                    )}

                    {/* POPUP 2 : EDIT */}
                    {popupVisitorDetailsEdit && (
                        <PopUp>
                            <div className="pb-10 bg-white rounded-lg">
                                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                                    <h1 className=" font-weight-[400]">Edit Visitor Details</h1>
                                    <div className="flex items-center text-sm"></div>
                                </div>

                                <div className="p-5 mx-auto">
                                    <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3">
                                        <div>
                                            <CustomSelect1 label={"Visitor Company"} placeholder={"ENTER"} />
                                        </div>
                                        <div>
                                            <CustomSelect1 label={"Visitor Type"} placeholder={"ENTER"} />
                                        </div>

                                        <div className="">
                                            <CustomTextField2
                                                label={"Visitor Name"}
                                                placeholder={"ENTER"}
                                            ></CustomTextField2>
                                        </div>
                                        <div className="">
                                            <CustomTextField2
                                                label={"Visitor Phone"}
                                                placeholder={"ENTER"}
                                            ></CustomTextField2>
                                        </div>
                                        <div>
                                            {/* <CustomTextField2
                                                    label={"Email Id"}
                                                    placeholder={"ENTER"}
                                                /> */}
                                            <CustomEmail label="Email" placeholder="Enter" />
                                        </div>
                                        <div>
                                            <CustomDate
                                                label={"Date"}
                                                placeholder={"ENTER"}
                                            />
                                        </div>
                                        <div>
                                            <CustomTextField2
                                                label={"Vehicle"}
                                                placeholder={"ENTER"}
                                            />
                                        </div>
                                        <div>
                                            <CustomTextField2
                                                label={"License"}
                                                placeholder={"ENTER"}
                                            />
                                        </div>
                                        <div>
                                            <CustomDate
                                                label={"Date"}
                                                placeholder={"ENTER"}
                                            />
                                        </div>
                                        <div className="">
                                            <CustomCheckBox2
                                                label={"Is Active"}
                                                state={checkboxVisitorDetailsAdd}
                                                setState={setCheckboxVisitorDetailsAdd}
                                            ></CustomCheckBox2>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-5">
                                    <div>
                                        <CustomButton1 label={"Update"} className="text-white bg-prp-color" />
                                    </div>
                                    <div onClick={() => setPopupVisitorDetailsEdit(false)}>
                                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                                    </div>
                                </div>
                            </div>
                        </PopUp>
                    )}
                </div>
            </div>
        </div>
    );
}