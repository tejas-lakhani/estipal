import React from "react";
import { Route, Routes } from "react-router-dom";
import BrandList from "../pages/admin/brandList/BrandList";
import Estimators from "../pages/admin/estimators/Estimators";
import Settings from "../pages/admin/generalSetting/Setting";
import ReadActivity from "../pages/admin/home/ReadActivity";
import Language from "../pages/admin/language/Language";
import AdminPerformanceAnalysis from "../pages/admin/analysis/performance_analysis/performance_analysis_admin/AdminPerformanceAnalysis";
import EstimatorPerformanceAnalysis from "../pages/admin/analysis/performance_analysis/performance_analysis_estimator/EstimatorPerformanceAnalysis";
import AdminRevanueAnalysis from "../pages/admin/analysis/revenue_analysis/revenue_analysis_admin/AdminRevanueAnalysis";
import EstimatorRevanueAnalysis from "../pages/admin/analysis/revenue_analysis/revenue_analysis_estimator/EstimatorRevanueAnalysis";
import SellerEdit from "../pages/admin/seller/SellerEdit";
import SellerUserCreate from "../pages/admin/seller/SellerUserCreate";
import StaffUser from "../pages/admin/staff/StaffUser";
import WatchStatus from "../pages/admin/watchDetail/WatchStatus";
import WatchHistory from "../pages/admin/watchHistory/WatchHistory";
// import SellerPerformanceAnalysis from "../staff/performance_analysis/performance_analysis_seller/SellerPerformanceAnalysis";
import AccountProfile from "../pages/staff/account_profile/AccountProfile";
import ManageStaff from "../pages/staff/manage_staff/ManageStaff";
import SellerRevenueAnalysisStaff from "../pages/staff/revenue_analysis/revenue_analysis_seller/SellerRevenueAnalysis";
import SellerPerformanceAnalysisStaff from "../pages/staff/performance_analysis/performance_analysis_seller/SellerPerformanceAnalysis";
import ActivitiesTable from "../pages/admin/activities/ActivitiesTable";
import EstimatorEdit from "../pages/admin/estimators/EstimatorEdit";
import SellerPerformanceAnalysis from "../pages/admin/analysis/performance_analysis/performance_analysis_seller/SellerPerformanceAnalysis";
import SellerRevenueAnalysis from "../pages/admin/analysis/revenue_analysis/revenue_analysis_seller/SellerRevenueAnalysis";

const AdminRoot = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <div>
      <Routes>
        <Route path="/" element={<ActivitiesTable />} />
        <Route path="/watch_details/watch_history" element={<WatchHistory />} />
        <Route
          path="/staff/staff_user"
          element={userRole === "staff" ? <ManageStaff /> : <StaffUser />}
        />

        <Route
          path="/home/readActivity/:id/:watch_id"
          element={<ReadActivity />}
        />

        <Route path="/home/readActivity/:id" element={<ReadActivity />} />

        <Route
          path="/watch_details/watch_status/:id"
          element={<WatchStatus />}
        />

        <Route path="/panel/settings" element={<Settings />} />
        <Route path="/estimator/estimator_user" element={<Estimators />} />
        <Route
          path="/estimator/estimator_edit/:id"
          element={<EstimatorEdit />}
        />
        <Route
          path="/estimator/estimator_user_create"
          element={<EstimatorEdit />}
        />
        <Route
          path="/analysis/revenue_analysis/admin"
          element={<AdminRevanueAnalysis />}
        />
        <Route
          path="/analysis/revenue_analysis/seller/:seller_id"
          element={<SellerRevenueAnalysis />}
        />
        <Route
          path="/analysis/revenue_analysis/estimator"
          element={<EstimatorRevanueAnalysis />}
        />
        <Route
          path="/analysis/performance_analysis/admin"
          element={<AdminPerformanceAnalysis />}
        />
        <Route
          path="/analysis/performance_analysis/seller/:seller_id"
          element={<SellerPerformanceAnalysis />}
        />
        <Route
          path="/analysis/performance_analysis/estimator"
          element={<EstimatorPerformanceAnalysis />}
        />
        <Route path="/seller/seller_edit/:id" element={<SellerEdit />} />
        <Route
          path="/seller/seller_user_create"
          element={<SellerUserCreate />}
        />
        <Route
          path="/analysis/revenue_analysis/admin"
          element={<AdminRevanueAnalysis />}
        />
        <Route
          path="/analysis/revenue_analysis/estimator"
          element={<EstimatorRevanueAnalysis />}
        />
        <Route
          path="/analysis/revenue_analysis/seller"
          element={<SellerRevenueAnalysisStaff />}
        />
        <Route
          path="/analysis/performance_analysis/seller"
          element={<SellerPerformanceAnalysisStaff />}
        />
        <Route
          path="/analysis/performance_analysis/admin"
          element={<AdminPerformanceAnalysis />}
        />
        <Route
          path="/analysis/performance_analysis/estimator"
          element={<EstimatorPerformanceAnalysis />}
        />
        <Route path="/watch_details/brand_list" element={<BrandList />} />
        <Route path="/panel/account" element={<AccountProfile />} />

        {/* {userRole && <Route
          path="/staff/staff_user"
          element={<ManageStaff />}
        />} */}
        <Route path="language" element={<Language />} />
        {/* <Route path="/edit" element={<EditUser />} />  */}
      </Routes>
    </div>
  );
};

export default AdminRoot;
