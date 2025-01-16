// CORE
import * as React from "react";
import { useState } from "react";
import '../assets/css/tracking.css'

// COMPONENTS
import {Title} from "components";
import {CustomButton1} from "components";
import {CustomSelect3} from "components";
import {CustomBrowse2} from "components";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import {CustomOptions} from "components";

const options = [
    { value: 'a', label: 'Lorem Ipsum' },
    { value: 'b', label: 'Lorem Ipsum' },
    { value: 'c', label: 'Lorem Ipsum' },
    { value: 'd', label: 'Lorem Ipsum' }
];

export function ManageTrackingStatusCustomer() {
    return (
        <>
            <div className="flex flex-col h-full p-2 uppercase">
                <div className="p-4 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                    <Title title1={"Manage Tracking Status"} title2={"Manage Tracking"} />

                    <div className="flex items-center gap-2 justify-between  px-2 mt-5  ml-auto text-[rgba(0, 0, 0, 0.50)]  minbox">
                        <div className="w-[29%] ">
                            <CustomSelect3 options={options} placeholder="Locaton" readOnly={true} />
                        </div>
                        <div className="w-[29%] ">
                            <CustomSelect3 options={options} placeholder="Customer Name" readOnly={true} />
                        </div>
                        <div className="w-[29%] ">
                            <CustomSelect3 options={options} placeholder="Current status" readOnly={true} />
                        </div>
                        <div className="flex justify-end gap-2 w-[12%]">
                            <CustomButton1 icon={<IoSearchSharp />} className="text-white bg-prp-color py-2" />
                            <CustomButton1 icon={<IoMdRefresh />} className="bg-white py-2" />
                        </div>

                    </div>

                    <div className=" bg-white rounded grow">
                        <div className="col-12 col-md-10  pt45 pb20">
                            <div className="row flex justify-content-between">
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center gap-1 items-center">
                                        <p>PO Recived<br /><span>24/04/2024 10:00 am</span></p>
                                        <div className="text-xs ">Uploaded By: <span>User</span></div>
                                        <CustomBrowse2 id="po-upload" />
                                    </div>
                                </div>
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center gap-1 items-center">
                                        <p>PI Issued<br /><span>24/04/2024 11:00 am</span></p>
                                        <div className="text-xs ">Uploaded By: <span>User</span></div>
                                        <CustomBrowse2 id="pi-issued" />
                                    </div>
                                </div>
                                <div className="order-tracking completed">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>PI Confirmation By Customer</p>
                                        <span>24/04/2024 11:00 am</span>
                                        <div className="text-xs mb-0.5">Uploaded By: <span>User</span></div>
                                        <CustomOptions />
                                        <div className="mx-0 flex justify-center text-center mt-1">
                                            <span className="div-boder-completed"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row  flex flex-row-reverse  justify-content-between mt-1">
                                <div className="order-tracking-revs completed">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>"Payment Received / LC Received</p>
                                        <span>24/04/2024 11:40 am</span>
                                        <div className="text-xs mb-0.5">Uploaded By: <span>User</span></div>
                                        <CustomButton1 label={"Advance Payment"} className="text-white bg-prp-color " />
                                    </div>
                                </div>
                                <div className="order-tracking-revs completed">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Order Accepted<br /><span>24/04/2024 11:50 am</span></p>
                                        <div className="text-xs ">Uploaded By: <span>User</span></div>
                                    </div>
                                </div>
                                <div className="order-tracking-revs ">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Order Under Process</p>
                                        <div className="mx-0 flex justify-center text-center mt-1">
                                            <span className="div-boder-pending"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row flex justify-content-between mt-1">
                                <div className="order-tracking">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Booking Issue</p>
                                    </div>
                                </div>
                                <div className="order-tracking">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Containers Under Loading<br /></p>
                                    </div>
                                </div>
                                <div className="order-tracking ">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Invoice Generated</p>
                                        <div className="mx-0 flex justify-center text-center mt-1">
                                            <span className="div-boder-pending"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row  flex flex-row-reverse  justify-content-between mt-1">
                                <div className="order-tracking-revs ">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>BI Draft Issued</p>
                                    </div>
                                </div>
                                <div className="order-tracking-revs  ">
                                    <span className="is-complete"></span>
                                    <p>Final BI Issued</p>
                                </div>
                                <div className="order-tracking-revs ">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Final Amount to Pay - 1,000</p>
                                        <div className="mx-0 flex justify-center text-center mt-1">
                                            <span className="div-boder-pending"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row flex justify-content-between mt-1">
                                <div className="order-tracking">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Document Send Through <br /> DHL / Submitted</p>
                                    </div>
                                </div>
                                <div className="order-tracking ">
                                    <span className="is-complete"></span>
                                    <p>AWB Genetated-Pending</p>
                                </div>
                                <div className="order-tracking">
                                    <span className="is-complete"></span>
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Order Completed-Pending </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}




