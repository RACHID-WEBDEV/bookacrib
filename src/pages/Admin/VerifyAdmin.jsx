/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { adminAccountVerificationThunk } from "../../Redux/adminAuth/adminAuthThunk";

const VerifyAdmin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const token = searchParams.get("ts");
  // const userEmail = searchParams.get("email");

  const admindata = useMemo(
    () => ({
      // email: userEmail,
      ts: token,
    }),
    [token]
  );

  useEffect(() => {
    const verifyAdminAccount = async () => {
      try {
        const result = await dispatch(
          adminAccountVerificationThunk(admindata)
        ).unwrap();
        console.log("verify admin:", result);
        if (result.status >= 200 && result.status <= 300) {
          navigate("/admin/login");
        }
      } catch (error) {
        if (error?.status >= 400 && error?.status <= 499) {
          toast.error(error.message, { duration: 6000 });
          navigate("/admin/resend-verification-link");
        } else {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred.");
        }
      }
    };

    verifyAdminAccount();
  }, [dispatch]);

  return (
    <div className="w-screen h-screen  flex items-center justify-center">
      {/* <p className="text-2xl">This is a Verify User Page</p> */}
      <span className="loader"></span>
    </div>
  );
};

export default VerifyAdmin;
