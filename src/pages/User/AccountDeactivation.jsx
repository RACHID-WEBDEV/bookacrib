/* eslint-disable no-unused-vars */
// import banner from "src/assets/images/profile-banner.png";
import profilavatar from "src/assets/images/user-profile-avatar.png";
import HookForm from "../../components/forms/Form";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/forms/Button";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
// import { UpdateUserSchema } from "../../schema/authSchema";
// import { useSelector } from "react-redux";
import { getData, postData, putData } from "../../utils/api";
import toast from "react-hot-toast";
import { EmptySchema } from "../../schema/authSchema";
import { useEffect, useRef, useState } from "react";
import ErrorStatus from "../../components/forms/ErrorStatus";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import UserSettingSideBar from "./UserSettingSideBar";
import SmallSpinner from "../../components/Loading/SmallSpinner";
import OtpInput from "../../components/forms/OtpInput";
import { logoutThunk } from "../../Redux/auth/authThunk";
import { useDispatch } from "react-redux";
const AccountDeactivation = () => {
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  let currentOTPIndex = 0;
  const [otp, setOtp] = useState(new Array(6).fill("")); // Stores the actual OTP values
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  // const [loading, setLoading] = useState(false);
  //   console.log("otp:", otp);
  const inputRef = useRef();

  const handleOnChange = ({ target }) => {
    const { value } = target;
    const newOTP = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1); // Only keep the last digit typed

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);
  };

  const handleOnKeyDown = (e, index) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default backspace behavior
      setOtp((prev) => {
        const newOTP = [...prev];
        newOTP[index] = ""; // Clear the current value
        return newOTP;
      });
      setActiveOTPIndex(currentOTPIndex - 1); // Move focus to the previous index
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  // console.log("optNumber", token);
  ////OTP IMPLEMENTATION ENDS//

  /// COUNT DOWN ////

  const timeInterval = 2 * 60; //  minutes * seconds
  const [seconds, setSeconds] = useState(timeInterval);

  useEffect(() => {
    let intervalId;

    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [seconds]);

  // const [seconds, setSeconds] = useState(60);

  // useEffect(() => {
  //   let intervalId: any;

  //   if (seconds > 0) {
  //     intervalId = setInterval(() => {
  //       setSeconds((prevSeconds) => prevSeconds - 1);
  //     }, 1000);
  //   }

  //   return () => clearInterval(intervalId);
  // }, [seconds]);

  const token = Number(otp.join(""));

  const [loading, setLoading] = useState(false);

  const onPressDeactivate = async () => {
    setLoading(true);
    try {
      const result = await postData(
        `/v1/users/accounts/deactivate-request`,
        ""
      );
      // console.log("DEACTIVATE___::", result);
      if (result.status >= 200 && result.status <= 300) {
        toast.success(result.message);
      }
    } catch (error) {
      const errorData = error?.response?.data;
      const errorMessages =
        errorData?.errors && Object.values(errorData.errors).flat().join(", ");

      toast.error(
        errorMessages || errorData?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
      // SheetRef?.current?.hide();
    }
  };

  const onPressResendOtp = async () => {
    setLoading(true);

    setOtp("");

    try {
      const result = await postData(
        `/v1/users/accounts/deactivate-request`,
        ""
      );

      if (result.status >= 200 && result.status <= 300) {
        toast.success(result.message);
        setSeconds(5 * 60); //5 minutes
      }
    } catch (error) {
      const errorData = error?.response?.data;
      const errorMessages =
        errorData?.errors && Object.values(errorData.errors).flat().join(", ");
      toast.error(
        errorMessages || errorData?.message || "Something went wrong"
      );
      // Toast.show({
      //   type: "error",
      //   text1: "Deactivate Account Error",
      //   text2: errorMessages || errorData?.message || "Something went wrong",
      // });
    } finally {
      setLoading(false);
    }
  };
  const onPressVerifyOtp = async () => {
    setLoading(true);
    setOtp("");

    const userOtp = {
      otp: otp,
      // email: userEmail,
    };
    try {
      const result = await postData(
        `/v1/users/accounts/deactivate-confirm`,
        userOtp
      );
      console.log("Dactivate otp::", result);
      if (result.status >= 200 && result.status <= 300) {
        toast.success(result.message);
        await dispatch(logoutThunk()).unwrap();
        // await removeUserDetail(ACCESS_TOKEN);

        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: StackNav.Auth }],
        // });
      }
    } catch (error) {
      const errorData = error?.response?.data;
      const errorMessages =
        errorData?.errors && Object.values(errorData.errors).flat().join(", ");

      toast.error(
        errorMessages || errorData?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="relative">
        <div className=" py-2 pl-2 z-40">
          <h1 className="text-lg font-semibold text-gray-900 ">
            Account Deactivation
          </h1>
          <p className="text-slate-500 text-xs md:text-sm font-normal">
            Deactivate your account if you notice any suspicious activity.
          </p>
        </div>
        <div className="px-0 mt-0">
          <div className="container">
            <div className="grid grid-cols-12 gap-y-10 gap-x-6">
              <div className="col-span-12">
                <div className="mt-3.5 grid grid-cols-12 gap-y-10 gap-x-6">
                  <UserSettingSideBar />
                  <div className="flex relative flex-col col-span-12 xl:col-span-9 gap-y-7">
                    <div className="sticky top-[104px]">
                      <div className="p-1.5  flex flex-col  pb-6 box box--stacked">
                        <div className=" md:px-3  mt-6 md:mt-0 mb-10">
                          <div className="p-6  bg-white dark:bg-slate-900 mt-6">
                            <h5 className="text-lg font-bold mb-0 text-primary-900">
                              Account Deactivation:
                            </h5>
                            <p className="text-slate-500 mb-4">
                              Are you sure you want to deactivate your account?
                              Please click the{" "}
                              <span className=" font-semibold">
                                &quot;Deactivate&quot;
                              </span>{" "}
                              button below to proceed.
                              {/* Are you sure you want to deactivate your account?
                              Please press below &quot;Deactivate&quot; button
                              to get started */}
                            </p>
                            <div className="">
                              <Button size="sm">Deactivate</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-[400px] pt-4">
                      <form onSubmit={onPressVerifyOtp} className="space-y-4">
                        <div className=" relative">
                          <OtpInput
                            otp={otp}
                            activeOTPIndex={activeOTPIndex}
                            inputRef={inputRef}
                            handleOnChange={handleOnChange}
                            handleOnKeyDown={handleOnKeyDown}
                            label="Enter Verification Code"
                          />
                          <div className=" absolute right-0 -bottom-9">
                            <p className="text-right  text-primary-700 font-medium mt-1">
                              <span
                                className={classNames(
                                  {
                                    "opacity-50":
                                      seconds >= 1 && seconds <= timeInterval,
                                  },
                                  { "opacity-0": seconds === 0 }
                                )}
                              >
                                Resend Code in{" "}
                              </span>
                              <span
                              //
                              //onClick={handleResendVerification}
                              >
                                {seconds === 0 ? (
                                  //   <Link to="/resend-verification">Resend Code</Link>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setOpenModal(true);
                                    }}
                                  >
                                    Resend Code
                                  </span>
                                ) : (
                                  <span>
                                    {/* 00:
                      {seconds <= 9 && "0"}
                      {seconds} */}
                                    {Math.floor(seconds / 60)
                                      .toString()
                                      .padStart(2, "0")}
                                    :
                                    {(seconds % 60).toString().padStart(2, "0")}
                                  </span>
                                )}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="pt-10">
                          <Button
                            type="submit"
                            size="md"
                            disabled={loading}
                            className="w-full justify-center "
                          >
                            {loading ? (
                              <div className="inline-flex items-center gap-3">
                                <SmallSpinner />
                                <span>Loading...</span>
                              </div>
                            ) : (
                              "Continue "
                            )}
                          </Button>
                        </div>

                        {/* <Button
            type="submit"
            size="md"
            disabled={loading}
            className="w-full justify-center"
          >
            {loading ? (
              <div className="inline-flex items-center gap-3">
                <SmallSpinner />
                <span>Loading...</span>
              </div>
            ) : (
              "Verify Account"
            )}
          </Button> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDeactivation;
