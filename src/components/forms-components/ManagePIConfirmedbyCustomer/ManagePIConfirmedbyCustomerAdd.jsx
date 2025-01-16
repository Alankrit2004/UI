// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomSelect1} from "components";
import {CustomCheckBox2} from "components";
import {CustomBrowse} from "components"

export function ManagePIConfirmedbyCustomerAdd({ onCancel }) {
  let [checkboxAdd, setCheckboxAdd] = useState(true);

  return (
    <>
      <div className="pb-10 bg-white rounded-lg">
        <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
          <h1 className="text-l font-weight-[400]">Add PI Confirmation</h1>
          <div className="flex items-center text-sm"></div>
        </div>

        <div className="p-5 mx-auto">
          <div className=" max-w-full grid grid-cols-2 gap-4 md:grid-cols-3 w-[1000px]">
            <div className="">
              <CustomSelect1
                label={"Customer Name"}
                placeholder={"ENTER"}
              ></CustomSelect1>
            </div>
            <div>
              <CustomTextField2 label={"Parent Customer"} placeholder={"Read Only"} readOnly={true} />
            </div>
            <div>
              <CustomTextField2 label={"Country"} placeholder={"Read Only"} readOnly={true} />
            </div>

            <div className="">
              <CustomTextField2 label={"PO Number"} placeholder={"Read Only"} readOnly={true} />
            </div>
            <div className="">
              <CustomTextField2 label={"PI Number"} placeholder={"Read Only"} readOnly={true} />
            </div>
            <div className="">
              <CustomBrowse id="pi-isssue-upload-issue-add" label="PI Confirmed by Customer" />
            </div>
            <div className="">
              <CustomSelect1 label={"PI Status"}
                placeholder={"ENTER"}
                options={[
                  { value: 'p', label: 'Pending' },
                  { value: 'c', label: 'Closed' },
                ]}
              />
            </div>
            <div className="">
              <CustomCheckBox2
                label={"Is Active"}
                state={checkboxAdd}
                setState={setCheckboxAdd}
              ></CustomCheckBox2>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-5">
          <div>
            <CustomButton1 label={"Submit"} className="text-white bg-prp-color" />
          </div>
          <div onClick={onCancel}>
            <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
          </div>
        </div>
      </div>
    </>
  )
}


