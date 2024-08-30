// import Image from "@/components/ui/image";
// import { useIsMounted } from "@/lib/hooks/use-is-mounted";
// import { useIsDarkMode } from "@/lib/hooks/use-is-dark-mode";
import lightLogo from "src/assets/images/logo-icon.svg";
// import darkLogo from "src/assets/images/logo-icon-white.png";

const Logo = (props) => {
  // const isMounted = useIsMounted();
  // const { isDarkMode } = useIsDarkMode();

  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative flex overflow-hidden">
        <img src={lightLogo} alt="Criptic" width={28} />

        {/* {isMounted && !isDarkMode && (
          <Image src={lightLogo} alt="Criptic" priority width={28} />
        )} */}
      </span>
    </div>
  );
};

export default Logo;
