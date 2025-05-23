/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axiosInstance from "../../../../services/index";

const useActivityData = ({
  currentPage,
  recordsPerPage,
  debouncedSearchTerm,
  sortOrder,
  sortField,
  status,
}) => {
  const [activitesData, setActivitiesData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const userRole = localStorage.getItem("userRole");

  const getActivityData = async () => {
    try {
      setIsLoading(true);
      const searchObject = { search: debouncedSearchTerm || "" };
      if (status && status !== "All") {
        if (userRole === "staff") {
          searchObject.staff_watch_status = status;
        } else {
          searchObject.watch_status = status;
        }
      }
      const searchValue = JSON.stringify(searchObject);
      const response = await axiosInstance.get(
        `/adminActivity?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}&sort_order=${sortOrder}&sort_by=${sortField}&status=${status}`
      );
      setActivitiesData(response.payload.data);
      setTotalRecords(response?.pager?.total_records);
      setCurrency(response?.payload?.adminDetails?.currency);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage) {
      getActivityData();
    }
  }, [
    currentPage,
    sortOrder,
    debouncedSearchTerm,
    status,
    sortOrder,
    sortField,
  ]);

  return { activitesData, totalRecords, isLoading, getActivityData, currency };
};

export default useActivityData;
