import * as React from "react";
import { useState } from "react";

import {PopUp} from "components";
import { CustomButton1 } from "components";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";


import { EditBillingDetailsAddPopup } from "components";
import { EditBillingDetailsEditPopup } from "components";

export function EditBillingDetails({ next, back, onCancel }) {
    const [popupOpen, setPopupOpen] = useState(false)
    const [popupOpenEdit, setPopupOpenEdit] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    let [checkboxSameAddress, setCheckboxSameAddress] = useState(false);

    const handleChange = (event) => {
        event.target.value = event.target.value.toUpperCase();
    };

    const getStatusColor = (status) => {
        return status === 'Active' ? 'text-green-500' : 'text-red-500';
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-md bg-gray-200 border border-gray-400 font-light`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <>
            <div>
                <div className="p-2 mx-auto">
                    <div className="flex items-center gap-10 mt-5 ps-5">
                        <label htmlFor="id" className="text-sm font-[400]">
                            Customer Name <span className="text-red-500 gap-3">*</span>
                        </label>
                        <input
                            type="text"
                            readOnly
                            required
                            className="p-2 border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs uppercase max-w-[300px]"
                            id="id"
                            placeholder="Lorem Ipsum"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="px-2 lg:px-4">
                    {/* 4 BUTTONS */}
                    <div className="  flex md:justify-between items-center flex-row flex-wrap justify-start gap-1 md:flex-nowrap">
                        <button className="smlbtn"> Excel</button>
                    </div>

                    <div className="flex flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap">
                        <CustomButton1
                            label={"Add "}
                            icon={<IoMdAdd />}
                            className="bg-prp-color text-white shrink grow md:grow-0 max-w-[50%]"
                            onClick={() => setPopupOpen(true)}
                        />

                        <div className="flex items-center border justify-between gap-1 px-2  ml-auto text-[rgba(0, 0, 0, 0.50)] boreder rounded bg-white shrink grow md:grow-0">
                            <input
                                type="text"
                                className="w-[200px] grow  capitalize bg-transparent placeholder:text-sm"
                                placeholder="SEARCH"
                            />
                            <AiOutlineSearch className="min-w-[20px]" />
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="mt-2 max-w-[80vw] hide-scrollbar overflow-auto table-container">
                        <table className="w-full custom-table" border={1}>
                            <thead>
                                <tr className="table-heading">
                                    <td className="">S.No</td>
                                    <td>Status</td>
                                    <td>Street</td>
                                    <td>Country</td>
                                    <td>State/Providance</td>
                                    <td>Postal Zip Code</td>
                                    <td>Created Date</td>
                                    <td>Created By</td>
                                    <td>Action</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td className={getStatusColor('Active')}>Active</td>
                                    <td>Lorem ipsum</td>
                                    <td>Lorem ipsum</td>
                                    <td>Lorem ipsum</td>
                                    <td>Lorem ipsum</td>
                                    <td>10/08/2023</td>
                                    <td>Admin</td>
                                    <td>
                                        <div>
                                            <CustomButton1
                                                className="bg-sixt text-white grow max-w-[50px]"
                                                icon={<BiEdit />}
                                                onClick={() => setPopupOpenEdit(true)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td className={getStatusColor('Active')}>Active</td>
                                    <td>Lorem ipsum</td>
                                    <td>Lorem ipsum</td>
                                    <td>Lorem ipsum</td>
                                    <td>Lorem ipsum</td>
                                    <td>10/08/2023</td>
                                    <td>Admin</td>
                                    <td>
                                        <div>
                                            <CustomButton1
                                                className="bg-sixt text-white grow max-w-[50px]"
                                                icon={<BiEdit />}
                                                onClick={() => setPopupOpenEdit(true)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                        <div className="text-sm text-black font-light ">
                            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, 2)} of 2 entries
                        </div>

                        <div className="flex gap-2">
                            <div className="flex items-center">
                                <button
                                    className={`px-2 py-1 mx-1 rounded-md text-white font-light bg-red-500`}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {renderPageNumbers()}
                                <button
                                    className={`px-2 py-1 mx-1 rounded-md text-white font-light  bg-red-500`}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <hr className="mx-5 mt-5" /> */}
                <div className="flex items-center gap-4 mt-3 ps-5">
                    <label htmlFor="id" className="text-sm font-400">
                        Is Shipping and Billing address is same ?
                    </label>
                    <div
                        className={`${checkboxSameAddress ? "bg-prp-color" : "bg-white"
                            } border border-gray-300 flex justify-center items-center rounded h-[25px] w-[25px]`}
                        onClick={() => setCheckboxSameAddress(!checkboxSameAddress)}
                    >
                        <BsCheck className="text-2xl text-white" />
                    </div>
                </div>

                <div className="flex justify-center gap-5 mt-5">
                    <div onClick={back}>
                        <CustomButton1 label={"Back"} variant="outlined" className="txt-prp-color" />
                    </div>
                    <div onClick={next}>
                        <CustomButton1 label={"Save and Continue"} className="text-white bg-prp-color" />
                    </div>
                    <div onClick={onCancel}>
                        <CustomButton1 label={"Cancel"} className="text-white bg-prp-color" />
                    </div>
                </div>
            </div>

            {/* POPUP 1 : ADD */}
            {popupOpen && (
                <PopUp>
                    <EditBillingDetailsAddPopup
                        onCancel={() => setPopupOpen(false)}
                    />

                </PopUp>
            )}

            {/* POPUP 1 : EDIT */}
            {popupOpenEdit && (
                <PopUp>
                    <EditBillingDetailsEditPopup
                        onCancel={() => setPopupOpenEdit(false)}
                    />

                </PopUp>
            )}
        </>
    )
}
