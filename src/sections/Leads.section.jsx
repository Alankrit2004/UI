// CORE
import * as React from "react";
import { useState } from "react";

// COMPONENTS
import { Title } from "components";
import { CustomButton1 } from "components";
import { Tab, TabContainer, TabContent } from "components";

// ICONS
import { AiOutlineImport, AiOutlineDownload } from "react-icons/ai";

import { AllLeads, RejectedLeads, AcceptedLeads } from "components"

export function Leads() {
    const [activeTab, setActiveTab] = useState(0);

    const tablabel = {
        0: "All leads",
        1: "Accepted",
        2: "Rejected",
    };

    return (
        <div className="flex flex-col h-full uppercase">
            <div className="p-6 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"Manage Leads"} title2={"Manage Leads"} />

                <div className="  flex md:justify-between items-center flex-row flex-wrap justify-start gap-1 mt-5 md:flex-nowrap pb-5">
                    <button className="smlbtn"> Excel</button>

                    <div className="flex flex-wrap items-center justify-between gap-3  ml-auto">
                        <CustomButton1
                            label={"Import " + tablabel[activeTab]}
                            icon={<AiOutlineImport />}
                            className=" bg-prp-color text-white grow "
                        />
                        <CustomButton1
                            label={"Sample Download "}
                            icon={<AiOutlineDownload />}
                            className=" bg-prp-color text-white grow "
                        />
                    </div>
                </div>

                <div className="px-2 lg:px-4 minbox">
                    {/* 18 TABS */}
                    <TabContainer showArrow={true}>
                        <Tab label="All leads" index={0} activeTab={activeTab} setActiveTab={setActiveTab} />
                        <Tab label="Accepted" index={1} activeTab={activeTab} setActiveTab={setActiveTab} />
                        <Tab label="Rejected" index={2} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </TabContainer>
                </div>

                <TabContent index={0} activeTab={activeTab}>
                    <div>
                        <AllLeads />
                    </div>
                </TabContent>
                <TabContent index={1} activeTab={activeTab}>
                    <div>
                        <AcceptedLeads />
                    </div>
                </TabContent>
                <TabContent index={2} activeTab={activeTab}>
                    <div>
                        <RejectedLeads />
                    </div>
                </TabContent>
            </div>
        </div>
    );
}
