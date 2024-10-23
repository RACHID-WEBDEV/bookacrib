/* eslint-disable react/prop-types */
import { useState } from "react";
import classNames from "classnames";
import { ArrowDownIcon } from "../../../assets/SvgIcons";

const AccordionLayout = ({ options }) => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <>
      {options.map(({ title, content }, index) => (
        <div
          key={title}
          className="overflow-hidden flex w-full flex-col my-3 border-2 rounded-md border-secondary-300 hover:border-primary-300"
        >
          <div
            onClick={() => setActiveTab(activeTab === index ? null : index)}
            className="flex items-center p-5 lg:p-6 justify-between  cursor-pointer bg-secondary-25 hover:bg-neutral-white "
          >
            <div className="flex items-center gap-4 text-secondary-600 font-bold">
              <span>
                {activeTab === index ? (
                  <ArrowDownIcon
                    size="16"
                    className="rotate-90"
                    color="#01A1DF"
                  />
                ) : (
                  <ArrowDownIcon size="16" color="#5D6677" />
                )}
              </span>
              <p
                className={classNames(" font-bold text-sm md:text-base", {
                  "text-primary-500": activeTab === index,
                })}
              >
                {title}
              </p>
            </div>
          </div>
          {index === activeTab && (
            <div className=" w-full leading-6 text-secondary-600  transition-height ease duration-500 p-4 px-10 mb-6">
              {content}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default AccordionLayout;
