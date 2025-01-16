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
import { WebPermission } from "components";
import { GetRoleDetail } from "hooks";

export function RolePermission() {
    const { id } = useParams();
    const { data: detail } = GetRoleDetail(id)
    console.log("🚀 ~ file: WebPermission.jsx:15 ~ WebPermission ~ detail:", detail)

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const uniqueIdentifier = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex flex-col h-full">

            <div className="p-4 mt-2 rounded grow" >
                <Title title1={"Manage Profile"} title2={"ADMINITSTRATOR"} />
                <div className="flex mt-4">
                    <h1>Role Permission / </h1>
                    <div className="ml-4">
                        <h2 className="">Role name : </h2>
                    </div>{
                        <h2 className="ml-2 text-slate-400	">  {detail.roleName} </h2>
                    }
                </div>{
                    <WebPermission id={id} />
                }    </div>
        </div>

    );
}
