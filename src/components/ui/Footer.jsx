import classNames from "classnames";
import Logo from "../shared/Logo/Logo";
import google from "src/assets/images/product/googleplay.svg";
import apple from "src/assets/images/product/app-store.svg";
import {
  EmailIcon,
  Facebook,
  InstagramIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../../assets/SvgIcons";
import { Link } from "react-router-dom";
import { footer } from "../../data/footer";

const Footer = () => {
  return (
    <>
      <div className="px-4 bg-primary-950">
        <div id="footer" className="lg:px-10 xl:px-14">
          <footer className="pt-16 border-t border-gray-100 text-gray-300 ">
            <div className="grid grid-cols-5 gap-6 md:gap-0">
              <div className="col-span-5 lg:col-span-1 ">
                <div className="flex flex-col lg:flex-row  lg:items-center justify-between gap-6 lg:border-b border-white py-6 md:block md:space-y-5 md:border-none md:py-0">
                  <Logo />

                  <img
                    src={apple}
                    alt="apple store"
                    className="max-w-[220px]"
                  />
                  <img
                    src={google}
                    alt="apple store"
                    className="max-w-[220px]"
                  />
                </div>
              </div>
              <div className="col-span-5 lg:col-span-3 pt-10 lg:py-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 lg:pb-16  ">
                  {footer.columns.map(({ title, links, hideMobile }, index) => (
                    <div
                      key={index}
                      className={classNames({ "hidden lg:block": hideMobile })}
                    >
                      <h6 className="text-lg font-medium text-white">
                        {title}
                      </h6>
                      <ul className="mt-4 list-inside space-y-4">
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
              <div className="col-span-5  lg:col-span-1 py-10 lg:py-0">
                <div className="flex flex-col lg:flex-row  lg:items-center justify-between gap-6 lg:border-b border-white py-6 md:block md:space-y-5 md:border-none md:py-0">
                  <h6 className="text-lg font-medium text-white">
                    Contact Info
                  </h6>
                  <div className=" space-y-6">
                    <div className="flex items-center gap-2">
                      <EmailIcon />
                      <p className="">
                        <a href="mailto:hello@mrdiystore.com">
                          hello@mrdiystore.com
                        </a>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon />
                      <p>
                        <a href="tel:08087007800">(+234) 8087007800 </a>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 border px-6 py-2.5 rounded-full max-w-fit ">
                      <WhatsAppIcon />
                      <p>
                        <a href="tel:08087007800"> Chat us on WhatsApp </a>
                      </p>
                    </div>

                    <div className="flex gap-6">
                      <a
                        href="https://www.instagram.com/"
                        target="blank"
                        aria-label="medium"
                        className="hover:text-cyan-600"
                      >
                        <InstagramIcon />
                      </a>
                      <a
                        href="https://facebook.com"
                        target="blank"
                        aria-label="medium"
                        className="hover:text-cyan-600"
                      >
                        <Facebook width={24} height={24} />
                      </a>
                      <a
                        href="https://www.twitter.com/"
                        target="blank"
                        aria-label="twitter"
                        className="hover:text-cyan-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-twitter"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inflex lg:flex lg:justify-between border-t gap-4 border-gray-100 py-4 pb-8 ">
              <div>
                <span>
                  Copyright © {new Date().getFullYear()} mrdiystore.com
                  <span id="year" />{" "}
                </span>
                <span className="lg:hidden">-</span>{" "}
                <span>All right reserved</span>
              </div>
              <div className=" flex items-center gap-2">
                <span className="hidden lg:block"> Terms and Condition</span>
                <span className="hidden lg:block"> |</span>
                <span className="hidden lg:block">Privacy Policy</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
