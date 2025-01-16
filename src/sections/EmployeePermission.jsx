// CORE
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// COMPONENTS
import { Title } from "components";
import { CustomButton1 } from "components";
import { Checkbox } from "@mui/material";
import { Tab, TabContainer } from "components";
import { WebEmployeePermission } from "components";
import { GetUserDetail } from "hooks";

export function EmployeePermission() {
    const { id } = useParams();
    const { data: detail } = GetUserDetail(id)
    console.log("🚀 ~ file: WebEmployeePermission.jsx:15 ~ WebEmployeePermission ~ detail:", detail)
    return (
        <div className="flex flex-col h-full">

            <div className="p-4 mt-2 rounded grow" >
                <Title title1={"Manage Profile"} title2={"ADMINITSTRATOR"} />
                <div className="flex">

                    <div className="flex mt-4">
                        <h1>Employee Permission / </h1>
                        <div className="ml-4">
                            <h2 className="">Employee name : </h2>
                        </div>{
                            <h2 className="ml-2 text-slate-400	">  {detail.userName} </h2>
                        }
                    </div>
                    <div className="ml-4 mt-4">
                        <h2 className="">role name : </h2>
                    </div>{
                        <h2 className="ml-2 mt-4     text-slate-400	">  {detail.roleName} </h2>
                    }
                </div>
                {
                    <WebEmployeePermission id={id} roleId={detail.roleId} />
                }    </div>
        </div >

    );
}
