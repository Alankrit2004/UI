// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import { Title } from "components";
import { CustomButton1 } from "components";
import { PopUp } from "components";
import { CustomSelect3 } from "components";

// ICONSbg-white
import { IoMdAdd, IoMdRefresh } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";

import { ManageBookingIssueAdd } from "components";
import { ManageBookingIssueEdit } from "components";
import { ManageBookingIssueView } from "components";

const options = [
    { value: 'a', label: 'Lorem Ipsum' },
    { value: 'b', label: 'Lorem Ipsum' },
    { value: 'c', label: 'Lorem Ipsum' },
    { value: 'd', label: 'Lorem Ipsum' }
];

export function ManageBookingIssue() {
    let [popupAdd, setPopupAdd] = useState(false);
    let [popupEdit, setPopupEdit] = useState(false);
    let [popupView, setPopupView] = useState(false);

    return (
        <div className="flex flex-col h-full p-2 uppercase">
            <div className="p-4 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"Manage Booking Issue"} title2={"Manage Tracking"} />

                <div className="  flex md:justify-between items-center flex-row flex-wrap justify-start gap-1 mt-5 md:flex-nowrap p-2">
                    <button className="smlbtn"> Excel</button>

                    <div className="flex flex-wrap items-center justify-between gap-1 text-xs ml-auto">
                    </div>
                </div>

                <div className=" bg-white rounded grow">
                    <div className="px-2 lg:px-4">
                        <div>
                            <div className="flex flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap minbox">
                                {/* <CustomButton1
                                    label={"Add"}
                                    icon={<IoMdAdd />}
                                    className="custmbtn text-fourth shrink grow md:grow-0 max-w-[50%]"
                                    onClick={() => setPopupAdd(true)}
                                /> */}

                                <div className="flex items-center justify-between gap-1 px-2  ml-auto text-[rgba(0, 0, 0, 0.50)] boreder rounded bg-white shrink grow md:grow-0">
                                    <input
                                        type="text"
                                        className="w-[150px] grow capitalize bg-transparent placeholder:text-sm"
                                        placeholder="SEARCH"
                                    />
                                    <AiOutlineSearch className="min-w-[20px]" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-between  px-2  ml-auto text-[rgba(0, 0, 0, 0.50)]  minbox">
                                <div className="w-[22%] ">
                                    <CustomSelect3 options={options} placeholder="Country" />
                                </div>
                                <div className="w-[22%] ">
                                    <CustomSelect3 options={options} placeholder="Customer Name" />
                                </div>
                                <div className="w-[22%] ">
                                    <CustomSelect3 options={options} placeholder="PO#" />
                                </div>
                                <div className="w-[22%] ">
                                    <CustomSelect3 options={options} placeholder="Invoice#" />
                                </div>
                                <div className="flex justify-end gap-2 w-[12%]">
                                    <CustomButton1 icon={<IoSearchSharp />} className="text-white bg-prp-color py-2" />
                                    <CustomButton1 icon={<IoMdRefresh />} className="bg-white py-2" />
                                </div>
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="mt-7 max-w-[100vw] hide-scrollbar overflow-auto table-container">
                            <table className="w-full custom-table" border={1}>
                                <thead>
                                    <tr className="table-heading">
                                        <td className="">S.No</td>
                                        <td>Action</td>
                                        <td>Customer Name</td>
                                        <td>Parent Customer</td>
                                        <td>Country</td>
                                        <td>Payment Terms</td>
                                        <td>Qty</td>
                                        <td>Currency Type</td>
                                        <td>Currency Value</td>
                                        <td>PO Number</td>
                                        <td>Type of Packaging</td>
                                        <td>Delivery Terms</td>
                                        <td>PO Status</td>
                                        <td>Tracking Status</td>
                                        <td>PO UPload </td>
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
                                                    onClick={() => setPopupEdit(true)}
                                                />
                                                <CustomButton1
                                                    className="bg-eye text-white grow max-w-[50px]"
                                                    icon={<BsEyeFill />}
                                                    onClick={() => setPopupView(true)}
                                                />
                                            </div>
                                        </td>
                                        <td>Lorem ipsum</td>
                                        <td>Lorem ipsum</td>
                                        <td>Lorem ipsum</td>
                                        <td>Lorem ipsum</td>
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
                                                    className="bg-sixt text-white grow max-w-[50px]"
                                                    icon={<BiEdit />}
                                                    onClick={() => setPopupEdit(true)}
                                                />
                                                <CustomButton1
                                                    className="bg-eye text-white grow max-w-[50px]"
                                                    icon={<BsEyeFill />}
                                                    onClick={() => setPopupView(true)}
                                                />
                                            </div>
                                        </td>
                                        <td>Lorem ipsum</td>
                                        <td>Lorem ipsum</td>
                                        <td>Lorem ipsum</td>
                                        <td>Lorem ipsum</td>
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

                    {popupAdd && (
                        <PopUp>
                            <ManageBookingIssueAdd
                                onCancel={() => setPopupAdd(false)}
                            />
                        </PopUp>
                    )}

                    {popupEdit && (
                        <PopUp>
                            <ManageBookingIssueEdit
                                onCancel={() => setPopupEdit(false)}
                            />
                        </PopUp>
                    )}

                    {popupView && (
                        <PopUp>
                            <ManageBookingIssueView
                                onCancel={() => setPopupView(false)}
                            />
                        </PopUp>
                    )}
                </div>
            </div>
        </div>
    );
}



