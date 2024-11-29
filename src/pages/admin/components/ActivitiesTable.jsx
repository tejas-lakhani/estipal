import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import GradeIcon from "@mui/icons-material/Grade";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const activities = [
  {
    who: "(S)",
    from: "M - mayawizard",
    id: "UCA1000",
    message:
      "Action Required! Seller has sent invoice for watch (Rolex Daytona Stainless Steel - Bracelet - Serial: 43141331 - Year: 2019 - Last requested/quoted price: USD 0)",
    watchId: "W10015",
    status: "Pending Estipal Payment",
    received: "April 20, 2023 10:55 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-Administrator",
    id: "UCA1009",
    message:
      "Acceptance of the watch has been confirmed. This deal has been completed (Rolex GMT-Master II 40 mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel, 2022 - Serial: 1234567 - Year: 2021 - Last requested/quoted price: USD 0)",
    watchId: "W10077",
    status: "Sold",
    received: "April 19, 2023 10:05 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-Administrator",
    id: "UCA1009",
    message:
      "Acceptance of the watch has been confirmed. This deal has been completed (A. Lange & Söhne 1815 Up/Down - Serial: xbbzx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10018",
    status: "Sold",
    received: "April 03, 2023 02:00 AM",
  },
  {
    who: "(S)",
    from: "Estipal, LLC - Administrator",
    id: "UCA1009",
    message:
      "Shipment of the watch has been confirmed by the Seller (Rolex Daytona 40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel - Serial: 123456 - Year: 2003 - Last requested/quoted price: USD 0)",
    watchId: "W10024",
    status: "Shipped",
    received: "December 21, 2022 08:59 AM",
  },
  {
    who: "(S)",
    from: "Estipal, LLC - Administrator",
    id: "UCA1009",
    message:
      "Shipment of the watch has been confirmed by the Seller (Rolex Sea-Dweller 44 mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel, 2022 - Serial: 1234567890 - Year: 2018 - Last requested/quoted price: USD 0)",
    watchId: "W10022",
    status: "Shipped",
    received: "December 15, 2022 03:19 PM",
  },
  {
    who: "(U)",
    from: "MLA Thai - Bob",
    id: "UCA1001",
    message:
      "Staff has declined the estimate request. (Rolex Daytona 40mm, Black Dial, Ceramic Bezel, Oyster Bracelet, Stainless Steel - Serial: 12356 - Year: 2019 - Last requested/quoted price: USD 0)",
    watchId: "W10009",
    status: "Rejected",
    received: "November 15, 2023 12:18 PM",
  },
  {
    who: "(E)",
    from: "Karan Company -Administrator",
    id: "UCA1001",
    message:
      "Staff has accepted deal at staff first counter offer price (Patek Philippe Complications World Time - 36mm, Green Dial, Green Leather Strap, Rose Gold - Serial: 123456 - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10089",
    status: "Accepted - Deal in progress",
    received: "November 11, 2023 03:33 PM",
  },
  {
    who: "(U)",
    from: "MLA Thai - RobeAdministrator",
    id: "UCA1001",
    message:
      "Staff has placed first counter offer on estimation of the watch quotation (Rolex Air-King 40mm, Black Dial, Bracelet, Stainless Steel - Serial: 12345678 - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10088",
    status: "Pending first counter offer",
    received: "November 09, 2023 04:16 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "Estipal sold the watch. This deal has been completed. (Rolex Yacht-Master 42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold - Serial: 23456709 - Year: 2020 - Last requested/quoted price: USD 0)",
    watchId: "W10087",
    status: "Sold",
    received: "July 31, 2023 10:33 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1000",
    message:
      "Commissions to estimator has been paid (USD 0.00) (A. Lange & Söhne 1815 Honeygold - Serial: xxxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10023",
    status: "Sold",
    received: "June 05, 2023 11:25 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1012",
    message:
      "Commissions to estimator has been paid (USD 270.00) (Rolex Daytona 40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel - Serial: xxxxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10081",
    status: "Sold",
    received: "June 04, 2023 10:51 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1012",
    message:
      "Commissions to estimator has been paid (USD 0.00) (A. Lange & Söhne 1815 Honeygold - Serial: xxxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10082",
    status: "Sold",
    received: "June 04, 2023 10:51 PM",
  },
  {
    who: "(U)",
    from: "maya - test_staAdministrator",
    id: "UCA1012",
    message:
      "This estimate is expired, please submit your request again (Rolex Daytona 40mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel - Serial: zxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10086",
    status: "Expired",
    received: "May 04, 2023 09:12 AM",
  },
  {
    who: "(U)",
    from: "maya - test_staAdministrator",
    id: "UCA1012",
    message:
      "This estimate is expired, please submit your request again (A. Lange & Söhne 1815 Honeygold - Serial: xxop - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10085",
    status: "Expired",
    received: "May 04, 2023 07:39 AM",
  },
  {
    who: "(U)",
    from: "maya - test_staAdministrator",
    id: "UCA1012",
    message:
      "This estimate is expired, please submit your request again (Cartier Baignoire Large - Pink Gold - Serial: yyyy - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10084",
    status: "Expired",
    received: "April 28, 2023 10:37 AM",
  },
  {
    who: "(U)",
    from: "maya - test_staAdministrator",
    id: "UCA1012",
    message:
      "This estimate is expired, please submit your request again (Audemars Piguet Code 11.59 by Audemars Piguet Selfwinding - White Gold, Blue Dial - Serial: xxxx - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10083",
    status: "Expired",
    received: "April 28, 2023 10:21 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "Estipal sold the watch. This deal has been completed. (Rolex Submariner 41 mm, Black Dial, Ceramic Bezel, Bracelet, Stainless Steel and Yellow Gold - Serial: 12345 - Year: 2022 - Last requested/quoted price: USD 0)",
    watchId: "W10080",
    status: "Sold",
    received: "April 24, 2023 02:26 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "Estipal sold the watch. This deal has been completed. (Rolex Yacht-Master 42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold - Serial: 23456789 - Year: 2021 - Last requested/quoted price: USD 0)",
    watchId: "W10079",
    status: "Sold",
    received: "April 21, 2023 09:04 AM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "The payment of the seller has been confirmed. Shipment of the watch is pending (Rolex Daytona Stainless Steel - Bracelet - Serial: 43141331 - Year: 2019 - Last requested/quoted price: USD 0)",
    watchId: "W10016",
    status: "Paid / Pending Shipping",
    received: "April 20, 2023 10:55 PM",
  },
  {
    who: "(Admin)",
    from: "Estipal-AdminisAdministrator",
    id: "UCA1009",
    message:
      "Estipal sold the watch. This deal has been completed. (Rolex Yacht-Master 42 mm, Black Dial, Ceramic Bezel, Black Rubber Bracelet, White Gold - Serial: 123456789 - Year: 2021 - Last requested/quoted price: USD 0)",
    watchId: "W10078",
    status: "Sold",
    received: "April 19, 2023 10:05 AM",
  },
];

