import * as React from "react";
import { useState } from "react";
import {CustomButton1} from "components";
import {CustomTextField2} from "components";
import {CustomSelect1} from "components";
import {CustomNumber} from "components";
import {CustomInputNumber} from "components";

export function EditClientDetails({ next, onCancel }) {
  const [custName, setCustName] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [landLineNo, setLandLineNo] = useState("");

  return (
    <>
      <div>
        <div className="p-2 mx-auto">
          <table className="max-w-full popup-table w-[900px]">
            <tbody>
              <tr>
                <td>
                  <CustomTextField2
                    label={"Customer Name"}
                    placeholder={"ENTER"}
                    value={custName}
                    onChange={setCustName}
                  ></CustomTextField2>
                </td>
                <td>
                  <CustomNumber
                    label={"Phone Number"}
                    placeholder={"ENTER"}
                    value={phoneNo}
                    onChange={setphoneNo}
                  ></CustomNumber>
                </td>
              </tr>
              <tr>
                <td>
                  <CustomSelect1
                    label={"Parent Customer"}
                    placeholder={"ENTER"}
                  ></CustomSelect1>
                </td>
                <td>
                  <CustomInputNumber
                    label={"Landline Number"}
                    placeholder={"ENTER"}
                    value={landLineNo}
                    onChange={setLandLineNo}
                  ></CustomInputNumber>
                </td>

              </tr>
              <tr>
                <td>
                  <CustomSelect1
                    label={"Customer Type"}
                    placeholder={"ENTER"}
                  ></CustomSelect1>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center gap-5 mt-5">
          <div onClick={next}>
            <CustomButton1 label={"Save and Continue"} className="text-white bg-prp-color" />
          </div>
          <div onClick={onCancel}>
            <CustomButton1 label={"Cancel"} variant="outlined" className="txt-prp-color" />
          </div>
        </div>
      </div>
    </>
  )
}
