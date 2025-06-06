import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import PhoneInput, {
  formatPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomSwitch from "../../../components/common/CustomSwitch";
import SupportedBrandsDropdown from "../../../components/common/SupportedBrandsDropdown";
import TextInputField from "../../../components/common/TextInputField";
import YearDropdown from "../../../components/common/YearsDropdown";
import currency from "../../../constant/currency.json";
import timeZone from "../../../constant/timeZone.json";
import axiosInstance from "../../../services";
import {
  fetchCountryList,
  fetchNextEstimatorId,
  fetchStateList,
} from "../../../utils/apiUtils";
import AvailabilitySchedule from "./components/AvailabilitySchedule";
import toast from "react-hot-toast";
import axios from "axios";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

const EstimatorEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const actionType = location.state?.type || "add";

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectPhoneCountry, setSelectPhoneCountry] = useState("IN");
  const [estimatorData, setEstimatorData] = useState(null);
  const [selectCountry, setSelectCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogLoading, setConfirmDialogLoading] = useState(false);
  const [availabilitySchedule, setAvailabilitySchedule] = useState([
    {
      week_id: 0,
      from_time_1: "",
      to_time_1: "",
      from_time_2: "",
      to_time_2: "",
      from_time_3: "",
      to_time_3: "",
    },
    {
      week_id: 1,
      from_time_1: "",
      to_time_1: "",
      from_time_2: "",
      to_time_2: "",
      from_time_3: "",
      to_time_3: "",
    },
    {
      week_id: 2,
      from_time_1: "",
      to_time_1: "",
      from_time_2: "",
      to_time_2: "",
      from_time_3: "",
      to_time_3: "",
    },
    {
      week_id: 3,
      from_time_1: "",
      to_time_1: "",
      from_time_2: "",
      to_time_2: "",
      from_time_3: "",
      to_time_3: "",
    },
    {
      week_id: 4,
      from_time_1: "",
      to_time_1: "",
      from_time_2: "",
      to_time_2: "",
      from_time_3: "",
      to_time_3: "",
    },
    {
      week_id: 5,
      from_time_1: "",
      to_time_1: "",
      from_time_2: "",
      to_time_2: "",
      from_time_3: "",
      to_time_3: "",
    },
    {
      week_id: 6,
      from_time_1: "",
      to_time_1: "",
      from_time_2: "",
      to_time_2: "",
      from_time_3: "",
      to_time_3: "",
    },
  ]);
  const [formData, setFormData] = useState({
    active: 0,
    id: "",
    company_name: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    state: "",
    req_validate: 1,
    email: "",
    cnt_code: "",
    cnt_no: "",
    created_on: formattedDate,
    bank_account_name: "",
    bank_swift: "",
    account_number: "",
    bank_address: "",
    bank_name: "",
    currency: "USD",
    year_of_production: "",
    commission: "10",
    timezone: "",
    week_data: [],
    notify_link_flag: 0,
    // admin_id: 0,
    // brands: ""x
  });

  // Fetch country data on mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countryData = await fetchCountryList();
        setCountries(countryData);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    if (selectCountry) {
      const fetchStatesData = async () => {
        try {
          const stateData = await fetchStateList(selectCountry);
          setStates(stateData);
        } catch (error) {
          console.error("Failed to fetch states:", error);
        }
      };
      fetchStatesData();
    }
  }, [selectCountry]);

  useEffect(() => {
    const formattedPhone = formatPhoneNumber(phone);
    const dialCode = getCountryCallingCode(selectPhoneCountry);

    setFormData((prev) => ({
      ...prev,
      cnt_code: dialCode,
      cnt_no: formattedPhone,
    }));
  }, [phone, selectPhoneCountry]);

  useEffect(() => {
    const loadDetails = async () => {
      if (actionType === "edit") {
        try {
          const response = await axiosInstance.get(
            `/estimator/detail?id=${id}`
          );
          const estimator = response.payload?.data;

          setFormData({
            ...formData,
            active: estimator?.active,
            id: `SCA${estimator?.id}`,
            company_name: estimator?.company_name,
            first_name: estimator?.first_name,
            last_name: estimator?.last_name,
            address: estimator?.address,
            city: estimator?.city,
            country: estimator?.country,
            zip: estimator?.zip,
            state: estimator?.state,
            req_validate: estimator?.req_validate,
            email: estimator?.email,
            cnt_code: estimator?.cnt_code,
            cnt_no: estimator?.cnt_no,
            created_on: moment
              .unix(estimator?.created_on)
              .format("MMM DD, YYYY"),
            bank_account_name: estimator?.bank_account_name,
            bank_swift: estimator?.bank_swift,
            account_number: estimator?.account_number,
            bank_address: estimator?.bank_address,
            bank_name: estimator?.bank_name,
            currency: estimator?.currency,
            year_of_production: estimator?.year_of_production,
            commission: estimator?.commission,
            timezone: estimator?.timezone,
          });

          setEstimatorData(estimator);
          setSelectedYears(
            estimator?.year_of_production === ""
              ? []
              : estimator?.year_of_production?.split(",").map(Number) || []
          );
          setSelectedBrands(
            estimator?.brands === "" ? [] : estimator?.brands?.split(",") || []
          );
          setPhone(`+${estimator?.cnt_code} ${estimator?.cnt_no}`);
          setAvailabilitySchedule(estimator?.estimatorDayTimeDurations || []);
          setSelectCountry(estimator?.country);
        } catch (error) {
          console.error("Error fetching estimator details:", error);
        }
      } else {
        try {
          const nextId = await fetchNextEstimatorId();
          setFormData((prev) => ({ ...prev, id: nextId }));
        } catch (error) {
          console.error("Error fetching next estimator ID:", error);
        }
        setIsEditable(true);
      }
    };
    loadDetails();
  }, [id, actionType]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      year_of_production: selectedYears,
      brands: selectedBrands,
      week_data: availabilitySchedule,
    }));
  }, [selectedYears, selectedBrands, availabilitySchedule]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData((prev) => ({ ...prev, country, state: "" }));
    setSelectCountry(country);
  };

  const handleStateChange = (e) => {
    setFormData((prev) => ({ ...prev, state: e.target.value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const fieldNames = {
      company_name: "Company Name",
      first_name: "First Name",
      last_name: "Last Name",
      address: "Address",
      city: "City",
      country: "Country",
      zip: "Zip",
      state: "State",
      email: "Email",
      cnt_no: "Contact Number",
      bank_account_name: "Bank Account Name",
      bank_swift: "Swift code/IBAN",
      account_number: "Account Number",
      bank_address: "Bank Address",
      bank_name: "Bank Name",
    };
    for (const field in fieldNames) {
      if (!formData[field]) {
        toast.error(`${fieldNames[field]} field is required.`);
        return false;
      }
    }
    if (!phone) {
      toast.error("Please enter a valid Mobile Number.");
      return false;
    }
    return true;
  };

  const save = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const endpoint =
        actionType === "edit" ? `/estimator?id=${id}` : `/estimator`;
      const method = actionType === "edit" ? "put" : "post";
      const response = await axiosInstance[method](endpoint, formData);
      if (response?.status === 200) {
        const message =
          actionType === "edit"
            ? "The estimator details have been updated successfully."
            : "The estimator added successfully!";
        toast.success(message);
        navigate("/admin/estimator/estimator_user");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to save the estimator. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmResetPassword = async () => {
    setConfirmDialogOpen(false);
    setConfirmDialogLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/sellers/forgetPassword`,
        {
          email: estimatorData?.email,
          type: "estimator",
        }
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setConfirmDialogLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setConfirmDialogLoading(false);
    }
  };

  return (
    <div className="mx-auto px-[10px] sm:px-[45px] py-[20px]">
      <div className="flex justify-between flex-wrap gap-2 pt-[10px] lg:pt-0">
        <div className="flex items-center p-[10px] sm:p-0">
          <h3 className="w-[100px] text-black dark:text-white text-[24px] text-nowrap">
            {actionType !== "add" ? "Profile" : "Add Estimators"}
          </h3>
          {actionType === "add" ? (
            ""
          ) : (
            <div className="flex items-center gap-2">
              <div
                className={`${
                  estimatorData?.available ? "bg-[#11c71d]" : "bg-[#da3832]"
                } rounded-[100%] w-[15px] h-[15px]`}
              ></div>
              <p className="text-white">{estimatorData?.available ? "Online" : "Offline"}</p>
            </div>
          )}
        </div>

        <div className="flex gap-4 p-[10px] sm:p-0">
          {isEditable ? (
            <>
              <LoadingButton
                loading={loading}
                variant="contained"
                className="!bg-[#00a65a] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
                onClick={save}
              >
                Save
              </LoadingButton>
              <Button
                variant="contained"
                className="!bg-[#ffff] !text-black !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
                onClick={() => {
                  setIsEditable(false);
                  navigate("/admin/estimator/estimator_user");
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            actionType !== "add" && (
              <Button
                variant="contained"
                className="!bg-[#3c8dbc] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
                onClick={() => setIsEditable(true)}
              >
                Edit Estimator
              </Button>
            )
          )}

          {actionType !== "add" && (
            <LoadingButton
              loading={confirmDialogLoading}
              variant="contained"
              className="!bg-[#fea31e] !normal-case !py-[5px] sm:!py-[10px] sm:!px-[40px] !px-[15px] !rounded-[50px]"
              onClick={handleResetPasswordClick}
            >
              Reset Password
            </LoadingButton>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-[35px]">
        <div className="flex justify-start sm:justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px] whitespace-nowrap"
            onClick={() =>
              navigate(
                `/admin/watch_details/watch_history?estimator_id=${estimatorData?.id}`
              )
            }
          >
            View estimated watches
          </Button>
        </div>
        <div className="flex justify-start sm:justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px] whitespace-nowrap"
            onClick={() =>
              navigate("/admin/analysis/revenue_analysis/estimator")
            }
          >
            View revenue analysis
          </Button>
        </div>
        <div className="flex justify-start sm:justify-center">
          <Button
            variant="contained"
            className="!bg-[#3c8dbc] !normal-case !py-[10px] !px-[40px] !rounded-[50px] whitespace-nowrap"
            onClick={() =>
              navigate("/admin/analysis/performance_analysis/estimator")
            }
          >
            View performance analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 mt-[35px]">
        <div className="">
          <TextInputField
            rightTextValue=""
            type="text"
            label="Active"
            placeholder="Active"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            component={
              <div className="w-full flex justify-end">
                <CustomSwitch
                  disabled={!isEditable}
                  checked={formData.active}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      active: e.target.checked,
                    }));
                  }}
                />
              </div>
            }
          />

          <TextInputField
            rightTextValue=""
            value={formData.id}
            name="id"
            type="text"
            label="ID"
            placeholder="ID"
            readOnly={true}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
            inputClass="!cursor-not-allowed"
          />
          <TextInputField
            value={formData.company_name}
            rightTextValue=""
            type="text"
            label="Company"
            placeholder="Company"
            name="company_name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            value={formData.first_name}
            name="first_name"
            rightTextValue=""
            type="text"
            label="First Name"
            placeholder="First Name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.last_name}
            name="last_name"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextInputField
            rightTextValue=""
            value={formData.address}
            name="address"
            type="text"
            label="Address"
            placeholder="Address"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            value={formData.city}
            name="city"
            type="text"
            label="City"
            placeholder="City"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            rightTextValue=""
            label="Country"
            placeholder="Country"
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            component={
              <div className="flex w-full justify-end">
                {isEditable ? (
                  <select
                    name="country"
                    id="country"
                    className="bg-[#1e252b] max-sm:w-[100px] "
                    style={{ textAlignLast: "right" }}
                    value={formData?.country}
                    readOnly={!isEditable}
                    onChange={handleCountryChange}
                  >
                    <option disabled selected value={""}>
                      Open to select country
                    </option>
                    {countries?.map((item, index) => (
                      <option value={item?.iso} key={index}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{formData.country}</p>
                )}
              </div>
            }
          />
          <TextInputField
            rightTextValue=""
            value={formData.zip}
            name="zip"
            type="text"
            label="Zip/Postal Code"
            placeholder="Zip"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
          <TextInputField
            label="State/Province"
            placeholder="State/Province"
            bgColor="#1e252b"
            className="mb-[15px] text-black dark:text-white"
            component={
              <div className="flex w-full justify-end">
                {isEditable ? (
                  <select
                    name="state"
                    id="state"
                    className="bg-[#1e252b] max-sm:w-[100px]"
                    style={{ textAlignLast: "right" }}
                    value={formData.state}
                    onChange={handleStateChange}
                    disabled={!isEditable}
                  >
                    <option disabled value="">
                      Open to select state
                    </option>
                    {states.map((item) => (
                      <option key={item?.id} value={item?.state}>
                        {item?.state}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{formData.state}</p>
                )}
              </div>
            }
          />
        </div>
        <div>
          <TextInputField
            rightTextValue=""
            type="text"
            label="Requires validation"
            placeholder="Requires validation"
            //   value=""
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            component={
              <div className="w-full flex justify-end">
                <CustomSwitch
                  disabled={!isEditable}
                  checked={formData.req_validate}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      req_validate: e.target.checked,
                    }));
                  }}
                />
              </div>
            }
          />

          <TextInputField
            rightTextValue=""
            value={formData.email}
            name="email"
            type="text"
            label="Email"
            placeholder="Email"
            readOnly={actionType === "add" ? false : true}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            inputClass={actionType === "add" ? "" : "cursor-not-allowed"}
            onChange={handleChange}
          />

          <TextInputField
            rightTextValue=""
            label="Mobile Number"
            placeholder="Mobile Number"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            onChange={handleChange}
            component={
              <div className="flex justify-end w-full">
                {isEditable ? (
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    countryCallingCodeEditable={false}
                    className={`mt-1 block w-auto bg-[#1e252b] rounded-md p-3 max-sm:flex-wrap `}
                    placeholder="Enter phone number"
                    style={{
                      backgroundColor: "#1e252b",
                    }}
                    value={phone}
                    onChange={(value) => {
                      setPhone(value);
                    }}
                    onCountryChange={(v) => {
                      if (v) {
                        setSelectPhoneCountry(v);
                      } else {
                        setSelectPhoneCountry("IN");
                      }
                    }}
                  />
                ) : (
                  <p className="text-white">{phone}</p>
                )}
              </div>
            }
          />

          <TextInputField
            rightTextValue=""
            value={formData.created_on}
            name="created_on"
            type="text"
            label="Added on"
            placeholder="Added on"
            readOnly={true}
            bgColor={"#1e252b"}
            inputClass="cursor-not-allowed"
            className="mb-[15px]"
          />
        </div>
      </div>

      <h3 className="text-[white] text-[24px] mb-2">Bank</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 ">
        <div>
          <TextInputField
            value={formData.bank_account_name}
            name="bank_account_name"
            rightTextValue=""
            type="text"
            label="Bank Account Name"
            placeholder="Bank Account Name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            value={formData.bank_swift}
            name="bank_swift"
            rightTextValue=""
            type="text"
            label="Swift code/IBAN"
            placeholder="Swift code/IBAN"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
        </div>

        <div>
          <TextInputField
            value={formData.account_number}
            name="account_number"
            rightTextValue=""
            type="text"
            label="Account Number"
            placeholder="Account Number"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />

          <TextInputField
            value={formData.bank_address}
            name="bank_address"
            rightTextValue=""
            type="text"
            label="Bank Address"
            placeholder="Bank Address"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
        </div>

        <div>
          <TextInputField
            value={formData.bank_name}
            rightTextValue=""
            type="text"
            label="Bank Name"
            placeholder="Bank Name"
            name="bank_name"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
          />
        </div>
      </div>

      <h3 className="text-[white] text-[24px] mb-2">Management</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 ">
        <div>
          <TextInputField
            rightTextValue=""
            label="Provide estimate in"
            placeholder="Provide estimate in"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            onChange={handleChange}
            component={
              <div className="flex w-full justify-end">
                {isEditable ? (
                  <select
                    name="currency"
                    id="currency"
                    className="bg-[#1e252b]"
                    style={{ textAlignLast: "right" }}
                    value={formData.currency}
                    readOnly={!isEditable}
                    onChange={handleChange}
                  >
                    {currency.map((item, index) => (
                      <option value={item?.value} key={index}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{formData.currency}</p>
                )}
              </div>
            }
          />

          <TextInputField
            value={formData.bank_swift}
            name="bank_swift"
            rightTextValue=""
            type="text"
            label="Year of production"
            placeholder="Year of production"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            component={
              <div className="flex justify-end items-center w-full">
                <YearDropdown
                  disabled={!isEditable}
                  selectedYears={selectedYears}
                  setSelectedYears={setSelectedYears}
                />
              </div>
            }
          />
        </div>

        <div>
          <TextInputField
            value={formData.commission}
            name="commission"
            rightTextValue="%"
            type="text"
            label="Commission (%)"
            placeholder="Commission"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            onChange={handleChange}
          />

          <TextInputField
            label="Timezone"
            placeholder="Timezone"
            bgColor={"#1e252b"}
            className="mb-[15px] text-black dark:text-white"
            component={
              <div className="flex w-full justify-end">
                <select
                  name="timezone"
                  id="timezone"
                  className="bg-[#1e252b] max-xl:max-w-[100px] max-w-[250px]"
                  style={{ textAlignLast: "right" }}
                  value={formData.timezone}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option disabled value="">
                    Open to select timezone
                  </option>
                  {timeZone.map((item, index) => (
                    <option key={index} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </select>
              </div>
            }
          />
        </div>

        <div>
          <TextInputField
            name="swiftCode"
            rightTextValue=""
            type="text"
            label="Supported brands"
            placeholder="Supported brands"
            readOnly={!isEditable}
            bgColor={"#1e252b"}
            className="mb-[15px]"
            onChange={handleChange}
            component={
              <div className="flex justify-end items-center w-full">
                <SupportedBrandsDropdown
                  disabled={!isEditable}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                />
              </div>
            }
          />
        </div>
      </div>

      <AvailabilitySchedule
        availabilitySchedule={availabilitySchedule}
        setAvailabilitySchedule={setAvailabilitySchedule}
        isEditable={isEditable}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        handleClose={() => setConfirmDialogOpen(false)}
        handleConfirm={handleConfirmResetPassword}
        title="Confirm Reset Password"
        content="Are you sure you want to reset the password?"
      />
    </div>
  );
};

export default EstimatorEdit;
