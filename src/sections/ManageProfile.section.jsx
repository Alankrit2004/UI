// CORE
import * as React from "react";

// COMPONENTS
import { Title } from "components";
import { Tab, TabContainer, TabContent } from "components";
import { Department } from "components";
import { RoleProfile } from "components";
import { RoleHierarchy } from "components";
import { EmployeeProfile } from "components";
import { EmpHistory } from "components";
import { useMemo } from "react";
import { AppTabs } from "elements";
import { table } from "components";

const TabsKeys = {
    Department: "Department",
    Role: "Role",
    RoleHierarchy: "Role Hierarchy",
    Employee: "Employee",
    EmployeeHistory: "Employee History",
}

export function ManageProfile() {
    const tabs = useMemo(() => [{
        key: TabsKeys.Department,
        header: TabsKeys.Department,
        tab: <Department />,
    }, {
        key: TabsKeys.Role,
        header: TabsKeys.Role,
        tab: <RoleProfile />,
    }, {
        key: TabsKeys.RoleHierarchy,
        header: TabsKeys.RoleHierarchy,
        tab: <RoleHierarchy />,
    }, {
        key: TabsKeys.Employee,
        header: TabsKeys.Employee,
        tab: <EmployeeProfile />,
    }, {
        key: TabsKeys.EmployeeHistory,
        header: TabsKeys.EmployeeHistory,
        tab: <EmpHistory />,
    },])

    return (
        <div className="flex flex-col h-full uppercase">
            <div className="p-6 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"Admin Profile "} title2={"ADMINISTRATOR"} />
                <div className="  flex  items-center flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap pb-5 ">
                    <button className="smlbtn"> Excel</button>
                </div>
                <AppTabs list={tabs} />
                <table 
                    columns={[
                        { header: 'Department', accessor: 'department' },
                        { header: 'Role', accessor: 'role' },
                        { header: 'Employee', accessor: 'employee' },
                        { header: 'Status', accessor: 'status' }
                    ]}
                    data={[]} 
                />
                
            </div >
        </div >
    );
}