import moment from "moment";
import React from "react";
import { getSubject } from "./GetSubject";
import BePartner from "./statusComponents/BePartner";
import ConfirmShipmentEstipal from "./statusComponents/ConfirmShipmentEstipal";
import ConfirmSold from "./statusComponents/ConfirmSold";
import ConfirmTheAcceptance from "./statusComponents/ConfirmTheAcceptance";
import ConfirmTheSale from "./statusComponents/ConfirmTheSale";
import EstimatorRquiedValidation from "./statusComponents/EstimatorRquiedValidation";
import SellerInvoice from "./statusComponents/SellerInvoice";
import SellerInvoiceNew from "./statusComponents/SellerInvoiceNew";
import EstimatorMultiQuotation from "./statusComponents/EstimatorMultiQuotation";
import { sellerGetSubject } from "./SellerGetSubject";

const SellerCardData = (props) => {
  const { item, index, userRole, adminActivitiesData, currency } = props;

  let accepted_price = "";
  let accepted_price_with_commission = "";
  let price_for_seller = "";
  let confirmed_price = "";
  let input_confirmed_price = "";
  let confirm_the_sale_flag = "";
  let commission_price = "";

  if (item?.type !== "confirm_sold") {
    const watchDetails = item?.watch_details || {};
    if (watchDetails.seller_display_accept) {
      accepted_price = `${currency} ${Number(watchDetails.seller_display_accept)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails.estimated_price_seller) {
      accepted_price = `${currency} ${Number(
        watchDetails.estimated_price_seller
      )
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails.seller_display_counter) {
      accepted_price = `${currency} ${Number(
        watchDetails.seller_display_counter
      )
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails.seller_view_request_price) {
      accepted_price = `${currency} ${Number(
        watchDetails.seller_view_request_price
      )
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails.seller_display_price) {
      accepted_price = `${currency} ${Number(watchDetails.seller_display_price)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails.seller_request_price) {
      accepted_price = `${currency} ${Number(watchDetails.seller_request_price)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else if (watchDetails.price) {
      accepted_price = `${currency} ${Number(watchDetails.price)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    }

    accepted_price_with_commission = watchDetails.accepted_price_with_commission
      ? `${currency} ${Number(watchDetails.accepted_price_with_commission)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
      : accepted_price;

    price_for_seller = watchDetails.price_for_seller
      ? `${currency} ${Number(watchDetails.price_for_seller)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
      : accepted_price;

    if (watchDetails.confirmed_price) {
      confirmed_price = `${currency} ${Number(watchDetails.confirmed_price)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
      input_confirmed_price = watchDetails.confirmed_price;
    }

    confirm_the_sale_flag = watchDetails.confirm_the_sale_flag || "";

    commission_price = watchDetails.commission_price
      ? `${currency} ${Number(watchDetails.commission_price)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
      : "";
  }

  let prefix = "SCA";
  if (item?.admin_group === "estimator") {
    prefix = "ECA";
  } else if (item?.admin_group === "staff") {
    prefix = "UCA";
  }

  const watchDetails = item?.watch_details || {};
  const { brand, collection, model_no, serial_no } = watchDetails;

  const getWatchDetails = () =>
    `${brand || ""} ${collection || ""} ${model_no || ""} ${serial_no || ""}`;

  const renderMessageBox = () => {
    const commonProps = {
      item,
      accepted_price,
      confirmed_price,
      commission_price,
      accepted_price_with_commission,
      sold_price: "",
      input_confirmed_price,
      input_sold_price: "",
      input_price_for_seller: "",
      price_for_seller,
      confirm_the_issuing_of_invoice_flag: "",
      adminActivitiesData,
      currency,
    };
    switch (item?.type) {
      case "accept_estimation":
      case "est_counter_offer_accept":
        return (
          <>
            <h3 className="up-arrow">
              <span></span>
              {item?.message} ({accepted_price})
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </>
        );
      case "estimator_quotation":
      case "counter_offer_1":
      case "est_re-estimate":
      case "counter_offer_2":
        return (
          <>
            <h3>
              {item?.message} ({accepted_price})
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </>
        );
      case "Be-Partner":
        return <BePartner {...commonProps} />;
      case "confirm_selling_price":
        return (
          <>
            <h3>
              The selling price of {confirmed_price} has been confirmed to the
              Seller. Sale is pending.
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </>
        );
      case "confirm_the_sale":
        return <ConfirmTheSale {...commonProps} />;
      case "confirm_the_issuing_of_invoice":
        return (
          <div className="message_box_inner">
            <h3>{`Invoice for the amount of ${commission_price} has been issued to Seller.`}</h3>
            <h3>{`Status: ${item?.watch_status}`}</h3>
          </div>
        );
      case "no_sale_has_been_made":
        return (
          <div className="message_box_inner">
            <h3>{item?.message}</h3>
            <h3>{`Status: ${item?.watch_status}`}</h3>
          </div>
        );
      case "seller_invoice_new":
        return <SellerInvoiceNew {...commonProps} />;
      case "seller_invoice":
        return <SellerInvoice {...commonProps} />;

      case "confirm_payment_seller":
        return (
          <div className="message_box_inner">
            <h3>{`The payment of ${accepted_price_with_commission} to the seller has been confirmed. Shipment of the watch is pending.`}</h3>
            <h3>{`Status: ${item?.watch_status}`}</h3>
          </div>
        );
      case "confirm_shipment_estipal":
        return <ConfirmShipmentEstipal {...commonProps} />;
      case "confirm_the_acceptance":
        return <ConfirmTheAcceptance {...commonProps} />;
      case "return_to_seller":
        return (
          <div className="message_box_inner">
            <h3>
              The sale has been rejected. The watch has to be returned to the
              Seller.
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </div>
        );
      case "confirm_sold":
        return <ConfirmSold {...commonProps} />;
      case "confirm_paid_estimator":
        return (
          <div className="message_box_inner">
            <h3>
              {"Commissions to estimator has been paid ("}
              {currency} {item?.estimator_watch_revenue?.toFixed(2)})
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </div>
        );
      case "admin_notify_est_quotation":
        return (
          <div className="message_box_inner">
            <h3>
              {item?.message} ({accepted_price})
            </h3>
            <h3>Status: N/A</h3>
          </div>
        );
      case "estimator_rquied_validation":
        return <EstimatorRquiedValidation {...commonProps} />;
      case "estimator_multi_quotation":
        return <EstimatorMultiQuotation {...commonProps} />;
      default:
        return (
          <div className="message_box_inner">
            <h3>
              {item?.message} ({accepted_price})
            </h3>
            <h3>Status: {item?.watch_status}</h3>
          </div>
        );
    }
  };

  const renderFrom = () => {
    if (
      item?.admin_group === "Estipal-Automated message" ||
      item?.admin_group === "Estipal-Administrator"
    ) {
      return (
        <h3 className="mb-3 capitalize">
          <strong>From: </strong>
          {item?.from_name}
        </h3>
      );
    } else if (
      item?.type === "estimation_rejected" &&
      item?.watch_details?.admin_action
    ) {
      return (
        <h3 className="mb-3 capitalize">
          <strong>From: </strong>
          Estipal Admin
        </h3>
      );
    } else if (
      item?.type === "estimation_rejected" &&
      item?.watch_details?.estipal_auto
    ) {
      return (
        <h3 className="mb-3 capitalize">
          <strong>From: </strong>
          Estipal-Automated message
        </h3>
      );
    } else if (
      item?.type === "estimation_expired" ||
      item?.type === "staff_response_time_expired"
    ) {
      return (
        <h3 className="mb-3 capitalize">
          <strong>From: </strong>
          Estipal response time limit rule
        </h3>
      );
    } else {
      return (
        <h3 className="mb-3 capitalize">
          <strong className="font-bold">From: </strong>

          {`${item?.company_name ?? ""} - ${item?.from_name ?? ""} `}
          <b className="font-bold">
            {`( ${item?.admin_group} - ID: ${prefix}${item?.user1_id} )`}
          </b>
        </h3>
      );
    }
  };

  return (
    <div
      key={index}
      className="mt-5 dark:bg-[#1E252B] bg-[#F8F8F8] dark:text-white text-black p-6 rounded-lg dark:shadow-lg shadow-none border border-gray-300 dark:border-none"
      style={{ border: "1px solid #ccc" }}
    >
      <div className="border_bottom pb-4">
        {sellerGetSubject(
          item,
          accepted_price,
          getWatchDetails,
          confirmed_price,
          commission_price,
          accepted_price_with_commission,
          ""
        )}
        <div className="flex justify-between items-center flex-wrap">
          {renderFrom()}
          <h3 className="mb-3">
            <strong className="font-bold">Received: </strong>
            <span className="created_at">
              {moment.unix(item?.created_on).format("MMMM DD , YYYY h:mm A")}
            </span>
          </h3>
        </div>
      </div>
      <hr
        className="my-5"
        style={{
          borderTopColor: userRole === "staff" ? "#DFDFDF" : "#ffffff1a",
          borderTopWidth: "2px",
        }}
      />
      <div className="message_box_inner">{renderMessageBox()}</div>
    </div>
  );
};

export default SellerCardData;
