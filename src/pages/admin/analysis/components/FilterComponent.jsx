import React from "react";
import { Button } from "@mui/material";

import { useTranslate } from "../../../../language";

const FilterComponent = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  applyFilter,
  clearFilter,
}) => {
  const { translate } = useTranslate();
  return (
    <div className="flex items-start sm:items-center sm:flex-row flex-col gap-4 space-x-4 mb-1 px-4">
      <div className="flex items-center space-x-2">
        <label
          htmlFor="fromDate"
          className="text-md dark:text-white text-black"
        >
          {translate("FROM")}
        </label>
        <input
          type="date"
          id="fromDate"
          placeholder="dd-mm-yyyy"
          className="p-2 border rounded-md text-black"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="toDate" className="text-md dark:text-white text-black">
          {translate("TO")}
        </label>
        <input
          type="date"
          id="toDate"
          placeholder="dd-mm-yyyy"
          className="p-2 border rounded-md text-black"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <Button
        className="b_btn font-bold py-2 px-4 rounded"
        onClick={applyFilter}
      >
        {translate("APPLYFILTER")}
      </Button>
      <Button
        className="b_btn font-bold py-2 px-4 rounded"
        sx={{
          color: "white",
          backgroundImage: "linear-gradient(to bottom, #0088cc, #0055cc)",
        }}
        onClick={clearFilter}
      >
        {translate("CLEARFILTER")}
      </Button>
    </div>
  );
};

export default FilterComponent;
