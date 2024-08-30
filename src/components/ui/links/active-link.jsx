import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import cn from "classnames";
import AnchorLink from "src/components/ui/links/anchor-link";

const ActiveLink = ({
  href,
  className,
  activeClassName = "active",
  ...props
}) => {
  const { pathname } = useLocation();
  const _href = typeof href === "object" ? href.pathname : href;
  return (
    <AnchorLink
      to={href}
      className={cn(className, {
        [activeClassName]: pathname === _href,
      })}
      {...props}
    />
  );
};

ActiveLink.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
};

export default ActiveLink;
