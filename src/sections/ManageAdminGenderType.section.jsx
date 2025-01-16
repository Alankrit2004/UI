// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import { Title } from "components";
import { CustomButton1 } from "components";
import { PopUp } from "components";
import { CustomTextField2 } from "components";
import { CustomCheckBox2 } from "components";

// ICONSbg-white
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineImport } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

export function ManageAdminGenderType() {
    let [popupCustomerDetailAdd, setPopupCustomerDetailAdd] = useState(false);
    let [popupAdminGenderTypeEdit, setPopupAdminGenderTypeEdit] = useState(false);
    let [checkboxAdminGenderTypeAdd, setCheckboxAdminGenderTypeAdd] = useState(true);
    let [checkboxAdminGenderTypeEdit, setCheckboxAdminGenderTypeEdit] = useState(true);

    const [custTypeAdd, setCustTypeAdd] = useState("");
    const [custTypeEdit, setCustTypeEdit] = useState("");

    const getStatusColor = (status) => {
        return status === 'Active' ? 'text-green-500' : 'text-red-500';
    };

    return (
        <div className="flex flex-col h-full p-2 uppercase">
            <div className="p-4 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"Admin Gender Type"} title2={"ADMINISTRATOR"} />

                <div className="  flex md:justify-between items-center flex-row flex-wrap justify-start gap-1 mt-5 md:flex-nowrap p-2">
                    <button className="smlbtn"> Excel</button>

                    <div className="flex flex-wrap items-center justify-between gap-1 text-xs ml-auto">
                        <CustomButton1
                            label={"Import Gender Type"}
                            icon={<AiOutlineImport />}
                            className=" bg-prp-color text-white grow "
                        />
                        <CustomButton1
                            label={"Sample Download"}
                            icon={<AiOutlineDownload />}
                            className=" bg-prp-color text-white grow "
                        />
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
                                onClick={() => setPopupCustomerDetailAdd(true)}
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
                                        <td>Gender Type</td>
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
                                                    onClick={() => setPopupAdminGenderTypeEdit(true)}
                                                />
                                            </div>
                                        </td>
                                        <td className={getStatusColor('Active')}>Active</td>
                                        <td>Lorem ipsum</td>
                                        <td>10/08/2023</td>
                                        <td>Admin</td>

                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <div>
                                                <CustomButton1
                                                    className="bg-sixt text-white grow max-w-[50px]"
                                                    icon={<BiEdit />}
                                                    onClick={() => setPopupAdminGenderTypeEdit(true)}
                                                />
                                            </div>
                                        </td>
                                        <td className={getStatusColor('Active')}>Active</td>
                                        <td>Lorem ipsum</td>
                                        <td>10/08/2023</td>
                                        <td>Admin</td>

                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                    {/* POPUP 1 : ADD */}
                    {popupCustomerDetailAdd && (
                        <PopUp>
                            <div className="pb-10 bg-white rounded-lg">
                                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                                    <h1 className="text-l font-weight-[400]">Add Gender Type</h1>
                                    <div className="flex items-center text-sm">

                                    </div>
                                </div>
                                <div className="p-2 mx-auto">
                                    <table className="max-w-full popup-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <CustomTextField2
                                                        label={"Gender Type"}
                                                        placeholder={"ENTER"}
                                                        value={custTypeAdd}
                                                        onChange={setCustTypeAdd}
                                                    ></CustomTextField2>
                                                </td>
                                                <td>
                                                    <CustomCheckBox2
                                                        label={"Is Active"}
                                                        state={checkboxAdminGenderTypeAdd}
                                                        setState={setCheckboxAdminGenderTypeAdd}
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
                                    <div onClick={() => setPopupCustomerDetailAdd(false)}>
                                        <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                                    </div>
                                </div>
                            </div>
                        </PopUp>
                    )}

                    {/* POPUP 2 : EDIT */}
                    {popupAdminGenderTypeEdit && (
                        <PopUp>
                            <div className="pb-10 bg-white rounded-lg">
                                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                                    <h1 className=" font-weight-[400]">Edit Gender Type</h1>
                                    <div className="flex items-center text-sm">

                                    </div>
                                </div>

                                <div className="p-2 mx-auto">
                                    <table className="max-w-full popup-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <CustomTextField2
                                                        label={"Gender Type"}
                                                        placeholder={"ENTER"}
                                                        value={custTypeEdit}
                                                        onChange={setCustTypeEdit}
                                                    ></CustomTextField2>
                                                </td>
                                                <td>
                                                    <CustomCheckBox2
                                                        label={"Is Active"}
                                                        state={checkboxAdminGenderTypeEdit}
                                                        setState={setCheckboxAdminGenderTypeEdit}
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
                                    <div onClick={() => setPopupAdminGenderTypeEdit(false)}>
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
