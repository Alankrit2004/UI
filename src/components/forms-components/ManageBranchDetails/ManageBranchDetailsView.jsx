import React from 'react'
import { CustomCheckBox2 } from "components";
import { CustomButton1 } from "components";
import { CustomViewLabel } from "components";

export function ManageBranchDetailsView({ checkboxBranchNameView, setCheckboxBranchNameView, onCancel }) {
    const branch_Data = [
        {
            name: "Lorem ipsum",
            com_type: "Lorem ipsum",
            contact: "Lorem ipsum",
            email: "Lorem ipsum",
            branch_head: "Lorem ipsum",
            address: "Lorem ipsum",
            region: "Lorem ipsum",
            state: "Lorem ipsum",
            district: "Lorem ipsum",
            city: "Lorem ipsum",
            pinCode: "Lorem ipsum",
            total_branch_user: "Lorem ipsum",
            createdDate: "10/08/2023",
            createdBy: "Admin"
        },
    ];
    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
                    <h1 className="text-xl font-weight-[400]">View Branch Details</h1>
                    <div className="flex  item-center text-sm"></div>
                </div>

                <div className="p-2 mx-auto">
                    <table className="max-w-full popup-table w-[1050px]">
                        {branch_Data.map((trData, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        <CustomViewLabel label="Branch Name" value={trData.name} />
                                    </td>
                                    <td>
                                        <CustomViewLabel label=" Branch type" value={trData.com_type} />
                                    </td>
                                    <td>
                                        <CustomViewLabel label="Contact Number" value={trData.contact} />
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        <CustomViewLabel label="Email" value={trData.email} />
                                    </td>
                                    <td>
                                        <CustomViewLabel label="Branch Head" value={trData.branch_head} />
                                    </td>
                                    <td>
                                        <CustomViewLabel label="Address" value={trData.address} />
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        <CustomViewLabel label="Country" value={trData.region} />
                                    </td>
                                    <td>
                                        <CustomViewLabel label="State" value={trData.state} />
                                    </td>
                                    <td>
                                        <CustomViewLabel label="District" value={trData.district} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <CustomViewLabel label=" Pin code " value={trData.pinCode} />
                                    </td>
                                    <td>
                                        <CustomViewLabel label=" Total Branch of User Allow" value={trData.total_branch_user} />
                                    </td>
                                    <td>
                                        <CustomCheckBox2
                                            label={"Is Active"}
                                            state={checkboxBranchNameView}
                                            setState={setCheckboxBranchNameView}
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
        </>
    )
}
