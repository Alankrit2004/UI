// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {CustomViewLabel} from "components";

export function AcceptedLeadsView({ onCancel }) {
  const item_Data = [
    {
      name: "Lorem ipsum",
      conNo: "Lorem ipsum",
      Mobile: "Lorem ipsum",
      email: "Lorem ipsum",
      login: "Lorem ipsum",
      password: "Lorem ipsum",
      status: "Lorem ipsum",
      createdDate: "10/08/2023",
      createdBy: "Admin"
    },
  ];
  return (
    <>
      <div className="pb-10 bg-white rounded-lg">

        <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
          <h1 className="text-xl font-weight-[400]">View Accepted Leads</h1>
        </div>
        <div className=" mx-auto">
          {item_Data.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 p-5 gap-x-4 gap-y-3 md:grid-cols-3 max-h-[70vh] overflow-y-auto hide-scrollbar">
              <CustomViewLabel label="Company Name" value={item.name} />
              <CustomViewLabel label="Contact Name" value={item.conNo} />
              <CustomViewLabel label="Mobile #" value={item.Mobile} />
              <CustomViewLabel label="Email Id" value={item.email} />
              <CustomViewLabel label="Login Id (Mobile#)" value={item.login} />
              <CustomViewLabel label="Password (System Generated)" value={item.password} />
              <CustomViewLabel label="Status" value={item.status} />
              <CustomViewLabel label="Created Date " value={item.createdDate} />
              <CustomViewLabel label="Created By " value={item.createdBy} />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-5">

          <div onClick={onCancel}>
            <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
          </div>
        </div>
      </div>
    </>
  )
}

