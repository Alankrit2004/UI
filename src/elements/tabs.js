import { Tab, TabContainer } from "components";
import React, { useMemo, useState } from "react";

export const AppTabs = ({ list, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(list?.[0]?.key);

    const handleTabClick = (key) => {
        setActiveTab(key); // Update internal state
        if (onTabChange) {
            onTabChange(key); // Notify the parent component
        }
    };

    const tabElement = useMemo(() => list.find((ele) => ele.key === activeTab).tab, [activeTab, list]);

    return (
        <div>
            <div className="px-2 lg:px-4 minbox">
                <TabContainer>
                    {list.map((ele) => (
                        <Tab
                            key={ele.key}
                            label={ele.header}
                            index={ele.key}
                            activeTab={activeTab}
                            setActiveTab={() => handleTabClick(ele.key)} // Handle tab change
                        />
                    ))}
                </TabContainer>
            </div>
            {tabElement}
        </div>
    );
};
