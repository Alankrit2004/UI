// CORE
import * as React from "react";

// COMPONENTS
import { AddEditEmergencCallLog, Title } from "components";


export function EmergencCallLogScreen() {
    return (
        <div className="flex flex-col h-full uppercase">
            <div className="p-6 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"Emergency Call Log "} />
                <div className="  flex  items-center flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap pb-5 ">
                    <button className="smlbtn"> Excel</button>
                </div>
                <AddEditEmergencCallLog />
            </div >
        </div >
    );
}