import Icon1 from "../../assets/1.svg";
import Icon2 from "../../assets/22.svg";
import Iconaccessdoor from "../../assets/project-images/sidebarIcon/accessdoor.png";
import Iconattendanceregister from "../../assets/project-images/sidebarIcon/attendanceregister.png";
import Iconbadgesmissing from "../../assets/project-images/sidebarIcon/badgesmissing.png";
import cctvmonitoring from "../../assets/project-images/sidebarIcon/cctvmonitoring.png";
import commandcentre from "../../assets/project-images/sidebarIcon/commandcentre.png";
import emergencycall from "../../assets/project-images/sidebarIcon/emergencycall.png";
import exitemp from "../../assets/project-images/sidebarIcon/exitemp.png";
import firealarm from "../../assets/project-images/sidebarIcon/firealarm.png";
import fooddelivery from "../../assets/project-images/sidebarIcon/fooddelivery.png";
import handover from "../../assets/project-images/sidebarIcon/handover.png";
import iccardissue from "../../assets/project-images/sidebarIcon/iccardissue.png";
import incomingcourier from "../../assets/project-images/sidebarIcon/incomingcourier.png";
import workspace from "../../assets/project-images/sidebarIcon/workspace.png";
import watercan from "../../assets/project-images/sidebarIcon/watercan.png";
import vendor from "../../assets/project-images/sidebarIcon/vendor.png";
import vehicleentry from "../../assets/project-images/sidebarIcon/vehicleentry.png";
import shiftlog from "../../assets/project-images/sidebarIcon/shiftlog.png";
import securityincident from "../../assets/project-images/sidebarIcon/securityincident.png";
import inreturnable from "../../assets/project-images/sidebarIcon/inreturnable.png";
import inreturnableno from "../../assets/project-images/sidebarIcon/inreturnableno.png";
import key from "../../assets/project-images/sidebarIcon/key.png";
import patrolling from "../../assets/project-images/sidebarIcon/patrolling.png";
import pachecklist from "../../assets/project-images/sidebarIcon/pachecklist.png";
import overnightparking from "../../assets/project-images/sidebarIcon/overnightparking.png";
import outgoingcourier from "../../assets/project-images/sidebarIcon/outgoingcourier.png";
import occurence from "../../assets/project-images/sidebarIcon/occurence.png";
import newspaper from "../../assets/project-images/sidebarIcon/newspaper.png";

import lostandfound from "../../assets/project-images/sidebarIcon/lostandfound.png";
import masteraccesscard from "../../assets/project-images/sidebarIcon/masteraccesscard.png";
import milk from "../../assets/project-images/sidebarIcon/milk.png";
import newjoinaccesscard from "../../assets/project-images/sidebarIcon/newjoinaccesscard.png";
import outreturnableno from "../../assets/project-images/sidebarIcon/outreturnableno.png";
import outreturnable from "../../assets/project-images/sidebarIcon/outreturnable.png";
import { AiOutlineSearch } from "react-icons/ai";
import { Radio } from "@mui/material";
import { MdOutlineBroadcastOnPersonal } from "react-icons/md";

import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import { onlyIcon, theme } from "layout";

// Normalize text for better comparison
const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, "");


const filterTabs = (subTabs, query) => {
    return subTabs
        .map(([title, link]) => {
            const normalizedTitle = normalizeText(title);
            const normalizedQuery = normalizeText(query);

            if (Array.isArray(link)) {
                // Recursive case: it's a nested sub-tab
                const filteredNestedSubTabs = filterTabs(link, query);
                if (filteredNestedSubTabs.length > 0 || normalizedTitle.includes(normalizedQuery)) {
                    return [title, filteredNestedSubTabs];
                }
            } else if (normalizedTitle.includes(normalizedQuery)) {
                return [title, link];
            }
            return null;
        })
        .filter(Boolean); // Remove null entries
};

