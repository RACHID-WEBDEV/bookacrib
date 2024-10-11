/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import UploadIcon from "src/assets/images/UploadIcon.svg";
import { Label } from "../Label";
import classNames from "classnames";

// import LoadingSpinner from "src/components/Loading/LoadingSpinner";
const MultipleImageUpload = ({ label, className }) => {
  const [showImageModal, setshowImageModal] = useState(false);

  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [getImage, setGetImage] = useState(null);

  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;

    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const getSingleImage = (index) => {
    const currentImage = images?.find((_, indexImage) => indexImage === index);
    setGetImage(currentImage);
    // console.log("currentImage:", currentImage);
    setshowImageModal(true);
  };
  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  //   function uploadImages() {
  //     console.log("Images:", images);
  //   }
  console.log("Images:", images);

  return (
    <>
      <div>
        {label && <Label text={label} className="pb-2" />}
        <div
          onClick={selectFiles}
          className={classNames(
            "rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-4",
            className
          )}
        >
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className=" relative border-gray-200 dark:border-gray-700 h-40 flex items-center justify-center rounded-lg"
          >
            <input
              name="file"
              type="file"
              className="file hidden"
              multiple
              ref={fileInputRef}
              onChange={onFileSelect}
            ></input>

            <div className="">
              <div>
                {isDragging ? (
                  <span className="select">Drop Image here</span>
                ) : (
                  <>
                    <div className="text-center flex flex-col items-center justify-center">
                      <div className=" pb-2">
                        <img src={UploadIcon} alt="icon" />
                      </div>
                      <p className=" text-sm tracking-tighter text-gray-600 pb-2 ">
                        <span className="text-primary-700 font-semibold">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className=" text-xs tracking-tighter text-gray-600 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
          {images.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="group relative rounded border p-2 flex"
            >
              <img
                className="rounded max-h-[140px] max-w-full"
                src={image.url}
                alt="image-2"
              />
              <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                <span
                  className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                  onClick={() => getSingleImage(imageIndex)}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span
                  className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                  onClick={() => deleteImage(imageIndex)}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              {/* {showImageModal && (
                <ImageModal
                  getImage={getImage}
                  setshowImageModal={setshowImageModal}
                />
              )} */}
            </div>
          ))}
        </div>
      </div>
      {showImageModal && (
        <ImageModal getImage={getImage} setshowImageModal={setshowImageModal} />
      )}
    </>
  );
};

export default MultipleImageUpload;

export const ImageModal = ({ setshowImageModal, getImage }) => {
  //   console.log("show Modal image:", getImage);
  //   console.log("show Modal imageIndex:", imageIndex);

  return (
    <>
      <div
        id="crud-modal"
        className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full backdrop-blur-sm bg-black/50"
      >
        <div className="relative p-4 w-full max-w-md lg:max-w-3xl mx-auto max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getImage.name}
              </h3>
              <button
                onClick={() => setshowImageModal(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
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
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <img
                className="rounded max-h-[350px] lg:max-h-[650px] max-w-full"
                src={getImage.url}
                alt="image-2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//  <div className="card">
//    <div className="top">
//      <p>Drag & Drop Image uploading</p>
//    </div>
//    <div className="" onClick={selectFiles}>
//      <div
//        className="drag-area"
//        onDragOver={onDragOver}
//        onDragLeave={onDragLeave}
//        onDrop={onDrop}
//      >
//        {isDragging ? (
//          <span className="select">Drop Image here</span>
//        ) : (
//          <>
//            Drag & Drop Image here or{" "}
//            <span className="select" role="button ">
//              Browse
//            </span>
//          </>
//        )}
//      </div>
//    </div>
//    <input
//      name="file"
//      type="file"
//      className="file"
//      multiple
//      ref={fileInputRef}
//      onChange={onFileSelect}
//    ></input>

//    <div className="image-container">
//      {images.map((image, index) => (
//        <div key={index} className="image">
//          <span className="delete" onClick={() => deleteImage(index)}>
//            {" "}
//            &times;
//          </span>
//          <img src={image?.url} alt={image.name} />
//        </div>
//      ))}
//    </div>

{
  /* <div className="image-container">
  {images.map((image, index) => (
    <div key={index} className="image">
      <span className="delete" onClick={() => deleteImage(index)}>
        {" "}
        &times;
      </span>
      <img src={image?.url} alt={image.name} />
    </div>
  ))}
</div>; */
}
//    <button className="" onClick={uploadImages}>
//         Upload Image
//       </button>
//  </div>;
