/* eslint-disable react/prop-types */

import { useState, useRef } from "react";
import UploadIcon from "src/assets/images/UploadIcon.svg";
import { Label } from "../Label";
import classNames from "classnames";

const ImageUpload = ({ images, setImages, label, className, updateImages }) => {
  // const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [showImageModal, setshowImageModal] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [getImage, setGetImage] = useState(null);
  const [getImagePreview, setGetImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = Array.from(event.target.files);

    if (files.length === 0) return;

    const newImages = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (file.type.split("/")[0] !== "image") return;

      // Check if the image file already exists by name
      const isDuplicate = images?.some((img) => img.name === file.name);
      if (!isDuplicate) {
        newImages.push(file); // Add new images
        newPreviews.push(URL.createObjectURL(file)); // Generate preview for new images
      }
    });

    if (newImages.length > 0) {
      // Append new images to the existing images state
      setImages((prevImages) => [...prevImages, ...newImages]);

      // Append new previews to the existing preview state
      setPreview((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  }

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreview((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const getSingleImage = (index) => {
    const currentImage = images?.find((_, indexImage) => indexImage === index);
    const currentPreview = preview?.find(
      (_, indexImage) => indexImage === index
    );

    setGetImage(currentImage);
    setGetImagePreview(currentPreview);

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

    // const files = event.dataTransfer.files;
    const files = Array.from(event.dataTransfer.files);

    const newImages = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (file.type.split("/")[0] !== "image") return;

      // Check if the image file already exists by name
      const isDuplicate = images?.some((img) => img.name === file.name);
      if (!isDuplicate) {
        newImages.push(file); // Add new images
        newPreviews.push(URL.createObjectURL(file)); // Generate preview for new images
      }
    });

    if (newImages.length > 0) {
      // Append new images to the existing images state
      setImages((prevImages) => [...prevImages, ...newImages]);

      // Append new previews to the existing preview state
      setPreview((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  }

  //   function uploadImages() {
  //     console.log("Images:", images);
  //   }
  // console.log("Images:", images);
  // console.log("Preview:", preview);
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
            {/* <input
              name="file"
              type="file"
              className="file hidden"
              multiple
              ref={fileInputRef}
              onChange={onFileSelect}
            ></input> */}
            <input
              name="file"
              type="file"
              className="file hidden"
              multiple
              ref={fileInputRef}
              accept="image/jpeg, image/jpg, image/png, image/svg+xml, image/webp"
              onChange={onFileSelect}
            />

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
          {preview.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="group relative rounded border p-2 flex"
            >
              <img
                className="rounded max-h-[140px] max-w-full"
                src={image}
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
            </div>
          ))}
          {updateImages}
        </div>
      </div>
      {showImageModal && (
        <ImageModal
          getImage={getImage}
          getImagePreview={getImagePreview}
          setshowImageModal={setshowImageModal}
        />
      )}
    </>
  );
};

export default ImageUpload;

export const ImageModal = ({
  setshowImageModal,
  getImage,
  getImagePreview,
}) => {
  // console.log("show Modal image:", getImage);
  // console.log("Image Preview:", getImagePreview);

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
                src={getImagePreview}
                alt="image-2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
