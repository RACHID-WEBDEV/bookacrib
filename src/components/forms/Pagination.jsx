/* eslint-disable react/prop-types */

const Pagination = ({ meta, handlePaginate }) => {
  // const dispatch = useDispatch();
  // console.log("metadata", meta);
  return (
    <div className="flex items-center justify-center gap-4 lg:justify-between flex-wrap mt-3 mb-2">
      <div className="text-gray-500 text-sm">
        Showing {meta?.from} to {meta?.to} out of {meta?.total}
      </div>
      <div className="flex items-center flex-wrap gap-1.5">
        {meta?.links &&
          meta.links.map((link, index) => (
            <button
              className={` border-gray-400 p-0.5 px-1.5 ${
                link.active
                  ? "bg-dark-100  text-white border-none size-8 rounded-full"
                  : "bg-white  text-black text-sm"
              }  `}
              key={index}
              onClick={() => handlePaginate(link.url)} // Call the handlePaginate function when button is clicked
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: link?.label.replace(
                    "&laquo; Previous",
                    "&laquo; Prev"
                  ),
                }}
              />
              {/* {link?.label} */}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Pagination;
