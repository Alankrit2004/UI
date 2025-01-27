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
import outreturnable from "../../assets/project-images/sidebarIcon/outreturnable.png";
import { MdOutlineBroadcastOnPersonal } from "react-icons/md";

export const ModulesIds = {
    DASHBOARD: 2,
    ADMIN_PROFILE: 3,
    ADMIN_ATTRIBUTES: 4,
    ADMIN_TERRITORIES: 5,
    ADMIN_LOCATION: 6,
    ADMIN_BUILDING: 7,
    ADMIN_FLOOR: 8,
    ADMIN_VISITOR_TYPE: 9,
    ADMIN_REASON_TYPE: 10,
    ADMIN_DVM_SERVER: 11,
    ADMIN_EBI_SERVER: 12,
    ADMIN_EMERGENCY_TYPE: 13,
    ADMIN_EMERGENCY_CLOSURE: 14,
    ADMIN_SHIFT: 15,
    ADMIN_ROUTE: 16,
    ADMIN_VERIFIED_BY: 17,
    ADMIN_MARITAL_STATUS: 18,
    ADMIN_BLOOD_GROUP: 19,
    ADMIN_EMPLOYEE_TYPE: 20,
    ADMIN_GENDER: 21,
    ADMIN_EVENT_TYPE: 22,
    ADMIN_COURIER_NAME: 23,
    ADMIN_PB_TYPE: 24,
    ADMIN_INCIDENT_TYPE: 25,
    ADMIN_HANDER_OVER_BY_NAME: 26,
    ADMIN_VEHICLE_TYPE: 27,
    ADMIN_VISIT_PURPOSE: 29,
    ADMIN_COMPANY_TYPE: 30,
    ADMIN_COMPANY: 31,
    ADMIN_BRANCH: 32,
    ADMIN_MATERIAL_STATUS: 33,
    ACCESS_DOOR_CHECKLIST: 34,
    ATTENDANCE_REGISTER: 35,
    BADGES_MISSING: 36,
    CCTV_MONITORING: 37,
    COMMAND_CENTRE: 38,
    EMERGENCY_CALL_LOG: 39,
    ESCORT_DAILY_FEED_BACK: 40,
    EXIT_EMPLOYEE: 41,
    FIRE_ALARM_CHECKLIST: 42,
    FIRE_EXTINGUISHER: 43,
    FOOD_DELIVERY: 44,
    HAND_OVER: 45,
    KEY: 46,
    LOST_AND_FOUND: 47,
    MASTER_ACCESS_CARD: 48,
    MATERIAL_INWARD_NON_RETURNABLE: 49,
    MATERIAL_INWARD_RETURNABLE: 50,
    MATERIAL_OUTWARD_NON_RETURNABLE: 51,
    MATERIAL_OUTWARD_RETURNABLE: 52,
    MILK: 53,
    NEW_JOINING_ACCESS_CARD: 54,
    NEWS_PAPER: 55,
    OCCURRENCE: 56,
    OUTGOING_COURIER: 57,
    OVERNIGHT_PARKING: 58,
    PA_CHECKLIST: 59,
    PATROLLING: 60,
    PERSONAL_BELONGINGS: 61,
    SECURITY_INCIDENT: 62,
    SHIFT_LOG: 63,
    TEMP_ID_CARD_ISSUE: 64,
    VEHICLE_ENTRY_CHECKLIST: 65,
    VENDOR: 66,
    WATER_CAN: 67,
    WORKSPACE_CHECKLIST: 68,
    INCOMING_COURIER: 69,
};

