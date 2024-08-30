// import { useRouter } from 'next/router';

// import { useIsMounted } from '@/lib/hooks/use-is-mounted';
// import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import lightLogo from "src/assets/images/logo.svg";
// import darkLogo from 'src/assets/images/logo-white.svg';
// import routes from '@/config/routes';

import { Link } from "react-router-dom";

export default function Logo() {
  // const router = useRouter();
  // const {
  //   query: { layout },
  // } = router;
  // const isMounted = useIsMounted();
  // const { isDarkMode } = useIsDarkMode();
  return (
    <Link
      to="/"
      // href={{
      //   pathname: routes.home,
      //   ...(layout !== LAYOUT_OPTIONS.MODERN &&
      //     layout !== undefined && {
      //       query: {
      //         layout,
      //       },
      //     }),
      // }}
      className="flex w-28 outline-none sm:w-32 4xl:w-36"
    >
      <span className="relative flex overflow-hidden">
        {/* {isMounted && isDarkMode && (
          <img src={darkLogo} alt="Criptic" height={24} priority />
        )} */}
        {/* {isMounted && !isDarkMode && ( */}
        <img src={lightLogo} alt="Criptic" height={24} />
        {/* )} */}
      </span>
    </Link>
  );
}
