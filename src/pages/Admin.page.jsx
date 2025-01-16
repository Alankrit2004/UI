// CORE
import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// COMPONENTS
import {
    Dashboard,
    ManageProfile,
    ManageAttributes,
    ManageCompanyDetails,
    ManageTypeOfPackaging,
    ManageUnit,
    RolePermission,
    ManageLOCATION,
    ManagePackagingType,
    ManageContainerType,
    ManageDeliveryTerms,
    ManageProductionStatus,
    ManageBRC,
    VisitorCompany,
    ManagePaymentTerms,
    VisitorDetails,
    ManageForwarding,
    ManageTerritory,
    ManageBranchDetails,
    ManageBuilding,
    ManagePortDischarge,
    ManagePaperType,
    Leads,
    ManageCustomers,
    ManageCurrencyType,
    ManageTrackingStatus,
    ManagePO,
    ManagePOIssued,
    ManagePIConfirmedbyCustomer,
    ManagePaymentReceived_LCReceived,
    ManagePINumber,
    TrackingStatus,
    ManageOrderAccepted,
    ManageOrderUnderProcess,
    ManageBookingIssue,
    ManageContainersUnderLoading,
    ManageInvoiceGenerated,
    ManageBiDraftIssued,
    ManageBiIssued,
    ManageFinalAmountToPay,
    ManageDocumentSendDhlSubmitted,
    ManageAwbGeneratedPending,
    ManageOrderCompletedPending,
    ManageTrackingStatusCustomer,
    ManageFloor,
    ManageAdminTypeOfVisitor,
    ManageAdminReasonType,
    ManageAdminDVMServerName,
    ManageAdminEBIServerName,
    ManageAdminEmergencyType,
    ManageAdminEmergencyClosureBy,
    ManageAdminShift,
    ManageAdminRoute,
    ManageAdminMaritalStatus,
    ManageAdminBloodGroup,
    ManageAdminEmployeeType,
    ManageAdminGender,
    ManageAdminEventType,
    ManageAdminCourierName,
    ManageAdminPBType,
    ManageAdminIncidentType,
    ManageAdminHanderOverByName,
    ManageAdminVehicleType,
    ManageAdminVisitPurpose,
    EmployeePermission,
    ManageAdminVerifiedBy
} from "sections";
import { ManagePOAdd, ManagePOIssuedAdd, PaymentLCReceivedAdd, ManagePIConfirmedbyCustomerAdd, BadgesMissing } from "components"
import { ManageAdminCompanyType } from "sections/ManageAdminCompanyType.section";
import { SecurityIncident, PersonalBelongings, Patrolling, OvernightParking, OutgoingCourier, Occurence, NewsPaper, NewJoiningAccessCard, Milk, MaterialOutwardReturnable, MaterialOutwardNonReturnable, MaterialInwardReturnable, AccessDoorChecklistScreen, AttendanceRegisterScreen, BadgesMissingScreen, CctvMonitoringScreen, CommandCentreScreen, EmergencCallLogScreen, EscortDailyFeedBackScreen, ExitEmployeeScreen, FireAlarmChecklistScreen, FireExtinguisherScreen, FoodDeliveryScreen, HandOverScreen, KeyScreen, LostAndFound, MasterAccessCard, MaterialInwardNonReturnableScreen, PaChecklist, ShiftLog, TempIDCardIssue, Vehicleentrychecklist, Vendor, WaterCan, Workspacechecklist, IncomingCourier } from "sections/App";
import { ManageAdminMaterialStatus } from "sections/ManageAdminMaterialStatus.section";

