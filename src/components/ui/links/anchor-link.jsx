import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import cn from "classnames";

const AnchorLink = ({
  children,
  className,
  to,
  replace,
  state,
  ...anchorProps
}) => {
  return (
    <Link to={to} replace={replace} state={state}>
      <a className={cn(className)} {...anchorProps}>
        {children}
      </a>
    </Link>
  );
};

AnchorLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  replace: PropTypes.bool,
  state: PropTypes.object,
};

export default AnchorLink;
