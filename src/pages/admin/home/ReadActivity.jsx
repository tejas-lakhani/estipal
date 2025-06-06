import { Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services";
import { extractImageUrls, formatNumberOrDefault } from "../../../utils";
import CardData from "./components/CardData";
import SellerCardData from "./components/SellerCardData";

import { useTranslate } from "../../../language";

const ReadActivity = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { translate } = useTranslate();
  const { id, watch_id } = params;
  const [readActivityData, setReadActivityData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const userRole = localStorage.getItem("userRole");

  const getDetailById = async () => {
    try {
      const response = await axiosInstance.get(
        `/adminActivity/detail?watch_id=${watch_id}&id=${id}`
      );
      setReadActivityData(response?.payload?.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAdminGroupInfo = (adminGroup, userId) => {
    const groups = {
      staff: { label: "Staff", prefix: "UCA" },
      seller: { label: "Seller", prefix: "SCA" },
      estimator: { label: "Estimator", prefix: "ECA" },
    };

    const group = groups[adminGroup] || groups.estimator;
    return `${group.label} - ID: ${group.prefix}${userId}`;
  };

  const getImageSrc = (image, type) => {
    let imageArray;
    try {
      imageArray = extractImageUrls(image);
    } catch (e) {
      imageArray = [];
    }
    if (imageArray.length === 0) return "";
    const uriSegments = imageArray[0].split("/");
    if (uriSegments[2] && window.location.host === uriSegments[2]) {
      return imageArray[0];
    } else if (uriSegments[5] === "bg_remove_upload_images") {
      return imageArray[0];
    } else if (type === "rejected") {
      return imageArray[0].startsWith("http")
        ? imageArray[0]
        : `/bg_remove_upload_images/${imageArray[0]}`;
    } else {
      return imageArray[0].startsWith("http")
        ? imageArray[0]
        : `/upload_images/${imageArray[0]}`;
    }
  };

  const getPrice = (watchDetails, currencyUnit) => {
    if (watchDetails?.accepted_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails?.accepted_price
      )}`;
    } else if (watchDetails?.estimated_price_admin) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails?.estimated_price_admin
      )}`;
    } else if (watchDetails?.admin_counter_offer_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails?.admin_counter_offer_price
      )}`;
    } else if (watchDetails?.seller_view_request_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails?.seller_view_request_price
      )}`;
    } else if (watchDetails?.request_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails?.request_price
      )}`;
    } else if (watchDetails?.seller_display_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails?.seller_display_price
      )}`;
    } else if (watchDetails?.seller_request_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails?.seller_request_price
      )}`;
    } else if (watchDetails?.admin_converted_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails?.admin_converted_price
      )}`;
    } else {
      return "N/A";
    }
  };

  const getSellerPrice = (watchDetails, currencyUnit) => {
    if (watchDetails?.seller_display_accept) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails.seller_display_accept
      )}`;
    } else if (watchDetails?.estimated_price_seller) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails.estimated_price_seller
      )}`;
    } else if (watchDetails?.seller_display_counter) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails.seller_display_counter
      )}`;
    } else if (watchDetails?.seller_view_request_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails.seller_view_request_price
      )}`;
    } else if (watchDetails?.seller_display_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails.seller_display_price
      )}`;
    } else if (watchDetails?.seller_request_price) {
      return `${currencyUnit} ${formatNumberOrDefault(
        watchDetails.seller_request_price
      )}`;
    } else if (watchDetails?.price) {
      return `${currencyUnit} ${formatNumberOrDefault(watchDetails.price)}`;
    } else {
      return [];
    }
  };

  useEffect(() => {
    getDetailById();
  }, []);

  return (
    <div className="pb-[15px] min-h-[100vh]">
      <div
        className={`${
          userRole === "staff" ? "pt-8" : "pt-6"
        } flex justify-between items-center mb-[30px] px-[20px] flex-wrap gap-5 dark:bg-none bg-gradient-to-b from-[rgba(0,96,169,0.36)] to-[rgba(255,255,255,0)]`}
      >
        {isLoading ? (
          <Skeleton variant="text" width={300} height={40} />
        ) : (
          <h3 className="dark:text-white text-black text-[21px]">
            Message History - ID W{readActivityData?.watch_id} :{" "}
            {readActivityData?.watch_details?.brand},{" "}
            {readActivityData?.watch_details?.collection},{" "}
            {readActivityData?.watch_details?.model_no}{" "}
            {readActivityData?.watch_details?.model_desc && "("}
            {readActivityData?.watch_details?.model_desc}
            {readActivityData?.watch_details?.model_desc && ")"}
          </h3>
        )}

        {isLoading ? (
          <Skeleton variant="rectangular" width={200} height={40} />
        ) : (
          <Button
            variant="contained"
            className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
            onClick={() =>
              navigate(
                `/admin/watch_details/watch_status/${readActivityData?.watch_id}`
              )
            }
          >
            {translate("VIEWWATCHDETAILS")}
          </Button>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start px-[20px]">
        <div className="flex-[1] mb-4 md:mb-0">
          {isLoading ? (
            <Skeleton variant="rectangular" width={350} height={350} />
          ) : (
            <img
              alt="img"
              className="max-w-[350px] w-full object-cover mx-auto rounded-[8px]"
              style={{ border: "5px solid #1e252b" }}
              src={readActivityData?.watch_pic?.[0]}
            />
          )}
        </div>
        <div className="md:ml-8 w-full flex-[2]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="rectangular" width="100%" height={60} />
              </>
            ) : (
              <>
                <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                  <p className="dark:text-white text-black">
                    {translate("ID")}
                  </p>
                  <p className="dark:text-white text-black">
                    W{readActivityData?.watch_id}
                  </p>
                </div>
                <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                  <p className="dark:text-white text-black">
                    {translate("BRAND")}
                  </p>
                  <p className="dark:text-white text-black">
                    {readActivityData?.watch_details?.brand}
                  </p>
                </div>
                <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex gap-[20px] justify-between border border-gray-300 dark:border-none">
                  <p className="dark:text-white text-black">
                    {translate("COLLECTION")}
                  </p>
                  <p className="dark:text-white text-black items-end">
                    {readActivityData?.watch_details?.collection}
                  </p>
                </div>
                <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between gap-[20px] border border-gray-300 dark:border-none">
                  <p className="dark:text-white text-black">
                    {translate("MODEL")}
                  </p>
                  <p className="dark:text-white text-black whitespace-nowrap overflow-x-auto hide-scrollbar">
                    {readActivityData?.watch_details?.model_no}{" "}
                    {readActivityData?.watch_details?.model_desc &&
                      `(${readActivityData?.watch_details?.model_desc})`}
                  </p>
                </div>
                <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                  <p className="dark:text-white text-black">
                    {translate("SERIALNUMBER")}
                  </p>
                  <p className="dark:text-white text-black">
                    {readActivityData?.watch_details?.serial_no}
                  </p>
                </div>
                <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                  <p className="dark:text-white text-black">
                    {translate("ESTIMATE")}
                  </p>
                  <p className="text-[#11c71e] font-bold">
                    {userRole !== "staff"
                      ? getPrice(
                          readActivityData?.watch_details,
                          readActivityData?.currency
                        )
                      : getSellerPrice(
                          readActivityData?.watch_details,
                          readActivityData?.currency
                        )}
                  </p>
                </div>

                {userRole !== "staff" && (
                  <div className="dark:bg-[#1e252b] bg-white py-[12px] px-[24px] rounded items-center flex justify-between border border-gray-300 dark:border-none">
                    <p className="dark:text-white text-black">
                      Estimator suggested wholesale price
                    </p>
                    <p className="dark:text-white text-black">
                      {readActivityData?.assignWatchDetails?.[0]
                        ?.suggest_retail_price
                        ? `${readActivityData?.currency} ${Number(
                            readActivityData?.assignWatchDetails?.[0]
                              ?.suggest_retail_price
                          ).toFixed(2)}`
                        : "0.00"}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{ marginTop: "50px" }}
        />
      ) : (
        readActivityData?.adminActivities?.reverse()?.map((item, index) =>
          userRole !== "staff" ? (
            <div className="px-[20px]">
              <CardData
                key={index}
                item={item}
                index={index}
                userRole={userRole}
                adminActivitiesData={readActivityData?.adminActivities}
                currency={readActivityData?.currency}
                getDetailById={getDetailById}
              />
            </div>
          ) : (
            <div className="px-[20px]">
              <SellerCardData
                key={index}
                item={item}
                index={index}
                userRole={userRole}
                adminActivitiesData={readActivityData?.adminActivities}
                currency={readActivityData?.currency}
                getDetailById={getDetailById}
              />
            </div>
          )
        )
      )}
    </div>
  );
};

export default ReadActivity;