export function Admin() {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin-profile" element={<ManageProfile />} />
            <Route path="admin-profile/role-permission/:id" element={<RolePermission />} />
            <Route path="admin-profile/employee-permission/:id" element={<EmployeePermission />} />
            <Route path="admin-manage-territories/admin-attributes" element={<ManageAttributes />} />
            <Route path="/admin-manage-territories/admin-territories" element={<ManageTerritory />} />
            <Route path="admin-location" element={<ManageLOCATION />} />
            <Route path="admin-Building" element={<ManageBuilding />} />
            <Route path="admin-Floor" element={<ManageFloor />} />
            <Route path="admin-Type-of-visitor" element={<ManageAdminTypeOfVisitor />} />
            <Route path="admin-Reason-Type" element={<ManageAdminReasonType />} />
            <Route path="admin-DVM-Server-Name" element={<ManageAdminDVMServerName />} />
            <Route path="admin-EBI-Server-Name" element={<ManageAdminEBIServerName />} />
            <Route path="admin-Emergency-Type" element={<ManageAdminEmergencyType />} />
            <Route path="admin-Emergency-closure-by" element={<ManageAdminEmergencyClosureBy />} />
            <Route path="admin-Shift" element={<ManageAdminShift />} />
            <Route path="admin-route" element={<ManageAdminRoute />} />
            <Route path="admin-verified-by" element={<ManageAdminVerifiedBy />} />
            <Route path="admin-marital-status" element={<ManageAdminMaritalStatus />} />
            <Route path="admin-blood-group" element={<ManageAdminBloodGroup />} />
            <Route path="admin-employee-type" element={<ManageAdminEmployeeType />} />
            <Route path="admin-gender" element={<ManageAdminGender />} />
            <Route path="admin-event-type" element={<ManageAdminEventType />} />
            <Route path="admin-courier-name" element={<ManageAdminCourierName />} />
            <Route path="admin-pb-type" element={<ManageAdminPBType />} />
            <Route path="admin-incident-type" element={<ManageAdminIncidentType />} />
            <Route path="admin-hander-over-by-name" element={<ManageAdminHanderOverByName />} />
            <Route path="admin-vehicle-type" element={<ManageAdminVehicleType />} />
            <Route path="admin-visit-purpose" element={<ManageAdminVisitPurpose />} />
            <Route path="admin-company-type" element={<ManageAdminCompanyType />} />
            <Route path="visitor-company" element={<VisitorCompany />} />
            <Route path="admin-company-details" element={<ManageCompanyDetails />} />
            <Route path="admin-Branch-details" element={<ManageBranchDetails />} />
            <Route path="admin-port-discharge" element={<ManagePortDischarge />} />
            <Route path="admin-paper-type" element={<ManagePaperType />} />
            <Route path="admin-type-of-packaging" element={<ManageTypeOfPackaging />} />
            <Route path="admin-uom" element={<ManageUnit />} />
            <Route path="admin-packaging-type" element={<ManagePackagingType />} />
            <Route path="admin-container-type" element={<ManageContainerType />} />
            <Route path="admin-currency-type" element={<ManageCurrencyType />} />
            <Route path="admin-delivery-terms" element={<ManageDeliveryTerms />} />
            <Route path="admin-payment-terms" element={<ManagePaymentTerms />} />
            <Route path="admin-production-status" element={<ManageProductionStatus />} />
            <Route path="admin-brc" element={<ManageBRC />} />
            <Route path="admin-material-status" element={<ManageAdminMaterialStatus />} />
            <Route path="admin-forwarding" element={<ManageForwarding />} />
            <Route path="admin-tracking-status" element={<TrackingStatus />} />
            <Route path="role-permission" element={<RolePermission />} />
            <Route path="visitor-details" element={<VisitorDetails />} />
            <Route path="leads" element={<Leads />} />
            <Route path="customers" element={<ManageCustomers />} />
            <Route path="manage-tracking-status" element={<ManageTrackingStatus />} />
            <Route path="manage-customer-tracking-status" element={<ManageTrackingStatusCustomer />} />
            <Route path="manage-po-received" element={<ManagePO />} />
            <Route path="manage-pi-issued" element={<ManagePOIssued />} />
            <Route path="manage-pi-confirmation" element={<ManagePIConfirmedbyCustomer />} />
            <Route path="payment-received-lc-received" element={<ManagePaymentReceived_LCReceived />} />
            <Route path="manage-pi-number" element={<ManagePINumber />} />
            <Route path="manage-order-accepted" element={<ManageOrderAccepted />} />
            <Route path="manage-order-under-process" element={<ManageOrderUnderProcess />} />
            <Route path="manage-booking-issue" element={<ManageBookingIssue />} />
            <Route path="manage-containers-under-loading" element={<ManageContainersUnderLoading />} />
            <Route path="manage-invoice-generated" element={<ManageInvoiceGenerated />} />
            <Route path="manage-bi-draft-issued" element={<ManageBiDraftIssued />} />
            <Route path="manage-bi-issued" element={<ManageBiIssued />} />
            <Route path="manage-final-amount-to-pay" element={<ManageFinalAmountToPay />} />
            <Route path="manage-document-send-dhl-submitted" element={<ManageDocumentSendDhlSubmitted />} />
            <Route path="manage-awb-generated-pending" element={<ManageAwbGeneratedPending />} />
            <Route path="manage-order-completed-pending" element={<ManageOrderCompletedPending />} />
            <Route path="manage-po-received-add" element={<ManagePOAdd />} />
            <Route path="manage-po-issued-add" element={<ManagePOIssuedAdd />} />
            <Route path="manage-pi-confirmation-by-customer-add" element={<ManagePIConfirmedbyCustomerAdd />} />
            <Route path="manage-payment-received-lc-received-add" element={<PaymentLCReceivedAdd />} />

            <Route path="app" element={<Outlet />}>
                <Route path="access-door-checklist" element={<AccessDoorChecklistScreen />} />
                <Route path="attendance-register" element={<AttendanceRegisterScreen />} />
                <Route path="badges-missing" element={<BadgesMissingScreen />} />
                <Route path="cctv-Monitoring" element={<CctvMonitoringScreen />} />
                <Route path="command-Centre" element={<CommandCentreScreen />} />
                <Route path="emergenc-Call-log" element={<EmergencCallLogScreen />} />
                <Route path="escort-Daily-Feed-Back" element={<EscortDailyFeedBackScreen />} />
                <Route path="exit-Employee" element={<ExitEmployeeScreen />} />
                <Route path="fire-Alarm-Checklist" element={<FireAlarmChecklistScreen />} />
                <Route path="fire-Extinguisher" element={<FireExtinguisherScreen />} />
                <Route path="food-Delivery" element={<FoodDeliveryScreen />} />
                <Route path="hand-Over" element={<HandOverScreen />} />
                <Route path="key" element={<KeyScreen />} />
                <Route path="material-Inward-Non-Returnable" element={<MaterialInwardNonReturnableScreen />} />
                <Route path="lost-and-Found" element={<LostAndFound />} />
                <Route path="master-Access-Card" element={<MasterAccessCard />} />
                <Route path="material-Inward-Returnable" element={<MaterialInwardReturnable />} />
                <Route path="material-Outward-Non-Returnable" element={<MaterialOutwardNonReturnable />} />
                <Route path="material-Outward-Returnable" element={<MaterialOutwardReturnable />} />
                <Route path="milk" element={<Milk />} />
                <Route path="new-Joining-Access-Card" element={<NewJoiningAccessCard />} />
                <Route path="news-Paper" element={<NewsPaper />} />
                <Route path="occurence" element={<Occurence />} />
                <Route path="outgoing-Courier" element={<OutgoingCourier />} />
                <Route path="overnight-Parking" element={<OvernightParking />} />
                <Route path="pa-Checklist" element={<PaChecklist />} />
                <Route path="patrolling" element={<Patrolling />} />
                <Route path="personal-Belongings" element={<PersonalBelongings />} />
                <Route path="security-Incident" element={<SecurityIncident />} />
                <Route path="shift-Log" element={<ShiftLog />} />
                <Route path="temp-ID-Card-Issue" element={<TempIDCardIssue />} />
                <Route path="vehicle-entry-checklist" element={<Vehicleentrychecklist />} />
                <Route path="vendor" element={<Vendor />} />
                <Route path="water-Can" element={<WaterCan />} />
                <Route path="workspace-checklist" element={<Workspacechecklist />} />
                <Route path="incoming-Courier" element={<IncomingCourier />} />

            </Route>
        </Routes>
    );
}