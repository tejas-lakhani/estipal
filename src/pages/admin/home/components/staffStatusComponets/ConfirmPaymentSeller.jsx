import { t } from "i18next";
import React from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";

const ConfirmPaymentSeller = (props) => {
  return (
    <div className="message_box_inner">
      {/* 157 */}
      <h3>
        {t("CONFIRMPAYMENTSELLERONE").replace(
          "{props?.accepted_price_with_commission}",
          props?.accepted_price_with_commission
        )}
      </h3>
      {/* 131 */} {/* 158 */}
      <h3>{t("STATUS")}: {t("PAIDPENDINGSHIPPING")}</h3>
      <div className="select_box text-center mt-20">
        <div className="select_box_inner !max-sm:p-[10px] white_select_box_inner">
          <p className="flex max-sm:flex-col items-center justify-center gap-[10px] mb-[10px]">
            <span>
              <img
                src={UrgentImage}
                alt="Urgent"
                className="w-[40px] block mx-auto"
              />
            </span>
            {/* 139 */}
            <span className="pending_status">{t("PENDINGACTION")}:</span>
            {/* 159 */}
            <span>{t("CONFIRMATIONREQUIREDTEXT")}</span>
          </p>
          <ul className="flex gap-3 flex-wrap justify-center items-center">
            <li
              id="confirmShipmentToEstipal"
              name={props?.item?.watch_details?.watch_id}
              value={props?.item?.user1_id}
              className={
                props?.item?.staffWatchActivityDetails?.confirm_shipping === 1
                  ? "inactiveLink"
                  : ""
              }
            >
              <button
                className={`btn ${props?.item?.staffWatchActivityDetails?.confirm_shipping === 1
                  ? "bg-[#006400] !border-none"
                  : "dark_yellow"
                  }`}
              >
                {/* 160 */}
                {t("CONFIRMSHIPMENTESTIPALTEXT")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPaymentSeller;
