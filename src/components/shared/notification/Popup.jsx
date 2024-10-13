import classNames from "classnames";
import PropTypes from "prop-types";

/**
 * Popup component for displaying content in an overlay.
 *
 * @param {Object} props
 * @param {JSX.Element} props.children Content to be displayed within the popup.
 * @param {Function} props.popUpClose Function to close the popup.
 * @param {String} [props.style] Additional CSS styles for the popup.
 * @param {String} [props.maxWidth="max-w-xl"] Maximum width of the popup.
 * @returns {JSX.Element}
 */
const Popup = ({ children, popUpClose, style, maxWidth = "max-w-xl" }) => {
  const handleClose = (event) => {
    event.stopPropagation();
    popUpClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50 backdrop-blur">
      <div
        className={classNames(
          `w-full h-auto max-h-full  bg-white rounded-xl relative animate-fadeIn`,
          maxWidth,
          style
        )}
      >
        <div
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <button
            type="button"
            className="text-primary-600 bg-gray-50 border hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
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
        </div>
        <div className={`w-full h-full p-1 overflow-hidden overflow-y-auto `}>
          {children}
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  /**
   * Content to be displayed within the popup.
   */
  children: PropTypes.node.isRequired,

  /**
   * Function to close the popup.
   */
  popUpClose: PropTypes.func.isRequired,

  /**
   * Additional CSS styles for the popup.
   */
  style: PropTypes.string,

  /**
   * Maximum width of the popup. Defaults to "max-w-xl".
   */
  maxWidth: PropTypes.string,
};

export default Popup;

// import classNames from "classnames";

// const Popup = ({ children, popUpClose, style, maxWidth = "max-w-xl" }) => {
//   const handleClose = (event) => {
//     event.stopPropagation(); // Prevent click event from bubbling up
//     popUpClose(); // Close the popup
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50 backdrop-blur">
//       <div
//         className={classNames(
//           `w-full h-auto max-h-full  bg-white rounded-xl relative animate-fadeIn`,
//           maxWidth,
//           style
//         )}
//       >
//         <div
//           onClick={handleClose}
//           className="absolute top-4 right-4 cursor-pointer"
//         >
//           <button
//             type="button"
//             className="text-primary-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
//           >
//             <svg
//               className="w-3 h-3"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//               />
//             </svg>
//             <span className="sr-only">Close modal</span>
//           </button>
//         </div>
//         <div className={`w-full h-full p-1 overflow-hidden overflow-y-auto `}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;
