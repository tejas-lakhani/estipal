// checked

import React, { useState } from "react";
import UrgentImage from "../../../../../assets/images/icons/Urgent 1.png";
import axiosInstance from "../../../../../services";
import { toast } from "react-hot-toast";
import ConfirmDialog from "../../../../../components/common/ConfirmDialog";

const ConfirmTheSale = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const confirmedPrice = props?.input_confirmed_price
    ? props?.input_confirmed_price
    : props?.price_for_seller;

  const handleConfirmIssuingOfInvoice = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        `/adminActivity/confirmTheIssuingOfInvoice?watch_id=${
          props?.item?.watch_details?.watch_id || props?.item?.watch_id
        }`,
        {
          confirmed_price: confirmedPrice,
        }
      );
      // toast.success(response?.message);
      toast.success("Invoice issued successfully!");
      props.getDetailById();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      setDialogOpen(false);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <h3>
        The sale has been confirmed by the Seller. Invoice for the amount of{" "}
        {props?.commission_price} can be issued to the Seller.
      </h3>
      <h3>Status: {props?.item?.watch_status}</h3>
      <div className="select_box text-center mt-20">
        <div className="select_box_inner !max-sm:p-[10px]">
          <p className="flex max-sm:flex-col items-center justify-center gap-[10px] mb-[10px]">
            <span>
              <img
                src={UrgentImage}
                alt="Urgent"
                className="w-[40px] block mx-auto"
              />
            </span>
            <span className="pending_status">Pending Action:</span>
            <span>Confirmation is required</span>
          </p>
          <ul className="flex gap-3 flex-wrap justify-center items-center">
            <li
              id="confirmTheIssuingOfInvoice"
              name={props?.item?.watch_details?.watch_id}
              value={props?.item?.user1_id}
              className={
                props?.confirm_the_issuing_of_invoice_flag ? "inactiveLink" : ""
              }
            >
              <button
                className={`btn ${
                  props?.confirm_the_issuing_of_invoice_flag
                    ? "dark_green"
                    : "dark_yellow"
                }`}
                onClick={handleOpenDialog}
                disabled={
                  isLoading || props?.confirm_the_issuing_of_invoice_flag
                }
              >
                {isLoading ? "Processing..." : "Confirm the issuing of invoice"}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ConfirmDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmIssuingOfInvoice}
        title="Confirm Issuing of Invoice"
        content="Are you sure you want to confirm the issuing of the invoice?"
        loading={isLoading}
      />
    </>
  );
};

export default ConfirmTheSale;
