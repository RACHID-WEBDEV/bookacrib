import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

const UserSettingSideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="relative col-span-12 xl:col-span-3">
      <div className="sticky top-[104px]">
        <div className="flex flex-col px-5 pt-5 pb-6 box box--stacked">
          <Link
            className={classNames(
              "flex items-center py-3 first:-mt-3 last:-mb-3  hover:text-primary-900 text-sm",
              {
                "text-primary-900":
                  "/user/settings/profile-settings" === currentPath,
              }
            )}
            to="/user/settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-app-window stroke-[1.3] w-4 h-4 mr-3"
            >
              <rect x={2} y={4} width={20} height={16} rx={2} />
              <path d="M10 4v4" />
              <path d="M2 8h20" />
              <path d="M6 4v4" />
            </svg>{" "}
            Profile Info
          </Link>

          <Link
            className={classNames(
              "flex items-center py-3 first:-mt-3 last:-mb-3  hover:text-primary-900 text-sm",
              {
                "text-primary-900":
                  "/user/settings/update-password" === currentPath,
              }
            )}
            to="/user/settings/update-password"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-key-round stroke-[1.3] w-4 h-4 mr-3"
            >
              <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
              <circle cx="16.5" cy="7.5" r=".5" />
            </svg>{" "}
            Change Password
          </Link>
          <Link
            className={classNames(
              "flex items-center py-3 first:-mt-3 last:-mb-3  hover:text-primary-900 text-sm",
              {
                "text-primary-900":
                  "/user/settings/update-profile" === currentPath,
              }
            )}
            to="/user/settings/update-profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-package-check stroke-[1.3] w-4 h-4 mr-3"
            >
              <path d="m16 16 2 2 4-4" />
              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
              <path d="m7.5 4.27 9 5.15" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1={12} x2={12} y1={22} y2={12} />
            </svg>{" "}
            Update Profile
          </Link>

          <Link
            className={classNames(
              "flex items-center py-3 first:-mt-3 last:-mb-3  hover:text-primary-900 text-sm",
              {
                "text-primary-900":
                  "/user/settings/account-deactivation" === currentPath,
              }
            )}
            to="/user/settings/account-deactivation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="lucide lucide-trash2 stroke-[1.3] w-5 h-5 mr-3"
            >
              <path
                d="m18.41 18.09-2.82 2.82M18.41 20.91l-2.82-2.82M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43C7.56 3.99 9.54 2 12 2a4.435 4.435 0 0 1 .16 8.87ZM12 21.81c-1.82 0-3.63-.46-5.01-1.38-2.42-1.62-2.42-4.26 0-5.87 2.75-1.84 7.26-1.84 10.01 0"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Account Deactivation
          </Link>
          <Link
            className={classNames(
              "flex items-center py-3 first:-mt-3 last:-mb-3  hover:text-primary-900 text-sm",
              {
                "text-primary-900":
                  "/user/settings/delete-account" === currentPath,
              }
            )}
            to="/user/settings/delete-account"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash2 stroke-[1.3] w-4 h-4 mr-3"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1={10} x2={10} y1={11} y2={17} />
              <line x1={14} x2={14} y1={11} y2={17} />
            </svg>{" "}
            Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSettingSideBar;
