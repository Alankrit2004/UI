// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import { CustomButton1 } from "components";
import { PopUp } from "../../general-components/PopUp.componenet";

// ICONS
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BiEdit, BiLike, BiDislike } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { AllLeadsEdit } from "components";

export function AllLeads() {
    let [popupAdd, setPopupAdd] = useState(false);
    let [popupEdit, setPopupEdit] = useState(false);
    let [popupView, setPopupView] = useState(false);

    const getStatusColor = (status) => {
        return status === 'Active' ? 'text-green-500' : 'text-red-500';
    };

    return (
        <>
            {/* 4 BUTTONS + TABLE */}
            <div className="">
                {/* 4 BUTTONS */}
                <div className="flex flex-row flex-wrap justify-start gap-2  md:flex-nowrap minbox">
                    <CustomButton1
                        label={"Add "}
                        icon={<IoMdAdd />}
                        className="bg-prp-color text-white shrink grow md:grow-0 max-w-[50%]"
                        onClick={() => setPopupAdd(true)}
                    />

                    <div className="flex items-center justify-between gap-1 px-2 ml-auto bg-white shrink grow md:grow-0">
                        <input
                            type="text"
                            className="w-[150px] grow capitalize bg-transparent "
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
                                <td className="">S.No.</td>
                                <td >Action</td>
                                <td>Status</td>
                                <td>Company Name</td>
                                <td>Contact Name</td>
                                <td>Mobile #</td>
                                <td>Email Id</td>
                                <td>Login Id (Mobile#)</td>
                                <td>Password (System Generated)</td>
                                <td>10/08/2023</td>
                                <td>Admin</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>
                                    <div className="flex gap-1">
                                        <CustomButton1
                                            icon={<BiEdit />}
                                            className="bg-sixt text-white grow max-w-[30px] "
                                            onClick={() => setPopupEdit(true)}
                                        />
                                        <CustomButton1
                                            icon={<BiLike />}
                                            className="bg-green-500 text-white grow max-w-[30px] "
                                        // onClick={() => setPopupEdit(true)}
                                        />
                                        <CustomButton1
                                            icon={<BiDislike />}
                                            className="bg-red-500 text-white grow max-w-[30px] "
                                        // onClick={() => setPopupEdit(true)}
                                        />
                                        <CustomButton1
                                            className="bg-eye text-white grow max-w-[30px]"
                                            icon={<BsEyeFill />}
                                            onClick={() => setPopupView(true)}
                                        />
                                    </div>
                                </td>
                                <td className={getStatusColor('Active')}>Active</td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>10/08/2023</td>
                                <td>Admin</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div className="flex gap-1">
                                        <CustomButton1
                                            icon={<BiEdit />}
                                            className="bg-sixt text-white grow max-w-[30px] "
                                            onClick={() => setPopupEdit(true)}
                                        />
                                        <CustomButton1
                                            icon={<BiLike />}
                                            className="bg-green-500 text-white grow max-w-[30px] "
                                        // onClick={() => setPopupEdit(true)}
                                        />
                                        <CustomButton1
                                            icon={<BiDislike />}
                                            className="bg-red-500 text-white grow max-w-[30px] "
                                        // onClick={() => setPopupEdit(true)}
                                        />
                                        <CustomButton1
                                            className="bg-eye text-white grow max-w-[30px]"
                                            icon={<BsEyeFill />}
                                            onClick={() => setPopupView(true)}
                                        />
                                    </div>
                                </td>
                                <td className={getStatusColor('Active')}>Active</td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>10/08/2023</td>
                                <td>Admin</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

            {/* POPUP 1 : ADD */}
            {popupAdd && (
                <PopUp>
                    <AllLeadsEdit
                        onCancel={() => setPopupAdd(false)}
                    />
                </PopUp>
            )}

            {/* POPUP 2 : EDIT */}
            {popupEdit && (
                <PopUp>
                    < AllLeadsEdit
                        onCancel={() => setPopupEdit(false)}
                    />
                </PopUp>
            )}

            {/* POPUP 2 : EDIT */}
            {popupView && (
                <PopUp>
                    < AllLeadsEdit
                        onCancel={() => setPopupView(false)}
                    />
                </PopUp>
            )}
        </>
    )
}