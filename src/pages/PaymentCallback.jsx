/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getData } from "../utils/api";
import Modal from "../components/Modal/Modal";
import { SuccessCheckIcon } from "../assets/SvgIcons";
import { Button } from "../components/forms/Button";
// import loadGif from "src/assets/images/payment-loading.gif";
const PaymentCallBack = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await getData(`/v1/payments/paystack/verify`, {
          reference_code: trxref || reference,
        });

        console.log("result pay :", result);
        if (result.status >= 200 && result.status <= 300) {
          toast.success(result?.message);
          //   navigate("/");
          setShowModalSuccess(true);
        }
      } catch (error) {
        if (
          (error?.response?.data?.status >= 400 &&
            error?.response?.data?.status <= 499 &&
            error?.response?.data?.errors) ||
          (error?.response?.data?.status_code >= 400 &&
            error?.response?.data?.status_code <= 499 &&
            error?.response?.data?.errors)
        ) {
          const errorMessages = Object.values(error?.response?.data?.errors)
            .flat()
            .join(", ");
          toast.error(errorMessages, { duration: 6000 });
        } else {
          toast.error(error?.response?.data?.message, { duration: 6000 });
        }
      }
    };

    verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div className=" w-full h-screen flex items-center justify-center">
      {/* <img className="w-full min-h-10" src={loadGif} alt="payment loading" /> */}
      <div className="payment-loader">
        <div className="pad">
          <div className="chip"></div>
          <div className="line line1"></div>
          <div className="line line2"></div>
        </div>
        <div className="loader-text">
          Please wait while payment verification is loading
        </div>
      </div>

      {showModalSuccess && (
        <Modal
          //   handleModal={handleCancelBooking}
          setShowModal={setShowModalSuccess}
          title="Payment Confirmed"
          //   loading={loadingCancelBooking}
          description="Thank you for using Bookacrib"
          icon={<SuccessCheckIcon />}
          buttons={
            <div className=" flex items-center justify-center flex-wrap gap-4">
              <Button
                className=" w-44 justify-center"
                // onClick={() => handleCancelBooking()}
              >
                Confirm
              </Button>

              {/* <Button
                color="primaryAlt"
                outline
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button> */}
            </div>
          }
        />
      )}
    </div>
  );
};

export default PaymentCallBack;
