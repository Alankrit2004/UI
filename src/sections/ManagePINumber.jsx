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
import { BsEyeFill } from "react-icons/bs";

import { CustomToggleButton } from "components";

export function ManagePINumber() {
  let [popupAdd, setPopupAdd] = useState(false);
  let [popupEdit, setPopupEdit] = useState(false);
  let [popupView, setPopupView] = useState(false);
  const [toggle, setToggle] = useState(false);

  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="flex flex-col h-full p-2 uppercase">
      <div className="p-4 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
        <Title title1={"Manage PI Number"} title2={"Manage Tracking"} />

        <div className="  flex md:justify-between items-center flex-row flex-wrap justify-start gap-1 mt-5 md:flex-nowrap p-2">
          <button className="smlbtn"> Excel</button>
        </div>

        <div className=" bg-white rounded grow">
          <div className="px-2 lg:px-4">
            {/* 4 BUTTONS */}
            <div className="flex flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap minbox">
              {/* <CustomButton1
                label={"Add "}
                icon={<IoMdAdd />}
                className="bg-prp-color text-white shrink grow md:grow-0 max-w-[50%]"
                onClick={() => setPopupAdd(true)}
              /> */}

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
                    <td>LC Received</td>
                    <td>Payment Receieved</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>
                      <div className="gap-2">
                        <CustomButton1
                          className="bg-sixt text-white grow max-w-[50px]"
                          icon={<BiEdit />}
                          onClick={() => setPopupEdit(true)}
                        />
                        <CustomButton1
                          className="bg-eye text-white grow max-w-[50px]"
                          icon={<BsEyeFill />}
                          onClick={() => setPopupView(true)}
                        />
                      </div>
                    </td>
                    <td className={getStatusColor('Active')}>Active</td>
                    <td> <CustomToggleButton /> </td>
                    <td> <CustomToggleButton /> </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <div className="gap-2">
                        <CustomButton1
                          className="bg-sixt text-white grow max-w-[50px]"
                          icon={<BiEdit />}
                          onClick={() => setPopupEdit(true)}
                        />
                        <CustomButton1
                          className="bg-eye text-white grow max-w-[50px]"
                          icon={<BsEyeFill />}
                          onClick={() => setPopupView(true)}
                        />
                      </div>
                    </td>
                    <td className={getStatusColor('Active')}>Active</td>
                    <td> <CustomToggleButton /> </td>
                    <td> <CustomToggleButton /> </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {/* POPUP 1 : ADD */}
          {/* {popupAdd && (
            <PopUp>
            <ManagePINumberAdd
                onCancel={() => setPopupAdd(false)}
              /> 

            </PopUp>
          )} */}

          {/* POPUP 2 : EDIT */}
          {/* {popupEdit && (
            <PopUp>
             <ManagePINumberEdit
                onCancel={() => setPopupEdit(false)}
              /> 
            </PopUp>
          )}  */}

          {/* {popupView && (
            <PopUp>
               <ManagePINumberView
                onCancel={() => setPopupView(false)}
              /> 
            </PopUp>
          )} */}
        </div>
      </div>
    </div >
  );
}



