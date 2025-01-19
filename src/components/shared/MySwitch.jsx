import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch } from "@headlessui/react";
import { Label } from "../UI/Form/Label";
// import Label from "./Label/Label";

const MySwitch = ({
  enabled = false,
  label = "Put on sale",
  desc = "You’ll receive bids on this item",
  className = "",
  onChange,
}) => {
  const [enabledState, setEnabledState] = useState(false);

  useEffect(() => {
    setEnabledState(enabled);
  }, [enabled]);

  return (
    <div
      className={`MySwitch flex fle justify-between items-center space-x-2 ${className}`}
    >
      <div>
        <Label text={label} />
        <p className="text-neutral-500 dark:text-neutral-400  text-xs">
          {desc}
        </p>
      </div>
      <Switch
        checked={enabledState}
        onChange={(e) => {
          setEnabledState(e);
          onChange && onChange(e);
        }}
        className={`${
          enabledState ? "bg-teal-700" : "bg-neutral-400 dark:bg-neutral-6000"
        }
          relative inline-flex flex-shrink-0 h-8 w-[68px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`${enabledState ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-7 w-7 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
};

MySwitch.propTypes = {
  enabled: PropTypes.bool,
  label: PropTypes.string,
  desc: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

MySwitch.defaultProps = {
  enabled: false,
  label: "Put on sale",
  desc: "You’ll receive bids on this item",
  className: "",
};

export default MySwitch;
