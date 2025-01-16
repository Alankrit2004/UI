import React from "react";
import {CustomCheckBox2} from "components";
import {CustomButton1} from "components";
import {CustomViewLabel} from "components";

export const ManageCompanyDetailView = ({ checkboxCompanyNameView, setCheckboxCompanyNameView, onCancel }) => {
    const company_Data = [
        {
            name: "Lorem ipsum",
            com_type: "Lorem ipsum",
            reg_num: "Lorem ipsum",
            contact: "Lorem ipsum",
            email: "Lorem ipsum",
            website: "Lorem ipsum",
            gst: "Lorem ipsum",
            pan_num: "Lorem ipsum",
            tax_num: "Lorem ipsum",
            address: "Lorem ipsum",
            region: "Lorem ipsum",
            state: "Lorem ipsum",
            district: "Lorem ipsum",
            city: "Lorem ipsum",
            pinCode: "Lorem ipsum",
            total_user: "Lorem ipsum",
            total_branch: "Lorem ipsum",
            image: "Lorem ipsum",
            createdDate: "10/08/2023",
            createdBy: "Admin"
        },
    ];

    return (
        <div className="pb-10 bg-white rounded-lg">
            <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                <h1 className="text-xl font-weight-[300]">View Company</h1>
                <div className="flex item-center text-sm"></div>
            </div>

            <div className="p-5 mx-auto overflow-scroll overflow-x-auto overflow-y-auto" style={{ maxHeight: "500px" }}>
                <table className="max-w-full popup-table w-[1050px] ">
                    {company_Data.map((trData, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>
                                    <CustomViewLabel label="Company Name" value={trData.name} />
                                </td>
                                <td>
                                    <CustomViewLabel label=" Company type" value={trData.com_type} />
                                </td>
                                <td>
                                    <CustomViewLabel label=" registration number " value={trData.reg_num} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomViewLabel label="Contact Number" value={trData.contact} />
                                </td>
                                <td>
                                    <CustomViewLabel label="Email" value={trData.email} />
                                </td>
                                <td>
                                    <CustomViewLabel label="Website" value={trData.website} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomViewLabel label=" GST Number " value={trData.gst} />
                                </td>
                                <td>
                                    <CustomViewLabel label=" Pan Number " value={trData.pan_num} />
                                </td>
                                <td>
                                    <CustomViewLabel label=" Tax Number /CIN " value={trData.tax_num} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomViewLabel label="Address" value={trData.address} />
                                </td>
                                <td>
                                    <CustomViewLabel label="Country" value={trData.region} />
                                </td>
                                <td>
                                    <CustomViewLabel label="State" value={trData.state} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CustomViewLabel label="District" value={trData.district} />
                                </td>
                                <td>
                                    <CustomViewLabel label=" Pin code " value={trData.pinCode} />
                                </td>
                                <td>
                                    <CustomViewLabel label=" Total Number of User " value={trData.total_user} />
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <CustomViewLabel label=" Total branches " value={trData.total_branch} />
                                </td>
                                <td>
                                    <CustomViewLabel label="image-upload" value={trData.image} />
                                </td>
                                <td>
                                    <CustomCheckBox2
                                        label={"Is Active"}
                                        state={checkboxCompanyNameView}
                                        setState={setCheckboxCompanyNameView}
                                        disabled={true}
                                    ></CustomCheckBox2>
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <CustomViewLabel label="Created Date" value={trData.createdDate} />
                                </td>
                                <td>
                                    <CustomViewLabel label="Created By" value={trData.createdBy} />
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>

            <div className="flex justify-center">
                <div onClick={onCancel}>
                    <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
                </div>
            </div>
        </div>
    );
};

