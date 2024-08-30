import { useEffect, useState } from "react";

export const useViewport = () => {
  const [width, setWidth] = useState(0);
  const [deviceType, setDeviceType] = useState("");

  const breakpoints = {
    mobile: 620,
    tablet: 1024,
    laptop: 1440,
    desktop: 1920,
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (width < breakpoints.mobile) {
      setDeviceType("mobile");
    } else if (width >= breakpoints.mobile && width < breakpoints.tablet) {
      setDeviceType("tablet");
    } else if (width >= breakpoints.tablet && width < breakpoints.laptop) {
      setDeviceType("laptop");
    } else {
      setDeviceType("desktop");
    }
  }, [breakpoints.laptop, breakpoints.mobile, breakpoints.tablet, width]);

  const device = {
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isLaptop: deviceType === "laptop",
    isDesktop: deviceType === "desktop",
  };

  return device;
};
