import React, { useState, useMemo } from "react";

import { Title } from "components";
import { Region } from "components";
import { State } from "components";
import { District } from "components";
import { City } from "components";
import { CityGrade } from "components";
import { AppTabs } from "elements";

const TabsKeys = {
    Region: "Region",
    State: "State",
    District: "District",
    City: "City",
    CityGrade: "City Grade",
};

export function ManageAttributes() {
    const [activeTab, setActiveTab] = useState(TabsKeys.Region); // Track active tab

    const tabs = useMemo(() => [
        {
            key: TabsKeys.Region,
            header: TabsKeys.Region,
            tab: <Region />,
        },
        {
            key: TabsKeys.State,
            header: TabsKeys.State,
            tab: <State />,
        },
        {
            key: TabsKeys.District,
            header: TabsKeys.District,
            tab: <District />,
        },
        {
            key: TabsKeys.City,
            header: TabsKeys.City,
            tab: <City />,
        },
        {
            key: TabsKeys.CityGrade,
            header: TabsKeys.CityGrade,
            tab: <CityGrade />,
        },
    ], []);

    const handleTabChange = (tabKey) => {
        console.log('Active tab changed to:', tabKey); // Debugging: Log the tab key
        setActiveTab(tabKey); // Update active tab
    };

    return (
        <div className="flex flex-col h-full uppercase">
            <div className="p-6 mt-2 bg-white rounded grow" style={{ border: "1px solid #3D3D3D66" }}>
                <Title title1={"Admin Attributes "} title2={"ADMINISTRATOR"} />
                <div className="flex items-center flex-row flex-wrap justify-start gap-2 mt-5 md:flex-nowrap pb-5">
                    {/* Conditionally render the Excel button based on the active tab */}
                    {activeTab !== TabsKeys.CityGrade && (
                        <button className="smlbtn">Excel</button>
                    )}
                </div>
                {/* Ensure that AppTabs triggers the tab change */}
                <AppTabs list={tabs} onTabChange={handleTabChange} /> {/* Pass the tab change handler */}
            </div>
        </div>
    );
}
