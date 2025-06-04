/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { postData } from "../utils/api";
import Modal from "../components/Modal/Modal";
import { ErrorIcon, SuccessCheckIcon } from "../assets/SvgIcons";
import { Button } from "../components/forms/Button";
// import loadGif from "src/assets/images/payment-loading.gif";
const DeleteAccount = () => {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await postData(`/v1/users/accounts/deletion-confirm`, {
          ts: trxref || reference,
        });

        console.log("result delete account :", result);
        if (result.status >= 200 && result.status <= 300) {
          toast.success(result?.message);
          // navigate("/");
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
          // console.log("Payment Error", errorMessages);
          setErrMsg(errorMessages);
          setShowModalError(true);
        } else {
          toast.error(error?.response?.data?.message, { duration: 6000 });
          console.log("Payment Error:", error?.response?.data?.message);
          setErrMsg(error?.response?.data?.message);
          setShowModalError(true);
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
        <div className="loader-text">Deleting Account, please wait...</div>
      </div>

      {showModalSuccess && (
        <Modal
          //   handleModal={handleCancelBooking}
          setShowModal={setShowModalSuccess}
          title="Account Deleted Successfully"
          //   loading={loadingCancelBooking}
          // description="Thank you for using Bookacrib "
          description="Your account has been deleted. Thank you for being a part of Bookacrib — we hope to see you again someday."
          icon={<SuccessCheckIcon />}
          buttons={
            <div className=" flex items-center justify-center flex-wrap gap-4">
              <Link to="/">
                <Button
                  className=" w-44 justify-center"
                  // onClick={() => handleCancelBooking()}
                >
                  Close Message
                </Button>
              </Link>

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

      {showModalError && (
        <Modal
          //   handleModal={handleCancelBooking}
          setShowModal={setShowModalError}
          title="Error Deleting Account"
          //   loading={loadingCancelBooking}
          // description="Thank you for using Bookacrib "
          description={errMsg || "Error Try again later"}
          icon={<ErrorIcon className=" size-12" />}
          buttons={
            <div className=" flex items-center justify-center flex-wrap gap-4">
              <Link to="/">
                <Button
                  className=" w-44 justify-center"
                  // onClick={() => handleCancelBooking()}
                >
                  Close Message
                </Button>
              </Link>

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

export default DeleteAccount;