export function NavTabs() {
    const [selectedMainField, setSelectedMainField] = useState("DASHBOARD");
    const [searchQuery, setSearchQuery] = useState("");
    console.log("🚀 ~ file: NavTabs.components.jsx:69 ~ NavTabs ~ searchQuery:", searchQuery)

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const tabs =
     [
        {
            icon: <img src={Icon1} className="icon text-inherit ring-first" alt="" />,
            title: "DASHBOARD",
            subTabs: [["Dashboard", "dashboard"]],
        },
        {
            icon: <img src={Icon2} className="icon text-inherit ring-first" alt="" />,
            title: "ADMINISTRATOR",
            subTabs: [
                ["admin profile", "admin-profile"],
                [
                    "Admin Manage Territories",
                    [
                        ["Admin Attributes", "admin-attributes"],
                        ["Admin Territories", "admin-territories"],
                    ],
                ],
                ["Admin Location ", "admin-location"],
                ["Admin Building", "admin-Building"],
                ["Admin Floor", "admin-Floor"],
                ["Admin Visitor Type", "admin-Type-of-visitor"],
                ["Admin Reason Type", "admin-Reason-Type"],
                ["Admin DVM Server Name", "admin-DVM-Server-Name"],
                ["Admin EBI Server Name", "admin-EBI-Server-Name"],
                ["Admin Emergency Type ", "admin-Emergency-Type"],
                ["Admin Emergency closure by ", "admin-Emergency-closure-by"],
                ["Admin Shift ", "admin-Shift"],
                ["Admin route ", "admin-route"],
                ["Admin verified by", "admin-verified-by"],
                ["Admin marital status", "admin-marital-status"],
                ["Admin blood group", "admin-blood-group"],
                ["Admin employee type", "admin-employee-type"],
                ["Admin gender", "admin-gender"],
                ["Admin event type ", "admin-event-type"],
                ["Admin courier name ", "admin-courier-name"],
                ["Admin pb type  ", "admin-pb-type"],
                ["Admin incident type  ", "admin-incident-type"],
                ["Admin Hander Over By Name ", "admin-hander-over-by-name"],
                ["Admin vehicle type  ", "admin-vehicle-type"],
                ["Admin visit purpose  ", "admin-visit-purpose"],
                ["Admin company type  ", "admin-company-type"],
                ["Admin company   ", "admin-company-details"],
                ["Admin Branch   ", "admin-Branch-details"],
                ["Admin Material Status", "admin-material-status"],
            ],
        },
        {
            icon: <img src={Iconaccessdoor} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Access Door Checklist",
            subTabs: [["Access Door Checklist", "app/access-door-checklist"]],
        },
        {
            icon: <img src={Iconattendanceregister} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Attendance Register",
            subTabs: [["Attendance Register", "app/attendance-register"]],
        },
        {
            icon: <img src={Iconbadgesmissing} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Badges Missing",
            subTabs: [["Badges Missing", "app/badges-missing"]],
        },
        {
            icon: <img src={cctvmonitoring} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "CCTV Monitoring",
            subTabs: [["CCTV Monitoring", "app/cctv-Monitoring"]],
        },
        {
            icon: <img src={commandcentre} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Command Centre",
            subTabs: [["Command Centre", "app/command-Centre"]],
        },
        {
            icon: <img src={emergencycall} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Emergency Call log",
            subTabs: [["Emergency Call log", "app/emergenc-Call-log"]],
        },
        {
            icon: <img src={emergencycall} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Escort Daily Feed Back",
            subTabs: [["Escort Daily Feed Back", "app/escort-Daily-Feed-Back"]],
        },
        {
            icon: <img src={exitemp} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Exit Employee",
            subTabs: [["Exit Employee", "app/exit-Employee"]],
        },
        {
            icon: <img src={firealarm} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Fire Alarm Checklist",
            subTabs: [["Fire Alarm Checklist", "app/fire-Alarm-Checklist"]],
        },
        {
            icon: <img src={exitemp} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Fire Extinguisher",
            subTabs: [["Fire Extinguisher", "app/fire-Extinguisher"]],
        },
        {
            icon: <img src={fooddelivery} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Food Delivery",
            subTabs: [["Food Delivery", "app/food-Delivery"]],
        },
        {
            icon: <img src={handover} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Hand Over",
            subTabs: [["Hand Over", "app/hand-Over"]],
        },
        {
            icon: <img src={key} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Key",
            subTabs: [["Key", "app/key"]],
        },
        {
            icon: <img src={lostandfound} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Lost and Found",
            subTabs: [["Lost and Found", "app/lost-and-Found"]],
        },
        {
            icon: <img src={masteraccesscard} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Master Access Card",
            subTabs: [["Master Access Card", "app/master-Access-Card"]],
        },
        {
            icon: <img src={outreturnable} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Material Inward Non Returnable",
            subTabs: [["Material Inward Non Returnable", "app/material-Inward-Non-Returnable"]],
        },
        {
            icon: <img src={inreturnable} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Material Inward Returnable",
            subTabs: [["Material Inward Returnable", "app/material-Inward-Returnable"]],
        },
        {
            icon: <img src={outreturnableno} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Material Outward Non Returnable",
            subTabs: [["Material-Outward-Non-Returnable", "app/material-Outward-Non-Returnable"]],
        },
        {
            icon: <img src={inreturnableno} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Material Outward Returnable",
            subTabs: [["material-Outward-Returnable", "app/material-Outward-Returnable"]],
        },
        {
            icon: <img src={milk} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Milk",
            subTabs: [["milk", "app/milk"]],
        },
        {
            icon: <img src={newjoinaccesscard} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "New Joining Access Card",
            subTabs: [["new-Joining-Access-Card", "app/new-Joining-Access-Card"]],
        },
        {
            icon: <img src={newspaper} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "News Paper",
            subTabs: [["news-Paper", "app/news-Paper"]],
        },
        {
            icon: <img src={occurence} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Occurence",
            subTabs: [["occurence", "app/occurence"]],
        },
        {
            icon: <img src={outgoingcourier} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "outgoing Courier",
            subTabs: [["outgoing-Courier", "app/outgoing-Courier"]],
        },
        {
            icon: <img src={overnightparking} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Overnight Parking",
            subTabs: [["overnight-Parking", "app/overnight-Parking"]],
        },
        {
            icon: <img src={pachecklist} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "PA Checklist",
            subTabs: [["pa-Checklist", "app/pa-Checklist"]],
        },
        {
            icon: <img src={patrolling} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Patrolling",
            subTabs: [["patrolling", "app/patrolling"]],
        },
        {
            // icon: <img src={MdOutlineBroadcastOnPersonal} className="" alt="" />,
            icon: <MdOutlineBroadcastOnPersonal />,
            iconSize: "text-2xl",
            title: "Personal Belongings",
            subTabs: [["personal-Belongings", "app/personal-Belongings"]],
        },
        {
            icon: <img src={securityincident} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Security Incident",
            subTabs: [["security-Incident", "app/security-Incident"]],
        },
        {
            icon: <img src={shiftlog} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Shift Log",
            subTabs: [["shift-Log", "app/shift-Log"]],
        },
        {
            icon: <img src={iccardissue} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Temp ID Card Issue",
            subTabs: [["temp-ID-Card-Issue", "app/temp-ID-Card-Issue"]],
        },
        {
            icon: <img src={vehicleentry} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Vehicle entry checklist",
            subTabs: [["vehicle-entry-checklist", "app/vehicle-entry-checklist"]],
        },
        {
            icon: <img src={vendor} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Vendor",
            subTabs: [["vendor", "app/vendor"]],
        },
        {
            icon: <img src={watercan} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Water Can",
            subTabs: [["water-Can", "app/water-Can"]],
        },
        {
            icon: <img src={workspace} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Workspace checklist",
            subTabs: [["workspace-checklist", "app/workspace-checklist"]],
        },
        {
            icon: <img src={incomingcourier} className="icon text-inherit ring-first" alt="" />,
            iconSize: "text-2xl",
            title: "Incoming Courier",
            subTabs: [["incoming-Courier", "app/incoming-Courier"]],
        },
    ]

        const filteredTabs = tabs.map(tab => {
            const filteredSubTabs = filterTabs(tab.subTabs, searchQuery);
            console.log("🚀 ~ file: NavTabs.components.jsx:69 ~ filteredTabs ~ filteredSubTabs:", filteredSubTabs)
            return {
                ...tab,
                subTabs: filteredSubTabs
            };
        }).filter(tab => {
            return normalizeText(tab.title).includes(normalizeText(searchQuery)) || tab.subTabs.length > 0;
        });
    
    function Tab({ selectedTitle, onChange, index, iconSize, icon, title, subTabs }) {
        const [activeSubTab, setActiveSubTab] = useState(subTabs[0][0]);
        const [isSubTabsOpen, setIsSubTabsOpen] = useState(
            subTabs?.length > 1 && title === selectedMainField ? true : false
        );
        const [activeSubSubTab, setActiveSubSubTab] = useState(
            subTabs?.length > 1 && title === selectedMainField ? subTabs[0][1][0] : null
        );
        const { pathname } = useLocation();
        const navigate = useNavigate();

        const toggleSubTabs = () => {
            onChange(title);
            if (Array.isArray(subTabs) && subTabs?.length > 1) {
                setIsSubTabsOpen((prevState) => !prevState);
                if (!isSubTabsOpen) {
                    setActiveSubTab(subTabs[0][0]);
                    setActiveSubSubTab(subTabs[0][1][0][1]);
                    navigate(`/admin/${subTabs[0][1]}`);
                }
            } else {
                setIsSubTabsOpen(!isSubTabsOpen);
                navigate(`/admin/${subTabs[0][1]}`);
            }
        };

        const handleSubTabChange = (subTitle, subTabKey) => {
            setActiveSubTab(subTitle);
            if (Array.isArray(subTabKey)) {
                navigate(
                    `/admin/${subTitle
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/^-+|-+$/g, "")}/${subTabKey[0][1]}`
                );
                return;
            }
            navigate(`/admin/${subTabKey}`);
        };

        return (
            <div className="tab">
                <div
                    className={`${
                        selectedTitle === title ? "bg-[#E8ECF3] text-[#000]" : "text-[#3D3D3D]"
                    } cursor-pointer main-tab flex items-center gap-3 py-3 my-1 px-2 transition-all duration-500 overflow-hidden`}
                    style={{ borderRadius: "10px", marginInline: "10px" }}
                    onClick={toggleSubTabs}
                >
                    <div className={`flex pl-2 justify-center items-center ${onlyIcon ? "w-full" : ""}`}>
                        <span className={`${iconSize} min-w-[30px]`}>{icon}</span>
                        {onlyIcon ? null : <div className="ml-2">{title.toUpperCase()}</div>}
                    </div>
                </div>

                {onlyIcon ? null : (
                    <>
                        {isSubTabsOpen && subTabs?.length > 1 && title === selectedMainField && (
                            <div className="sub-tabs ml-2 overflow-auto">
                                {subTabs?.map(([subTitle, subTabKey], index) => (
                                    <div key={subTitle}>
                                        <div className="sub-tab-container cursor-pointer flex items-center">
                                            <Radio
                                                checked={activeSubTab === subTitle}
                                                onChange={() => handleSubTabChange(subTitle, subTabKey)}
                                                style={{ color: theme.colors.primary }}
                                            />
                                            <div
                                                className={`sub-tab flex items-center gap-3 py-2 my-1 rounded press-1 transition-all duration-500 ${
                                                    pathname.split("/").pop() === subTabKey ||
                                                    (pathname.split("/")?.length > 3 && activeSubTab === subTitle)
                                                        ? "txt-prp-color"
                                                        : ""
                                                }`}
                                                onClick={() => handleSubTabChange(subTitle, subTabKey)}
                                            >
                                                {subTitle.toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            {Array.isArray(subTabs[index][1]) &&
                                                subTabs[index][1]?.length > 0 &&
                                                subTabs[index][1].map((item, subTabIndex) => (
                                                    <div
                                                        key={subTabIndex}
                                                        className="flex cursor-pointer ml-3 items-center"
                                                    >
                                                        <h1>{item?.[1] === activeSubSubTab?.[1]}</h1>
                                                        <Radio
                                                            checked={pathname.split("/").pop() === item[1]}
                                                            style={{ color: theme.colors.primary }}
                                                            onChange={() => {
                                                                setActiveSubTab(subTabs?.[index]?.[0]);
                                                                setActiveSubSubTab(item);
                                                                navigate(
                                                                    `/admin/${subTabs[index][0]
                                                                        .toLowerCase()
                                                                        .replace(/\s+/g, "-")
                                                                        .replace(/^-+|-+$/g, "")}/${item[1]}`
                                                                );
                                                            }}
                                                        />
                                                        <div
                                                            onClick={() => {
                                                                setActiveSubTab(subTabs[index][0]);
                                                                setActiveSubSubTab(item);
                                                                navigate(
                                                                    `/admin/${subTabs[index][0]
                                                                        .toLowerCase()
                                                                        .replace(/\s+/g, "-")
                                                                        .replace(/^-+|-+$/g, "")}/${item[1]}`
                                                                );
                                                            }}
                                                            className={`${
                                                                pathname.split("/").pop() === item[1]
                                                                    ? "txt-prp-color"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {item?.[0]}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="overflow-auto rounded whitespace-nowrap">
            {/* SEARCH BOX */}
            {onlyIcon ? null : (
                <div className="flex items-center px-2 py-2 my-1 gap-4 border rounded bg-[#BDC8DD]">
                    <AiOutlineSearch className="icon min-w-[30px]" />
                    <input
                        type="search"
                        className="w-full bg-transparent uppercase shrink placeholder:text-fourth"
                        placeholder="SEARCH"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            )}

            {filteredTabs.map((tab, index) => (
                <Tab
                    key={index}
                    index={index}
                    icon={tab.icon}
                    title={tab.title}
                    onChange={setSelectedMainField}
                    selectedTitle={selectedMainField}
                    subTabs={tab.subTabs}
                    disabled={false}
                    to={tab.subTabs[0][1]}
                />
            ))}
        </div>
    );
}

// Function to format subTabs to uppercase
