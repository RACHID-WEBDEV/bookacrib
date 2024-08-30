import EmptyImage from "src/assets/images/404-light.svg";

import { Link } from "react-router-dom";
import { Button } from "../components/forms/Button";

const NotFound = () => {
  return (
    <div className="  w-full h-full flex flex-col items-center justify-center space-y-6 pb-40">
      <div className="relative pt-12 ">
        <h2 className="text-[280px] text-gray-300 font-bold ">404</h2>
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-[-40%] ">
          <img src={EmptyImage} alt="error" className="w-44 h-44" />
        </div>
      </div>
      <div className="!-mt-4">
        <p className="text-base text-gray-600 max-w-lg text-center ">
          The page you are looking for doesn’t exist or has been moved. Please
          go back to homepage
        </p>
      </div>
      <Link to="/">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
