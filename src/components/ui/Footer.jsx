import classNames from "classnames";
// import Logo from "../shared/Logo/Logo";
// import google from "src/assets/images/product/googleplay.svg";
// import apple from "src/assets/images/product/app-store.svg";
import {
  Facebook,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "../../assets/SvgIcons";
import { Link } from "react-router-dom";
import { footer, partner } from "../../data/footer";

const Footer = () => {
  return (
    <>
      <div className="px-4 bg-gray-50 mt-20">
        <div id="footer" className="lg:px-10 xl:px-14">
          <footer className="hidden lg:block  pt-16 border-t border-gray-100 text-gray-500 ">
            <div className="grid grid-cols-4 lg:grid-cols-5 gap-6 md:gap-0">
              <div className="col-span-4 pt-10 lg:py-0">
                <div className="grid  grid-cols-2 lg:grid-cols-4 gap-6 lg:pb-16  ">
                  {footer.columns.map(({ title, links, hideMobile }, index) => (
                    <div
                      key={index}
                      className={classNames({ "hidden lg:block": hideMobile })}
                    >
                      <h6 className="text-base  font-medium text-gray-800">
                        {title}
                      </h6>
                      <ul className="mt-4 list-inside space-y-4 text-sm">
                        {links.map(({ name, link, leavesWebsite }, index) => (
                          <li key={index}>
                            {leavesWebsite ? (
                              <a
                                href={link}
                                className="transition hover:text-cyan-600"
                              >
                                {name}
                              </a>
                            ) : (
                              <Link
                                className="transition hover:text-cyan-600"
                                to={link}
                              >
                                {name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" col-span-2 lg:col-span-1 lg:py-0">
                <div className="">
                  <div className="flex flex-col lg:flex-row  lg:items-center justify-between gap-6 lg:border-b border-white pt-6 md:block md:space-y-5 md:border-none md:py-0">
                    {partner.map(({ title, links, hideMobile }, index) => (
                      <div
                        key={index}
                        className={classNames({
                          "hidden lg:block": hideMobile,
                        })}
                      >
                        <h6 className="text-base  font-medium text-gray-800">
                          {title}
                        </h6>
                        <ul className="mt-4 list-inside space-y-4 text-sm">
                          {links.map(({ name, link, leavesWebsite }, index) => (
                            <li key={index}>
                              {leavesWebsite ? (
                                <a
                                  href={link}
                                  className="transition hover:text-cyan-600"
                                >
                                  {name}
                                </a>
                              ) : (
                                <Link
                                  className="transition hover:text-cyan-600"
                                  to={link}
                                >
                                  {name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6">
                    <h6 className="text-base  font-medium text-gray-800 pb-3">
                      Social Handles
                    </h6>
                    <p className="text-sm text-gray-600 pb-1">Follow us on</p>
                    <div className="flex items-center gap-4">
                      <LinkedInIcon className=" cursor-pointer" />
                      <Facebook className=" cursor-pointer" />
                      <TwitterIcon className=" cursor-pointer" />
                      <InstagramIcon className=" cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inflex lg:flex lg:justify-between border-t gap-4 border-gray-100 py-4 pb-8 ">
              <div>
                <span>
                  Copyright © {new Date().getFullYear()} bookacrib.com
                </span>
                <span className="lg:hidden">-</span>{" "}
                <span>All right reserved</span>
              </div>
              <div className=" flex items-center gap-2">
                {/* <span className="hidden lg:block"> Terms and Condition</span> */}
                <Link to="/terms-and-condition">
                  <span className="hidden lg:block"> Terms and Condition</span>
                </Link>
                <span className="hidden lg:block"> |</span>
                {/* <span className="hidden lg:block">Privacy Policy</span> */}
                <Link to="/privacy-policy">
                  <span className="hidden lg:block">Privacy Policy</span>
                </Link>
              </div>
            </div>
          </footer>
          <footer className=" lg:hidden pt-16 border-t border-gray-100 text-gray-500 ">
            <div className="flex flex-row flex-wrap gap-6 md:gap-0">
              {footer.columns.map(({ title, links, hideMobile }, index) => (
                <div
                  key={index}
                  className={classNames(
                    { "hidden lg:block": hideMobile },
                    "w-[150px] "
                  )}
                >
                  <h6 className="text-base lg:text-lg font-medium text-gray-800">
                    {title}
                  </h6>
                  <ul className="mt-4 list-inside space-y-4 text-sm">
                    {links.map(({ name, link, leavesWebsite }, index) => (
                      <li key={index}>
                        {leavesWebsite ? (
                          <a
                            href={link}
                            className="transition hover:text-cyan-600"
                          >
                            {name}
                          </a>
                        ) : (
                          <Link
                            className="transition hover:text-cyan-600"
                            to={link}
                          >
                            {name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className=" col-span-2 lg:col-span-1 lg:py-0">
                <div className="">
                  <div className="flex flex-col lg:flex-row  lg:items-center justify-between gap-6 lg:border-b border-white pt-6 md:block md:space-y-5 md:border-none md:py-0">
                    {partner.map(({ title, links, hideMobile }, index) => (
                      <div
                        key={index}
                        className={classNames({
                          "hidden lg:block": hideMobile,
                        })}
                      >
                        <h6 className="text-base  font-medium text-gray-800">
                          {title}
                        </h6>
                        <ul className="mt-4 list-inside space-y-4 text-sm">
                          {links.map(({ name, link, leavesWebsite }, index) => (
                            <li key={index}>
                              {leavesWebsite ? (
                                <a
                                  href={link}
                                  className="transition hover:text-cyan-600"
                                >
                                  {name}
                                </a>
                              ) : (
                                <Link
                                  className="transition hover:text-cyan-600"
                                  to={link}
                                >
                                  {name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6">
                    <h6 className="text-base  font-medium text-gray-800 pb-3">
                      Social Handles
                    </h6>
                    <p className="text-sm text-gray-600 pb-1">Follow us on</p>
                    <div className="flex items-center gap-4">
                      <LinkedInIcon className=" cursor-pointer" />
                      <Facebook className=" cursor-pointer" />
                      <TwitterIcon className=" cursor-pointer" />
                      <InstagramIcon className=" cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" pt-10 inflex text-xs lg:text-sm lg:flex lg:justify-between border-t gap-4 border-gray-100 py-4 pb-8 ">
              <div>
                <span>
                  Copyright © {new Date().getFullYear()} bookacrib.com
                </span>{" "}
                <span className="lg:hidden">-</span>{" "}
                <span>All right reserved</span>
              </div>
              <div className=" flex items-center gap-2">
                <Link to="/terms-and-condition">
                  <span className="hidden lg:block"> Terms and Condition</span>
                </Link>
                <span className="hidden lg:block"> |</span>
                <Link to="/privacy-policy">
                  <span className="hidden lg:block">Privacy Policy</span>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
