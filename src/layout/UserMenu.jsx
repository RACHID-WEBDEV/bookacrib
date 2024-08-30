import { Link } from "react-router-dom";
import userMenu from "src/data/userMenu";
// import { useSelector } from "react-redux";
// import { RootState } from "src/functions/Redux/rootReducer";
// import { useDispatch } from "react-redux";
// import { logoutThunk } from "src/functions/Redux/auth/authThunk";

const UserMenu = () => {
  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(logoutThunk());
  // };
  // const { currentUser } = useSelector((state: RootState) => state.auth);
  return (
    <div className="absolute top-10 right-3 transition-all duration-300 ease-in">
      <div className="z-50 my-4 text-base text-left list-none bg-gray-50  rounded shadow ">
        <div className="border-b pb-2 border-gray-400 p-4 px-8">
          <p className=" text-gray-900 font-semibold capitalize">Diy Admin</p>
          <p className="text-sm font-normal text-gray-500 truncate ">
            Admin@mrdiy.com
          </p>
        </div>
        <ul className="py-2 ">
          {userMenu.map(({ link, routeName }, index) => (
            <li key={index} className="">
              <Link
                to={link}
                className="block  py-2 px-8 text-sm text-gray-800 hover:text-gray-900 hover:bg-gray-200"
              >
                {routeName}
              </Link>
            </li>
          ))}
          <li
            className="block  py-2 px-8 text-sm text-gray-800 hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
            // onClick={handleLogout}
          >
            Sign out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