export const TabArray = [
    {
        index: 0,
        activeIcon: <img src={Icon1} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={Icon1} className="icon text-inherit ring-first" alt="" />,
        title: "DASHBOARD",
        subTabs: {
            title: "Dashboard",
            path: "dashboard",
        },
        path: "app/dashboard",
        disabled: true,
        to: "app/dashboard",
        id: ModulesIds.DASHBOARD,
    },
    {
        index: 1,
        activeIcon: <img src={Icon2} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={Icon2} className="icon text-inherit ring-first" alt="" />,
        title: "ADMINISTRATOR",
        to: "admin-profile",
        admin: true,
        id: 0,
        subTabs: [
            { title: "Admin Profile", path: "admin-profile", id: ModulesIds.ADMIN_PROFILE },
            { title: "Admin Manage Territories", path: "admin-territories", id: ModulesIds.AdminTerritory },
            { title: "Admin Location", path: "admin-location", id: ModulesIds.AdminProfile },
            { title: "Admin Building", path: "admin-Building", id: ModulesIds.AdminProfile },
            { title: "Admin Floor", path: "admin-Floor", id: ModulesIds.AdminProfile },
            { title: "Admin Visitor Type", path: "admin-Type-of-visitor", id: ModulesIds.AdminProfile },
            { title: "Admin Reason Type", path: "admin-Reason-Type", id: ModulesIds.AdminProfile },
            { title: "Admin DVM Server Name", path: "admin-DVM-Server-Name", id: ModulesIds.AdminProfile },
            { title: "Admin EBI Server Name", path: "admin-EBI-Server-Name", id: ModulesIds.AdminProfile },
            { title: "Admin Emergency Type", path: "admin-Emergency-Type", id: ModulesIds.AdminProfile },
            { title: "Admin Emergency closure by", path: "admin-Emergency-closure-by", id: ModulesIds.AdminProfile },
            { title: "Admin Shift", path: "admin-Shift", id: ModulesIds.AdminProfile },
            { title: "Admin Route", path: "admin-route", id: ModulesIds.AdminProfile },
            { title: "Admin Verified By", path: "admin-verified-by", id: ModulesIds.AdminProfile },
            { title: "Admin Marital Status", path: "admin-marital-status", id: ModulesIds.AdminProfile },
            { title: "Admin Blood Group", path: "admin-blood-group", id: ModulesIds.AdminBloodGroup },
            { title: "Admin Employee Type", path: "admin-employee-type", id: ModulesIds.AdminProfile },
            { title: "Admin Gender", path: "admin-gender", id: ModulesIds.AdminProfile },
            { title: "Admin Event Type", path: "admin-event-type", id: ModulesIds.AdminProfile },
            { title: "Admin Courier Name", path: "admin-courier-name", id: ModulesIds.AdminProfile },
            { title: "Admin PB Type", path: "admin-pb-type", id: ModulesIds.AdminProfile },
            { title: "Admin Incident Type", path: "admin-incident-type", id: ModulesIds.AdminProfile },
            { title: "Admin Handover By", path: "admin-hander-over-by-name", id: ModulesIds.AdminProfile },
            { title: "Admin Vehicle Type", path: "admin-vehicle-type", id: ModulesIds.AdminProfile },
            { title: "Admin Visit Purpose", path: "admin-visit-purpose", id: ModulesIds.AdminProfile },
            { title: "Admin Company Type", path: "admin-company-type", id: ModulesIds.AdminProfile },
            { title: "Admin Company", path: "admin-company-details", id: ModulesIds.AdminProfile },
            { title: "Admin Branch", path: "admin-Branch-details", id: ModulesIds.AdminProfile },
            { title: "Admin Material Status", path: "admin-material-status", id: ModulesIds.AdminProfile },
        ],
    },
    {
        index: 3,
        activeIcon: <img src={Iconaccessdoor} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={Iconaccessdoor} className="icon text-inherit ring-first" alt="" />,
        title: "Access Door Checklist",
        to: "app/access-door-checklist",
        path: "app/access-door-checklist",
        subTabs: {
            title: "Access Door Checklist",
            path: "access-door-checklist",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={Iconattendanceregister} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={Iconattendanceregister} className="icon text-inherit ring-first" alt="" />,
        title: "Attendance Register",
        to: "app/attendance-register",
        path: "app/attendance-register",
        subTabs: {
            title: "Attendance Register",
            path: "attendance-register",
        },
        id: ModulesIds.ManageAttendances,
    },

    {
        index: 3,
        activeIcon: <img src={Iconbadgesmissing} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={Iconbadgesmissing} className="icon text-inherit ring-first" alt="" />,
        title: "Badges Missing",
        to: "app/badges-missing",
        path: "app/badges-missing",
        subTabs: {
            title: "Badges Missing",
            path: "badges-missing",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={cctvmonitoring} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={cctvmonitoring} className="icon text-inherit ring-first" alt="" />,
        title: "CCTV Monitoring",
        to: "app/cctv-Monitoring",
        path: "app/cctv-Monitoring",
        subTabs: {
            title: "CCTV Monitoring",
            path: "cctv-Monitoring",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={commandcentre} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={commandcentre} className="icon text-inherit ring-first" alt="" />,
        title: "Command Centre",
        to: "app/command-Centre",
        path: "app/command-Centre",
        subTabs: {
            title: "Command Centre",
            path: "command-Centre",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={emergencycall} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={emergencycall} className="icon text-inherit ring-first" alt="" />,
        title: "Emergency Call log",
        to: "app/emergenc-Call-log",
        path: "app/emergenc-Call-log",
        subTabs: {
            title: "Emergency Call log",
            path: "emergenc-Call-log",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={emergencycall} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={emergencycall} className="icon text-inherit ring-first" alt="" />,
        title: "Escort Daily Feed Back",
        to: "app/escort-Daily-Feed-Back",
        path: "app/escort-Daily-Feed-Back",
        subTabs: {
            title: "Escort Daily Feed Back",
            path: "escort-Daily-Feed-Back",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={exitemp} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={exitemp} className="icon text-inherit ring-first" alt="" />,
        title: "Exit Employee",
        to: "app/exit-Employee",
        path: "app/exit-Employee",
        subTabs: {
            title: "Exit Employee",
            path: "exit-Employee",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={firealarm} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={firealarm} className="icon text-inherit ring-first" alt="" />,
        title: "Fire Alarm Checklist",
        to: "app/fire-Alarm-Checklist",
        path: "app/fire-Alarm-Checklist",
        subTabs: {
            title: "Fire Alarm Checklist",
            path: "fire-Alarm-Checklist",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={exitemp} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={exitemp} className="icon text-inherit ring-first" alt="" />,
        title: "Fire Extinguisher",
        to: "app/fire-Extinguisher",
        path: "app/fire-Extinguisher",
        subTabs: {
            title: "Fire Extinguisher",
            path: "fire-Extinguisher",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={fooddelivery} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={fooddelivery} className="icon text-inherit ring-first" alt="" />,
        title: "Food Delivery",
        to: "app/food-Delivery",
        path: "app/food-Delivery",
        subTabs: {
            title: "Food Delivery",
            path: "food-Delivery",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={handover} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={handover} className="icon text-inherit ring-first" alt="" />,
        title: "Hand Over",
        to: "app/hand-Over",
        path: "app/hand-Over",
        subTabs: {
            title: "Hand Over",
            path: "hand-Over",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={key} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={key} className="icon text-inherit ring-first" alt="" />,
        title: "key",
        to: "app/key",
        path: "app/key",
        subTabs: {
            title: "key",
            path: "key",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={lostandfound} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={lostandfound} className="icon text-inherit ring-first" alt="" />,
        title: "Lost and Found",
        to: "app/lost-and-Found",
        path: "app/lost-and-Found",
        subTabs: {
            title: "Lost and Found",
            path: "lost-and-Found",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={masteraccesscard} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={masteraccesscard} className="icon text-inherit ring-first" alt="" />,
        title: "Master Access Card",
        to: "app/master-Access-Card",
        path: "app/master-Access-Card",
        subTabs: {
            title: "Master Access Card",
            path: "master-Access-Card",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={outreturnable} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={outreturnable} className="icon text-inherit ring-first" alt="" />,
        title: "Material Inward Non Returnable",
        to: "app/material-Inward-Non-Returnable",
        path: "app/material-Inward-Non-Returnable",
        subTabs: {
            title: "Material Inward Non Returnable",
            path: "material-Inward-Non-Returnable",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={inreturnable} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={inreturnable} className="icon text-inherit ring-first" alt="" />,
        title: "Material Inward Returnable",
        to: "app/material-Inward-Returnable",
        path: "app/material-Inward-Returnable",
        subTabs: {
            title: "Material Inward Returnable",
            path: "material-Inward-Returnable",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={inreturnableno} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={inreturnableno} className="icon text-inherit ring-first" alt="" />,
        title: "Material Outward Returnable",
        to: "app/material-Outward-Returnable",
        path: "app/material-Outward-Returnable",
        subTabs: {
            title: "Material Outward Returnable",
            path: "material-Outward-Returnable",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={milk} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={milk} className="icon text-inherit ring-first" alt="" />,
        title: "milk",
        to: "app/milk",
        path: "app/milk",
        subTabs: {
            title: "milk",
            path: "milk",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={newjoinaccesscard} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={newjoinaccesscard} className="icon text-inherit ring-first" alt="" />,
        title: "New Joining Access Card",
        to: "app/new-Joining-Access-Card",
        path: "app/new-Joining-Access-Card",
        subTabs: {
            title: "New Joining Access Card",
            path: "new-Joining-Access-Card",
        },
        id: ModulesIds.ManageAttendances,
    },

    {
        index: 3,
        activeIcon: <img src={newspaper} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={newspaper} className="icon text-inherit ring-first" alt="" />,
        title: "News Paper",
        to: "app/news-Paper",
        path: "app/news-Paper",
        subTabs: {
            title: "News Paper",
            path: "news-Paper",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={occurence} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={occurence} className="icon text-inherit ring-first" alt="" />,
        title: "Occurence",
        to: "app/occurence",
        path: "app/occurence",
        subTabs: {
            title: "Occurence",
            path: "occurence",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={outgoingcourier} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={outgoingcourier} className="icon text-inherit ring-first" alt="" />,
        title: "outgoing Courier",
        to: "app/outgoing-Courier",
        path: "app/outgoing-Courier",
        subTabs: {
            title: "outgoing Courier",
            path: "outgoing-Courier",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={overnightparking} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={overnightparking} className="icon text-inherit ring-first" alt="" />,
        title: "Overnight Parking",
        to: "app/overnight-Parking",
        path: "app/overnight-Parking",
        subTabs: {
            title: "Overnight Parking",
            path: "overnight-Parking",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={pachecklist} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={pachecklist} className="icon text-inherit ring-first" alt="" />,
        title: "PA Checklist",
        to: "app/pa-Checklist",
        path: "app/pa-Checklist",
        subTabs: {
            title: "PA Checklist",
            path: "pa-Checklist",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={patrolling} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={patrolling} className="icon text-inherit ring-first" alt="" />,
        title: "patrolling",
        to: "app/patrolling",
        path: "app/patrolling",
        subTabs: {
            title: "patrolling",
            path: "patrolling",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={MdOutlineBroadcastOnPersonal} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={MdOutlineBroadcastOnPersonal} className="icon text-inherit ring-first" alt="" />,
        title: "Personal Belongings",
        to: "app/personal-Belongings",
        path: "app/personal-Belongings",
        subTabs: {
            title: "Personal Belongings",
            path: "personal-Belongings",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={securityincident} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={securityincident} className="icon text-inherit ring-first" alt="" />,
        title: "security Incident",
        to: "app/security-Incident",
        path: "app/security-Incident",
        subTabs: {
            title: "security Incident",
            path: "security-Incident",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={shiftlog} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={shiftlog} className="icon text-inherit ring-first" alt="" />,
        title: "Shift Log",
        to: "app/shift-Log",
        path: "app/shift-Log",
        subTabs: {
            title: "Shift Log",
            path: "shift-Log",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={iccardissue} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={iccardissue} className="icon text-inherit ring-first" alt="" />,
        title: "Temp ID Card Issue",
        to: "app/temp-ID-Card-Issue",
        path: "app/temp-ID-Card-Issue",
        subTabs: {
            title: "Temp ID Card Issue",
            path: "temp-ID-Card-Issue",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={vehicleentry} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={vehicleentry} className="icon text-inherit ring-first" alt="" />,
        title: "Vehicle entry checklist",
        to: "app/vehicle-entry-checklist",
        path: "app/vehicle-entry-checklist",
        subTabs: {
            title: "Vehicle entry checklist",
            path: "vehicle-entry-checklist",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={vendor} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={vendor} className="icon text-inherit ring-first" alt="" />,
        title: "Vendor",
        to: "app/vendor",
        path: "app/vendor",
        subTabs: {
            title: "Vendor",
            path: "vendor",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={watercan} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={watercan} className="icon text-inherit ring-first" alt="" />,
        title: "Water Can",
        to: "app/water-Can",
        path: "app/water-Can",
        subTabs: {
            title: "Water Can",
            path: "water-Can",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={workspace} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={workspace} className="icon text-inherit ring-first" alt="" />,
        title: "Workspace checklist",
        to: "app/workspace-checklist",
        path: "app/workspace-checklist",
        subTabs: {
            title: "Workspace checklist",
            path: "workspace-checklist",
        },
        id: ModulesIds.ManageAttendances,
    },
    {
        index: 3,
        activeIcon: <img src={incomingcourier} className="icon text-inherit ring-first" alt="" />,
        inActiveIcon: <img src={incomingcourier} className="icon text-inherit ring-first" alt="" />,
        title: "Incoming Courier",
        to: "app/incoming-Courier",
        path: "app/incoming-Courier",
        subTabs: {
            title: "Incoming Courier",
            path: "incoming-Courier",
        },
        id: ModulesIds.ManageAttendances,
    },
];
