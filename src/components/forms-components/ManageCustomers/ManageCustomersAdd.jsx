import * as React from "react";
import { useState } from "react";
import { Tab, TabContainer, TabContent } from "components";

import { ClientDetails } from "components"
import { ContactDetails } from "components"
import { BillingDetails } from "components"
import { ShippingDetails } from "components"

export function ManageCustomersAdd({ onCancel }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleSaveAndContinue = () => {
        setActiveTab((prevTab) => prevTab + 1);
    };

    const handleBack = () => {
        setActiveTab((prevTab) => prevTab - 1);
    };

    return (
        <>
            <div className="pb-10 bg-white rounded-lg">
                <div className="flex bg-prp-color p-2 text-white justify-between rounded-t-lg">
                    <h1 className="text-l font-weight-[400]">Add Customers</h1>
                    <div className="flex items-center text-sm"></div>
                </div>

                <div className="flex flex-col h-full uppercase">
                    <div className="p-6 mt-2 bg-white rounded grow">
                        <div className="px-2  lg:px-4 minbox ">
                            {/* 3 TABS */}
                            <TabContainer>
                                <Tab label="Client Details" index={0} activeTab={activeTab} setActiveTab={setActiveTab} />
                                <Tab label="Contact Details" index={1} activeTab={activeTab} setActiveTab={setActiveTab} />
                                <Tab label="Billing Details" index={2} activeTab={activeTab} setActiveTab={setActiveTab} />
                                <Tab label="Shipping Address" index={3} activeTab={activeTab} setActiveTab={setActiveTab} />
                            </TabContainer>
                        </div>

                        {/* TAB 1 CONTENT : DEPARTMENT */}
                        <TabContent index={0} activeTab={activeTab}>
                            <ClientDetails
                                next={handleSaveAndContinue}
                                onCancel={onCancel}
                            />
                        </TabContent>

                        {/* TAB 2 CONTENT : ROLES */}
                        <TabContent index={1} activeTab={activeTab}>
                            <ContactDetails
                                next={handleSaveAndContinue}
                                back={handleBack}
                                onCancel={onCancel}
                            />
                        </TabContent>

                        <TabContent index={2} activeTab={activeTab}>
                            <BillingDetails
                                next={handleSaveAndContinue}
                                back={handleBack}
                                onCancel={onCancel}
                            />
                        </TabContent>

                        <TabContent index={3} activeTab={activeTab}>
                            <ShippingDetails
                                next={handleSaveAndContinue}
                                back={handleBack}
                                onCancel={onCancel}
                            />
                        </TabContent>
                    </div >
                </div >
            </div>
        </>
    )
}
