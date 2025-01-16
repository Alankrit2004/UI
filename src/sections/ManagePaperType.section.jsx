// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import { Title } from "components";
import { Tab, TabContainer, TabContent } from "components";
import { PaperType } from "components"
import { TabBrand } from "components"

export function ManagePaperType() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex flex-col h-full uppercase">
            <div className="p-6 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"Admin Paper Type "} title2={"ADMINISTRATOR"} />
                <div className="  flex  items-center flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap pb-5 ">
                    <button className="smlbtn"> Excel</button>
                </div>

                <div className="px-2  lg:px-4 minbox ">
                    {/* 3 TABS */}
                    <TabContainer>
                        <Tab label="Paper Type" index={0} activeTab={activeTab} setActiveTab={setActiveTab} />
                        <Tab label="Brand" index={1} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </TabContainer>
                </div>

                {/* TAB 1 CONTENT : DEPARTMENT */}
                <TabContent index={0} activeTab={activeTab}>
                    <div>
                        <PaperType />
                    </div>
                </TabContent>

                {/* TAB 2 CONTENT : ROLES */}
                <TabContent index={1} activeTab={activeTab}>
                    <div>
                        <TabBrand />
                    </div>
                </TabContent>
            </div >
        </div >
    )
}
