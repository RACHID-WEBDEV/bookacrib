import { useNavigate, useSearchParams } from "react-router-dom";
import LogoWhite from "../../components/shared/Logo/LogoWhite";
import { ResetPasswordSchema } from "../../schema/authSchema";

import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/forms/Input";
import { Button } from "../../components/forms/Button";
import HookForm from "../../components/forms/Form";

import toast from "react-hot-toast";

import SmallSpinner from "../../components/Loading/SmallSpinner";
import { adminResetPasswordThunk } from "../../Redux/adminAuth/adminAuthThunk";

const AdminResetPassword = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.adminauth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("ts");

  // const userdata = useMemo(
  //   () => ({
  //     email: userEmail,
  //     verification_token: token,
  //   }),
  //   [userEmail, token]
  // );

  console.log(error);
  // toast.error(error);
  const onSubmit = async (data) => {
    const filteredFormData = {
      token: token,
      password: data?.password,
      password_confirmation: data?.password_confirmation,
    };
    console.log("reset form data:", filteredFormData);
    try {
      const result = await dispatch(
        adminResetPasswordThunk(filteredFormData)
      ).unwrap();
      console.log("reset password", result);
      if (result.status >= 200 && result.status <= 300) {
        navigate("/admin/login");
      }
    } catch (error) {
      if (error?.status >= 400 && error?.status <= 499) {
        // const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(error.message, { duration: 6000 });
      }
    }
  };
  // alert(JSON.stringify(data));
  // dispatch(loginThunk(data));

  return (
    <div className="m-auto pt-4 lg:pt-20 xl:container px-1 lg:px-12 sm:px-0 mx-auto">
      <div className="mx-auto h-full max-w-lg">
        <div className="m-auto py-12">
          <div className="bg-gray-900 p-4 py-5 space-y-4">
            <LogoWhite />
          </div>
          <div className=" border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 px-4 lg:px-6 py-8 sm:py-10">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Admin Password Reset
            </h3>
            <h3 className="text-base pt-3 text-gray-500 ">
              Get Back into Your Account! Enter a new password
            </h3>

            <div className="max-w-lg pt-6">
              <HookForm onSubmit={onSubmit} schema={ResetPasswordSchema}>
                <Input
                  name="password"
                  // label="Password"
                  type="password"
                  placeholder="Password"
                />
                <Input
                  name="password_confirmation"
                  // label="Password"
                  type="password"
                  placeholder="Confirm Password"
                />

                <Button
                  type="submit"
                  size="lg"
                  //   disabled={loading}
                  className="w-full justify-center"
                >
                  {loading ? (
                    <div className="inline-flex items-center gap-3">
                      <SmallSpinner />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    " Reset Password"
                  )}
                </Button>
              </HookForm>

              {/* <p className="text-right text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/login" className=" text-primary-700 font-medium">
                  Login
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResetPassword;
