import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import StaffLock from "../../../assets/images/icons/Stafflock.png";
import StaffWatch from "../../../assets/images/icons/staffWatch.png";
import CustomSwitch from "../../../components/common/CustomSwitch";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";
import useDebounce from "../../../components/common/UseDebounce";
import axiosInstance from "../../../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslate } from "../../../language";

const ManageStaff1 = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { translate } = useTranslate();
  const [archivedData, setArchivedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isArchiveMode, setIsArchiveMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newStaff, setNewStaff] = useState({
    username: "",
    email: "",
    cnt_no: "",
    added_on: moment().unix(),
    sent_accepted: "0/0",
    online: false,
    active: true,
    watches_history: false,
    reset_password: false,
  });
  const [manageStaffData, setManageStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  // Handle modal toggle
  const toggleModal = () => setOpen((prev) => !prev);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditStaff = () => {
    setIsEditMode(true);
    setIsAddMode(false);
    setIsArchiveMode(false);
  };

  const handleAddStaff = () => {
    setIsAddMode(true);
    setIsEditMode(false);
    setIsArchiveMode(false);
    setEditingIndex(-1);
  };

  const handleArchiveStaff = () => {
    setIsArchiveMode(true);
    setIsAddMode(false);
    setIsEditMode(false);
  };

  const handleNewStaffChange = (index, e) => {
    const { name, type, checked, value } = e.target;
    const updatedData = [...manageStaffData];
    updatedData[index] = {
      ...updatedData[index],
      [name]: type === "checkbox" ? checked : value,
    };
    setData(updatedData);
    setManageStaffData(updatedData);
  };

  const handleRowSelect = (index) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter((i) => i !== index);
      } else {
        return [...prevSelectedRows, index];
      }
    });
  };

  const handleArchiveSelected = () => {
    const newArchivedData = selectedRows.map((index) => data[index]);
    const newData = data.filter((_, index) => !selectedRows.includes(index));
    setArchivedData([...archivedData, ...newArchivedData]);
    setData(newData);
    setSelectedRows([]);
    setIsArchiveMode(false);
  };

  const getManageStaffList = async () => {
    const searchValue = JSON.stringify(
      debouncedSearchTerm?.includes("@")
        ? { email: debouncedSearchTerm || "" }
        : { username: debouncedSearchTerm || "" }
    );
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/manageStaffUser?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`
      );
      setManageStaffData(response?.payload?.data);
      setTotalRecords(response?.pager?.total_records);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveStaff = async () => {
    if (editingIndex === -1) {
      // setData([...data, newStaff]);
      setManageStaffData([...manageStaffData, newStaff]);
    }
    const payload = {
      username: newStaff?.username,
      email: newStaff?.email,
      cnt_no: +newStaff?.cnt_no,
      active: newStaff?.active,
    };
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(`/manageStaffUser`, payload);
      setManageStaffData(response?.payload?.data);
      setTotalRecords(response?.pager?.total_records);

      toast.success("Staff add successfully");
      getManageStaffList();
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
    setEditingIndex(null);
    setIsAddMode(false);
    setIsEditMode(false);
    setIsArchiveMode(false);
    setNewStaff({
      username: "",
      email: "",
      cnt_no: "",
      added_on: moment().format("D MMM YYYY"),
      sent_accepted: "0/0",
      online: false,
      active: true,
      watches_history: false,
      reset_password: false,
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsAddMode(false);
    setIsEditMode(false);
    setIsArchiveMode(false);
    setNewStaff({
      username: "",
      email: "",
      cnt_no: "",
      added_on: moment().format("D MMM YYYY"),
      sent_accepted: "0/0",
      online: false,
      active: true,
      watches_history: false,
      reset_password: false,
    });
    setSelectedRows([]);
  };

  useEffect(() => {
    getManageStaffList();
  }, [currentPage, debouncedSearchTerm]);

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div className="px-[5px] sm:px-[20px] pt-8 flex justify-between flex-wrap dark:bg-none bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]">
        <div className="flex sm:flex-row flex-col w-full justify-between">
          <div className="flex flex-col">
            <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans dark:text-[#ffff] text-black">
              {translate("MANAGESTAFF")}
            </h1>
            <div className="flex sm:flex-row flex-col space-x-0 sm:gap-0 gap-4 sm:space-x-4 mb-4">
              {isAddMode || isEditMode || isArchiveMode ? (
                <div className="flex gap-2">
                  <Button
                    variant="contained"
                    className="!bg-[#00a65a] !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] text-white !capitalize !rounded-[50px]"
                    onClick={
                      isArchiveMode ? handleArchiveSelected : handleSaveStaff
                    }
                  >
                    {translate("SAVE")}
                  </Button>
                  <Button
                    variant="contained"
                    className="!bg-[#F0F0F0] !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !text-black !capitalize !rounded-[50px]"
                    onClick={handleCancel}
                  >
                    {translate("CANCEL")}
                  </Button>
                </div>
              ) : (
                <div className="flex sm:flex-row flex-col gap-2">
                  <Button
                    variant="contained"
                    size="small"
                    className="!bg-[#3C8DBC] text-white text-nowrap !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !capitalize !rounded-[50px]"
                    onClick={handleAddStaff}
                  >
                    {translate("ADDSTAFF")}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    className="!bg-[#3C8DBC] text-white text-nowrap !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !capitalize !rounded-[50px]"
                    onClick={handleEditStaff}
                  >
                    {translate("EDITSTAFF")}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    className="!bg-[#3C8DBC] text-white text-nowrap !px-[5px] sm:!px-[40px] !py-[10px] sm:!py-[10px] !capitalize !rounded-[50px]"
                    onClick={handleArchiveStaff}
                  >
                    {translate("ARCHIVESTAFF")}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex  justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap ">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setCurrentPage={setCurrentPage}
              placeholder={`${translate("SEARCH")}`}
            />
          </div>
        </div>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              {isArchiveMode && (
                <th className="p-2 dark:text-[#ffff] text-black text-center">
                  Select
                </th>
              )}
              {[
                { key: "online", label: `${translate("ONLINE")}` },
                { key: "active", label: `${translate("ACTIVE")}` },
                { key: "name", label: `${translate("NAME")}` },
                { key: "email", label: `${translate("EMAIL")}` },
                { key: "mobile_no", label: `${translate("MOBILENUMBER")}` },
                { key: "added_on", label: `${translate("ADDEDON")}` },
                { key: "sent/accepted", label: `${translate("SENTACCEPTED")}` },
                {
                  key: "watches_history",
                  label: `${translate("WATCHESHISTORY")}`,
                },
                {
                  key: "reset_password",
                  label: `${translate("RESETPASSWORD")}`,
                },
              ].map((column) => (
                <th
                  key={column.key}
                  className="p-2 dark:text-[#ffff] text-black text-center text-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {manageStaffData?.length > 0 ? (
              manageStaffData?.map((item, index) => {
                return (
                  <tr key={index} className="border-b border-[#202b34]">
                    {isArchiveMode && (
                      <td className="px-[18px] py-[10px] text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(index)}
                          onChange={() => handleRowSelect(index)}
                        />
                      </td>
                    )}
                    <td className="px-[18px] py-[10px] text-center">
                      <span
                        className={`${
                          item?.is_user_login === 1 ? "dot-green" : "dot-red"
                        }`}
                      />
                    </td>
                    <td className="px-[18px] py-[10px] text-center">
                      {isEditMode ? (
                        <CustomSwitch
                          name="active"
                          checked={item?.active}
                          onChange={(e) =>
                            handleNewStaffChange(index, {
                              target: {
                                name: "active",
                                type: "checkbox",
                                checked: !item?.active,
                              },
                            })
                          }
                        />
                      ) : (
                        <CustomSwitch
                          name={`active${index}`}
                          checked={item?.active}
                        />
                      )}
                    </td>
                    <td className="px-[18px] py-[10px] text-center">
                      {isEditMode ? (
                        <input
                          type="text"
                          name="username"
                          value={item?.username}
                          onChange={(e) => handleNewStaffChange(index, e)}
                          className="p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        item?.username
                      )}
                    </td>
                    <td className="px-[18px] py-[10px] text-center">
                      {isEditMode ? (
                        <input
                          type="email"
                          name="email"
                          value={item?.email}
                          onChange={(e) => handleNewStaffChange(index, e)}
                          className="p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        item?.email
                      )}
                    </td>
                    <td className="px-[18px] py-[10px] text-center">
                      {isEditMode ? (
                        <input
                          type="text"
                          name="cnt_no"
                          value={item?.cnt_no}
                          onChange={(e) => handleNewStaffChange(index, e)}
                          className="p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        item?.cnt_no
                      )}
                    </td>
                    <td className="px-[18px] py-[10px] text-center">
                      {moment.unix(item?.created_on).format("DD MMM YYYY")}
                    </td>
                    <td className="px-[18px] py-[10px] text-center">
                      {`${item?.sent_quotations}/${item?.accepted_quotations}`}
                    </td>
                    <td
                      className="px-[18px] py-[10px] text-center cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/admin/watch_details/watch_history?staff_id=${item?.id}`
                        )
                      }
                    >
                      <div className="flex justify-center">
                        <img src={StaffWatch} alt="Watch" width="35px" />
                      </div>
                    </td>
                    <td
                      className="px-[18px] py-[10px] text-center cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      <div className="flex justify-center">
                        <img src={StaffLock} alt="Lock" width="35px" />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="py-[200px] px-4  text-center text-nowrap dark:text-[#ffff] text-black font-bold"
                >
                  No Data Found
                </td>
              </tr>
            )}

            {isAddMode && (
              <tr>
                {isArchiveMode && (
                  <td className="px-[18px] py-[10px] text-center">
                    <input type="checkbox" />
                  </td>
                )}
                <td className="px-[18px] py-[10px] text-center">
                  <span className="dot-red" />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <CustomSwitch name="active" checked={newStaff?.active} />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <input
                    type="text"
                    name="username"
                    value={newStaff?.username}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, username: e.target.value })
                    }
                    placeholder={`${translate("NAME")}`}
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <input
                    type="email"
                    name="email"
                    value={newStaff?.email}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, email: e.target.value })
                    }
                    placeholder={`${translate("EMAIL")}`}
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <input
                    type="text"
                    name="cnt_no"
                    value={newStaff?.cnt_no}
                    onChange={(e) =>
                      setNewStaff({
                        ...newStaff,
                        cnt_no: e.target.value,
                      })
                    }
                    placeholder={`${translate("MOBILENUMBER")}`}
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  {moment.unix(newStaff?.added_on).format("DD MMM YYYY")}
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  {newStaff?.sent_accepted}
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <div className="flex justify-center">
                    <img src={StaffWatch} alt="Watch" width="35px" />
                  </div>
                </td>
                <td className="px-[18px] py-[10px] text-center">
                  <div className="flex justify-center">
                    <img src={StaffLock} alt="Lock" width="35px" />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalRecords}
        recordsPerPage={recordsPerPage}
        handlePageChange={handlePageChange}
        data={manageStaffData}
        userRole={userRole}
      />

      {/* Modal */}
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            py: 2,
            borderRadius: 2,
            border: "none",
          }}
        >
          <div
            onClick={toggleModal}
            className="flex justify-between px-[16px] pb-[16px] cursor-pointer"
          >
            <p className="text-black font-semibold text-[18px]">
              Reset Password
            </p>{" "}
            <CloseIcon className="text-black font-semibold" />
          </div>

          <Box
            mt={2}
            display="flex"
            sx={{ px: "16px" }}
            justifyContent="center"
            gap={1.5}
          >
            <Button variant="contained" style={{ backgroundColor: "#3C8DBC" }}>
              Send
            </Button>
            <Button
              variant="outlined"
              onClick={toggleModal}
              sx={{ color: "#3C8DBC", borderColor: "#3C8DBC" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ManageStaff1;