const ActivitiesTable = () => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? (
      <ArrowUpwardIcon sx={{ fontSize: "16px" }} />
    ) : (
      <ArrowDownwardIcon sx={{ fontSize: "16px" }} />
    );
  };
  return (
    <div className="p-[15px]">
      <div className="px-[15px] flex justify-between ">
        <h1 className="text-[30px] font-medium mb-4 px-[15px] font-sans text-white">
          Activities
        </h1>

        <div className="flex justify-between items-center mb-4 gap-8">
          <div className="flex items-center ">
            <label className="mr-2 !mb-0 text-[#ffff] text-center !font-normal">
              Filter by Status :
            </label>
            <select className="bg-[#1e252b] text-white p-2 rounded w-[237px]">
              <option>All</option>
            </select>
          </div>
          <div className="flex items-center">
            <form class="input-group estipal-input-group pull-right !bg-[#1e252b] rounded-[5px]">
              <span class="input-group-addon estipal-input-group-icon">
                <SearchIcon sx={{ fontSize: "20px" }} />
              </span>
              <input
                type="text"
                id="search_activity"
                name="sr"
                className="search-box estipal-input-group-control !border-none !bg-transparent w-[240px]"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              <th className="p-2 text-[#ffff] text-center "></th>
              <th className="p-2 text-[#ffff] text-center ">
                <Checkbox
                  icon={
                    <StarOutlineIcon
                      sx={{ color: "#9b9b9b", fontSize: "21px" }}
                    />
                  }
                  checkedIcon={
                    <GradeIcon sx={{ color: "#ff9300", fontSize: "21px" }} />
                  }
                />
              </th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("who")}
              >
                Who {renderSortIcon("who")}
              </th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("from")}
              >
                From {renderSortIcon("from")}
              </th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID {renderSortIcon("id")}
              </th>
              <th className="p-2 text-[#ffff] sorting">Message</th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("watchId")}
              >
                Watch Id {renderSortIcon("watchId")}
              </th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {renderSortIcon("status")}
              </th>
              <th
                className="p-2 text-[#ffff] text-center sorting cursor-pointer"
                onClick={() => handleSort("received")}
              >
                Received {renderSortIcon("received")}
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-b border-[#202b34]">
                <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                  <div className="w-[35px]">
                    <a href="">
                      <img
                        src="https://www.estipal.com/assets/dist/images/icons/Alarm_watch_light.png"
                        width="35px"
                      />
                    </a>
                  </div>
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {" "}
                  <Checkbox
                    {...label}
                    icon={
                      <StarOutlineIcon
                        sx={{ color: "#494a4b", fontSize: "21px" }}
                      />
                    }
                    checkedIcon={
                      <GradeIcon sx={{ color: "#ff9300", fontSize: "21px" }} />
                    }
                  />
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {activity.who}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff]">
                  <div className="w-[97px] truncate">{activity.from}</div>
                  {/* {activity.from} */}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {activity.id}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] whitespace-nowrap ">
                  {activity.message}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center">
                  {activity.watchId}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {activity.status}
                </td>
                <td className="px-[18px] py-[10px] text-[#ffff] text-center whitespace-nowrap">
                  {activity.received}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center gap-5">
        <div className="text-[#ffff]">
          {/* <TablePagination
            showFirstButton={false}
            showLastButton={false}
            sx={{
              "& .css-s09cke-MuiTablePagination-selectLabel": {
                display: "none",
              },
              "& .css-oegngy-MuiInputBase-root-MuiTablePagination-select": {
                display: "none",
              },
              "& .css-1gak8h1-MuiToolbar-root-MuiTablePagination-toolbar .MuiTablePagination-actions":
                {
                  display: "none",
                },

              "& .MuiTablePagination-root": {
                border: "none  ",
              },
              "& .css-1gak8h1-MuiToolbar-root-MuiTablePagination-toolbar": {
                minHeight: "25px",
              },
            }}

            
          /> */}
          1 - 20 of 90
        </div>
        <div className="flex items-center pt-[5px]">
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .css-ptck8z-MuiButtonBase-root-MuiPaginationItem-root": {
                border: "none",
                color: "#ffff",
              },
              "& .css-ptck8z-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                {
                  backgroundColor: "#0060aa",
                },
              "& .css-btxnvc-MuiPaginationItem-root": {
                color: "#ffff",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivitiesTable;
