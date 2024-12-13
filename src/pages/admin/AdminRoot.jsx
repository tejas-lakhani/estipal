import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import WatchHistory from "./watchHistory/WatchHistory";
import StaffUser from "./staff/StaffUser";
import ReadActivity from "./home/ReadActivity";
import WatchStatus from "./watchDetail/WatchStatus";
import Settings from "./generalSetting/Setting";
import Estimators from "./estimators/Estimators";
import AdminRevanueAnalysis from "./revenue_analysis/revenue_analysis_admin/AdminRevanueAnalysis";
import EstimatorRevanueAnalysis from "./revenue_analysis/revenue_analysis_estimator/EstimatorRevanueAnalysis";
import AdminPerformanceAnalysis from "./performance_analysis/performance_analysis_admin/AdminPerformanceAnalysis";
import EstimatorPerformanceAnalysis from "./performance_analysis/performance_analysis_estimator/EstimatorPerformanceAnalysis";
import SellerEdit from "./seller/SellerEdit";
import BrandList from "./brandList/BrandList";
import Language from "./language/Language";
import SellerUserCreate from "./seller/SellerUserCreate";
import SellerRevenueAnalysis from "../staff/revenue_analysis/revenue_analysis_seller/SellerRevenueAnalysis";
import SellerPerformanceAnalysis from "../staff/performance_analysis/performance_analysis_seller/SellerPerformanceAnalysis";
import AccountProfile from "../staff/account_profile/AccountProfile";
import ManageStaff from "../staff/manage_staff/ManageStaff";
import EstimatorEdit from "./estimators/EstimatorEdit";

const AdminRoot = () => {
  const staffUser = true;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/watch_details/watch_history" element={<WatchHistory />} />
        {!staffUser && <Route path="/staff/staff_user" element={<StaffUser />} />}
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
          path="/analysis/revenue_analysis/seller"
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
          path="/analysis/performance_analysis/seller"
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
          path="/analysis/performance_analysis/admin"
          element={<AdminPerformanceAnalysis />}
        />
        <Route
          path="/analysis/performance_analysis/estimator"
          element={<EstimatorPerformanceAnalysis />}
        />
        <Route path="/watch_details/brand_list" element={<BrandList />} />
        <Route
          path="/panel/account"
          element={<AccountProfile />}
        />

        {staffUser && <Route
          path="/staff/staff_user"
          element={<ManageStaff />}
        />}
        <Route path="language" element={<Language />} />
        {/* <Route path="/edit" element={<EditUser />} />  */}
      </Routes>
    </div>
  );
};

export default AdminRoot;
