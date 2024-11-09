// import { Button } from "../forms/Button";
// import SmallSpinner from "../Loading/SmallSpinner";

/* eslint-disable react/prop-types */
const Modal = ({
  setShowModal,
  buttons,
  description,
  title,
  icon,
  //   loading,
}) => {
  return (
    <>
      <div
        // id="popup-modal"
        // tabIndex={-1}
        className=" overflow-y-auto overflow-x-hidden fixed inset-0 bg-black/50 z-50 bg-opacity-20 backdrop-blurr flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-lg max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 py-4 px-3">
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              {icon && (
                <div className="mb-0 mx-auto text-gray-400 w-16 h-16">
                  {icon}
                </div>
              )}

              <h2 className="mb-3 text-2xl font-normal text-gray-800 dark:text-gray-400">
                {title}
              </h2>
              <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
                {description}
              </h3>
              {buttons}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
