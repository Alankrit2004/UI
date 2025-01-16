// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {PopUp} from "components";
import {CustomTextField2} from "components";
import {CustomCheckBox2} from "components";

// ICONS
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import {CustomSelect1} from "components";

export function TabBrand() {
    let [popupAdd, setPopupAdd] = useState(false);
    let [popupEdit, setPopupEdit] = useState(false);
    let [checkboxAdd, setCheckboxAdd] = useState(true);
    let [checkboxEdit, setCheckboxEdit] = useState(true);

    const [brandAdd, setBrandAdd] = useState("");
    const [brandEdit, setBrandEdit] = useState("");

    const getStatusColor = (status) => {
        return status === 'Active' ? 'text-green-500' : 'text-red-500';
    };

    return (
        <>
            <div>
                {/* 4 BUTTONS */}
                <div className="flex flex-row flex-wrap justify-start gap-2 md:flex-nowrap minbox">
                    <CustomButton1
                        label={"Add "}
                        icon={<IoMdAdd />}
                        className="bg-prp-color text-white shrink grow md:grow-0 max-w-[50%]"
                        onClick={() => setPopupAdd(true)}
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
                                <td>Paper Type</td>
                                <td>Brand</td>
                                <td>Created Date </td>
                                <td>Created By </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>
                                    <div>
                                        <CustomButton1
                                            className="bg-sixt text-white grow max-w-[50px]"
                                            icon={<BiEdit />}
                                            onClick={() => setPopupEdit(true)}
                                        />
                                    </div>
                                </td>
                                <td className={getStatusColor('Active')}>Active</td>
                                <td>Lorem ipsum dolor </td>
                                <td>Lorem ipsum dolor </td>
                                <td>10/08/2023</td>
                                <td>Admin</td>
                                
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div>
                                        <CustomButton1
                                            icon={<BiEdit />}
                                            className="bg-sixt text-white grow max-w-[50px]"
                                            onClick={() => setPopupEdit(true)}
                                        />
                                    </div>
                                </td>
                                <td className={getStatusColor('Active')}>Active</td>
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
                    <div className="pb-10 bg-white rounded-lg">
                        <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                            <h1 className="text-xl font-weight-[400]">Add Paper Type</h1>
                            <div className="flex  item-center text-sm"></div>
                        </div>

                        <div className="p-4 mx-auto w-[700px]">
                            <table className="w-[100%] mx-auto popup-table">
                                <tbody>
                                    <tr>
                                        <td className="w-[41%]">
                                            <CustomSelect1
                                                label={"Paper Type"}
                                                isRequired={false}
                                                placeholder={"ENTER"}
                                            ></CustomSelect1>
                                        </td>
                                        <td className="w-[41%]">
                                            <CustomTextField2
                                                label={"Brand"}
                                                isRequired={false}
                                                placeholder={"ENTER"}
                                                value={brandAdd}
                                                onChange={setBrandAdd} 
                                            ></CustomTextField2>
                                        </td>
                                        <td className="align-bottom w-[18%]">
                                            <CustomCheckBox2
                                                label={"Is Active"}
                                                state={checkboxAdd}
                                                setState={setCheckboxAdd}
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
                            <div onClick={() => setPopupAdd(false)}>
                                <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                            </div>
                        </div>
                    </div>
                </PopUp>
            )}

            {/* POPUP 2 : EDIT */}
            {popupEdit && (
                <PopUp>
                    <div className="pb-10 bg-white rounded-lg">
                        <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                            <h1 className="text-xl font-weight-[300]">Edit Paper Type</h1>
                            <div className="flex  item-center text-sm"></div>
                        </div>

                        <div className="p-4 mx-auto w-[700px]">
                            <table className="w-[100%] mx-auto popup-table">
                                <tbody>
                                    <tr>
                                        <td className="w-[41%]">
                                            <CustomSelect1
                                                label={"Paper Type"}
                                                isRequired={false}
                                                placeholder={"ENTER"}
                                            ></CustomSelect1>
                                        </td>
                                        <td className="w-[41%]">
                                            <CustomTextField2
                                                label={"Brand"}
                                                isRequired={false}
                                                placeholder={"ENTER"}
                                                value={brandEdit}
                                                onChange={setBrandEdit}
                                            ></CustomTextField2>
                                        </td>
                                        <td className="align-bottom w-[18%]">
                                            <CustomCheckBox2
                                                label={"Is Active"}
                                                state={checkboxEdit}
                                                setState={setCheckboxEdit}
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
                            <div onClick={() => setPopupEdit(false)}>
                                <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                            </div>
                        </div>
                    </div>
                </PopUp>
            )}
        </>
    )
}
