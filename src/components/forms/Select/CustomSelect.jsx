/* eslint-disable react/prop-types */

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export default function CustomSelect({
  selected,
  setSelected,
  data,
  withImage,
  label,
  placeholder,
  defaultValue,
  rounded,
}) {
  // console.log(" custom select", data);
  // console.log("default selected", selected);
  return (
    <div className="-mt-1">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block tracking-wide text-gray-700 pb-1 font-medium text-sm mb-1">
              {label}
            </Listbox.Label>
            <div className="relative ">
              <Listbox.Button
                className={classNames(
                  "relative w-full cursor-pointer rounded-md bg-defaultBg2 pl-3 pr-10 text-left text-secondary-200 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:border-primary-200 focus:ring-primary-200 focus:shadow-primary-sm sm:text-sm sm:leading-6",
                  { "py-3 ": withImage },
                  { "py-4 ": !withImage }
                )}
              >
                <span className="flex items-center capitalize">
                  {withImage && (
                    <img
                      src={selected?.avatar}
                      alt=""
                      className={classNames(
                        "h-8 w-8 flex-shrink-0 ",
                        {
                          "rounded-full": rounded,
                        },
                        { "rounded-lg": !rounded }
                      )}
                    />
                  )}
                  <span
                    className={classNames(
                      " block truncate  text-gray-500 text-base",
                      { "ml-3": withImage }
                    )}
                  >
                    {selected === null || selected === undefined
                      ? defaultValue?.name || placeholder
                      : selected?.name ||
                        selected?.title ||
                        selected?.full_name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {data?.map((person) => (
                    <Listbox.Option
                      key={
                        person.id ||
                        person?.name ||
                        person.title ||
                        person.full_name
                      }
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-primary-600 text-white"
                            : "text-gray-600",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {withImage && (
                              <img
                                src={person?.avatar}
                                alt="user avatar"
                                className={classNames(
                                  "h-8 w-8 flex-shrink-0 ",
                                  {
                                    "rounded-full": rounded,
                                  },
                                  { "rounded-lg": !rounded }
                                )}
                              />
                            )}

                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal ",
                                "ml-3 block truncate capitalize"
                              )}
                            >
                              {person?.name ||
                                person?.title ||
                                person?.full_name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-primary-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
