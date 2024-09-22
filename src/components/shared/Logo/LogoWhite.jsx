/* eslint-disable react/prop-types */
import logo from "src/assets/images/bookacrib-logo-white.svg";

import { Link } from "react-router-dom";

const LogoWhite = ({ className }) => {
  return (
    <Link to="/" className={` ${className}`}>
      <img
        // className=" h-8 sm:h-10 w-auto "
        src={logo}
        alt="Logo"
        sizes="200px"
      />
    </Link>
  );
};

export default LogoWhite;
