/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button } from "../../../components/forms/Button";
import HookForm from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { TextArea } from "../../../components/forms/TextArea";
import SmallSpinner from "../../../components/Loading/SmallSpinner";
import ImageUpload from "../../../components/forms/Upload/ImageUpload";
import axios from "axios";

import DashboardHeading from "../../../layout/DashboardHeading";
import { FetchLocations } from "../../../Hooks/useFetchLocation";
import CustomSelect from "../../../components/forms/Select/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriess } from "../../../Redux/categories/categoriesThunk";
import { fetchRoomTypes } from "../../../Redux/roomtypes/roomtypesThunk";
import AsyncReactSelect from "../../../components/forms/Select/AsyncReactSelect";
import {
  getData,
  patchData,
  postData,
  deleteData,
  putData,
} from "../../../utils/api";
import { PropertySchema } from "../../../schema/propertySchema";
import toast from "react-hot-toast";
import AnimateLoader from "../../../components/Loading/AnimateLoader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProperty } from "../../../Redux/property/propertyThunk";
import Notification from "../../../components/shared/notification/Notification";

// import AnimateLoader from "../../../components/Loading/AnimateLoader";
import CryptoJS from "crypto-js";
import { MinusIcon, PlusIcon } from "../../../assets/SvgIcons";
import { Label } from "../../../components/forms/Label";
import {
  useFetchCity,
  useFetchCountries,
} from "../../../Hooks/useFetchCountries";
import EditPropertyFeatures from "./EditPropertyFeatures";

const EditProperty = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  // console.log("status: ", status);

  const navigate = useNavigate();
  const [showImageModal, setshowImageModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  // const [showImageModal, setshowImageModal] = useState(false);
  const [storeMainFeature, setStoreMainFeature] = useState([]);
  const [defaultFeatures, setdefaultFeatures] = useState([]);

  console.log("main edit Feature:", storeMainFeature);

  const [imagesFile, setImagesFile] = useState([]);
  // const [loadingImages, setLoadingImages] = useState(false);
  const [allImagesFiles, setAllImagesFiles] = useState([]);
  // console.log("imagesFile: ", imagesFile);
  // console.log("All Upload ImagesFile: ", allImagesFiles);
  // console.log("loadingImages: ", loadingImages);
  const CLOUDINARY_API_SECRET = "QXmfLjMnkM_22RoR2OMYs94Hnug"; //QXmfLjMnkM_22RoR2OMYs94Hnug
  const CLOUDINARY_API_KEY = "115111542838195";

  // const CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dwpe6s8vr

  const cloudinaryConfig = {
    cloudName: "dwpe6s8vr",
    uploadPreset: "oupzw57n",
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET,
    apiEndpoint: `https://api.cloudinary.com/v1_1/dwpe6s8vr/image/destroy`,
  };

  // const extractPublicId = (imageUrl) => imageUrl.split("/").pop().split(".")[0];

  // // Example usage
  // deleteImageFromCloudinary(
  //   "https://res.cloudinary.com/dwpe6s8vr/image/upload/your-public-id.jpg"
  // );

  const { uuid } = useParams(); // Type assertion for id

  // useEffect(() => {
  //   dispatch(fetchProperty(uuid));
  // }, [uuid, dispatch]);

  // const {
  //   propertys,
  //   property,
  //   loading: loadingProperty,
  //   error,
  // } = useSelector((state) => state.properties);

  const [loadingProperty, setLoadingProperty] = useState(false);
  const [viewPropery, setViewPropery] = useState([]);
  const [errorProperty, setErrorProperty] = useState(null);

  const property = viewPropery;
  // console.log("sin:", property?.data?.features);
  const handleViewPropery = async () => {
    setLoadingProperty(true);
    try {
      const response = await getData(
        `/bookacrib-api-routes/v1/properties/view-single-property?id=${uuid}&with[]=company&with[]=initiator&with[]=country&with[]=state&with[]=city&with[]=category&with[]=roomType`
      );
      setViewPropery(response);
      setdefaultFeatures(response?.data?.features);
      // console.log(response);
    } catch (error) {
      setErrorProperty(error.response.data.message);
    } finally {
      setLoadingProperty(false);
    }
  };

  useEffect(() => {
    handleViewPropery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  // console.log("property: ", property?.data?.images);

  useEffect(() => {
    // Set allImagesFiles once property data is loaded
    if (property?.data?.images) {
      setAllImagesFiles(property.data.images);
    }
  }, [property]);

  // const {
  //   countries,
  //   states,
  //   cities,
  //   selectedCountry,
  //   setSelectedCountry,
  //   selectedState,
  //   setSelectedState,
  //   selectedCities,
  //   setSelectedCities,
  //   // loading,
  //   // error,
  // } = FetchLocations();

  const {
    countries: countries,
    states: states,
    selectedCountry: selectedCountry,
    setSelectedCountry: setSelectedCountry,
    selectedState: selectedState,
    setSelectedState: setSelectedState,
    // loading,
    // error,
  } = useFetchCountries();

  const getNigeria = countries?.filter((country) => country.name === "Nigeria");

  const getDefaultState = states?.find(
    (dstate) => dstate.name === property?.data?.state?.name
  );

  // console.log("getDefaultState", getDefaultState);

  const {
    cities: cities,
    selectedCity: selectedCities,
    setSelectedCity: setSelectedCities,
    loading: loadingCities,
    error: cityError,
  } = useFetchCity(
    selectedState === null ? getDefaultState?.uuid : selectedState?.uuid
  );

  // console.log("getNigeria", getNigeria);
  // // console.log("dcountries", countries);
  // console.log("selectedState", selectedState);
  // console.log("dcities", property?.data?.city?.uuid);
  // const fetchStates = async () => {
  //   if (!getCountry) return;
  //   // setLoading(true);
  //   try {
  //     const response = await getData(`customer/country/${getCountry.id}`);
  //     setDefaultState(response);
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  //   // finally {
  //   //   setLoading(false);
  //   // }
  // };

  // useEffect(() => {
  //   fetchStates();
  // }, [getCountry]);

  // const getDefaultState = defaultState?.data?.find(
  //   (state) => state?.name === userData?.state
  // );

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  const { categories } = useSelector((state) => state.category);
  const fetchCategoryHandler = (url) => {
    dispatch(fetchCategoriess(url));
  };

  const { roomtypes } = useSelector((state) => state.roomtype);
  const fetchRoomTypeHandler = (url) => {
    dispatch(fetchRoomTypes(url));
  };

  // console.log("categories", selectedCategory);

  useEffect(() => {
    fetchRoomTypeHandler(
      "bookacrib-api-routes/v1/room-types/list-room-types?status=yes"
    );

    fetchCategoryHandler("v1/public/categories/list-all-categories?status=yes");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [adultCount, setAdultCount] = useState(1);
  const [minorCount, setMinorCount] = useState(0);
  const [discount, setDiscount] = useState(0); // default at 50

  const [cautionFee, setCautionFee] = useState(0); // default at 50

  const [userChanged, setUserChanged] = useState(false);

  useEffect(() => {
    if (!userChanged && property?.data?.caution_fee !== null) {
      setCautionFee(Number(property?.data?.caution_fee));
    }
    if (!userChanged && property?.data?.adult_count !== null) {
      setAdultCount(Number(property?.data?.adult_count));
    }
    if (!userChanged && property?.data?.minor_count !== null) {
      setMinorCount(Number(property?.data?.minor_count));
    }
    if (!userChanged && property?.data?.discount !== null) {
      setDiscount(Number(property?.data?.discount));
    }
  }, [
    property?.data?.caution_fee,
    userChanged,
    property?.data?.adult_count,
    property?.data?.minor_count,
    property?.data?.discount,
  ]);

  // useEffect(() => {
  // }, [, userChanged]);

  const handleCautionFeeSliderChange = (e) => {
    setUserChanged(true);
    setCautionFee(Number(e.target.value));
  };
  const handleDiscountSliderChange = (e) => {
    setUserChanged(true);
    setDiscount(Number(e.target.value));
  };

  // const defaultCautionFee = Number(property?.data?.caution_fee);

  // const rawCautionFee = property?.data?.caution_fee;
  // const defaultCautionFee =
  //   rawCautionFee != null && Number(rawCautionFee) > 0
  //     ? Number(rawCautionFee)
  //     : 100; // fallback default

  // console.log(
  //   "cautionFee",
  //   rawCautionFee,
  //   "defaultCautionFee:",
  //   defaultCautionFee
  // );
  const increaseAdult = () => {
    setUserChanged(true);
    setAdultCount(adultCount + 1);
  };
  const decreaseAdult = () => {
    if (adultCount > 1) {
      setUserChanged(true);
      setAdultCount(adultCount - 1);
    }
  };

  const increaseMinor = () => {
    setUserChanged(true);
    setMinorCount(minorCount + 1);
  };
  const decreaseMinor = () => {
    setUserChanged(true);
    if (minorCount > 0) {
      setMinorCount(minorCount - 1);
    }
  };

  // const [selectedValue, setSelectedValue] = useState(property?.data?.features);

  // const featureFilter = selectedValue?.map((feature) => ({
  //   name: feature.name,
  //   price: feature.price,
  // }));
  // console.log("setSelectedValue", selectedValue);

  // console.log("getPermissionsId", featureFilter);

  // const FEATURE_URL =
  //   "/bookacrib-api-routes/v1/features/list-features?limit=100";

  // const fetchAllFeature = async () => {
  //   try {
  //     const response = await getData(FEATURE_URL);
  //     return response?.data;
  //   } catch (error) {
  //     const errorMessage = error;
  //     console.log(errorMessage);
  //     // return rejectWithValue(errorMessage?.response?.data);
  //   }
  // };
  const defaultFormValue = {
    name: property?.data?.name,
    address: property?.data?.address,
    price: property?.data?.price,
    description: property?.data?.description,
    // caution_fee: Number(property?.data?.caution_fee),
  };

  const uploadImageToCloudinary = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "oupzw57n");
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwpe6s8vr/image/upload",
        { method: "POST", body: data }
      );
      return await res.json();
    } catch (error) {
      throw error;
    }
  };

  const [loading, setLoading] = useState(false); // Controls button loading state

  const extractPublicId = (imageUrl) => {
    const urlParts = imageUrl.split("/");
    const publicId = urlParts[urlParts.length - 1];
    return publicId.split(".")[0];
  };
  const [cloudImageId, setCloudImageId] = useState([]);
  // console.log("cloudImageId", cloudImageId);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const deleteProductImage = (imageLink) => {
    // console.log("Image Link", imageLink);
    // const getCloudeImageId = extractPublicId(imageLink);
    setCloudImageId([imageLink]);

    // console.log("ImageID :", extractPublicId(imageLink));
    setShowDeletePopup(true);
  };
  // const imageArray = {
  //   images: cloudImageId,
  // };
  // console.log("imageArray", imageArray);
  const handleImageDelete = async () => {
    // console.log("Images funtion  to delete");

    try {
      const result = await deleteData(
        `/bookacrib-api-routes/v1/properties/delete-property-images?id=${uuid}`,
        {
          images: cloudImageId,
        }
      );
      console.log("images result:", result);

      if (result.status >= 200 && result.status <= 300) {
        toast.success(result?.message);
        // navigate("/property/checkout");
        handleViewPropery();
      }
    } catch (error) {
      console.error("Create Error:", error);
      if (
        (error?.response?.data?.status >= 400 &&
          error?.response?.data?.status <= 499 &&
          error?.response?.data?.errors) ||
        (error?.response?.data?.status_code >= 400 &&
          error?.response?.data?.status_code <= 499 &&
          error?.response?.data?.errors)
      ) {
        const errorMessages = Object.values(error?.response?.data?.errors)
          .flat()
          .join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(error?.response?.data?.message, { duration: 6000 });
      }
    } finally {
      // setLoading(false);
      setShowDeletePopup(false);
    }
  };
  // const deleteImageFromCloudinary = async (url) => {
  //   const publicId = extractPublicId(url);

  //   try {
  //     // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
  //     // Replace YOUR_API_KEY and YOUR_API_SECRET with your Cloudinary credentials
  //     // const cloudName = "dwpe6s8vr"; // dwpe6s8vr "YOUR_CLOUD_NAME";
  //     // const apiKey = "115111542838195"; // 115111542838195 "YOUR_API_KEY";
  //     // const apiSecret = "QXmfLjMnkM_22RoR2OMYs94Hnug"; // QXmfLjMnkM_22RoR2OMYs94Hnug "YOUR_API_SECRET";

  //     const cloudName = import.meta.env.VITE_CLOUD_NAME;
  //     const apiKey = import.meta.env.VITE_API_KEY;
  //     const apiSecret = import.meta.env.VITE_API_SECRET;

  //     // Cloudinary API URL for deleting images
  //     const url = ` https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  //     // Base64 encode the API key and secret for Basic Auth
  //     const authHeader = "Basic " + btoa(`${apiKey}:${apiSecret}`);

  //     // Send the delete request
  //     const response = await axios.post(
  //       url,
  //       { public_id: publicId }, // Request body
  //       {
  //         headers: {
  //           Authorization: authHeader,
  //         },
  //       }
  //     );

  //     if (response.data.result === "ok") {
  //       setStatus("Image deleted successfully");
  //     } else {
  //       setStatus("Failed to delete image");
  //     }
  //   } catch (error) {
  //     setStatus(`Error:${error.message}`);
  //   }

  //   // try {
  //   //   const res = await fetch(
  //   //     `https://api.cloudinary.com/v1_1/dwpe6s8vr/image/destroy`,
  //   //     {
  //   //       method: "POST",
  //   //       headers: { "Content-Type": "application/json" },
  //   //       body: JSON.stringify({ public_id: publicId }),
  //   //     }
  //   //   );
  //   //   const result = await res.json();
  //   //   if (result.result === "ok") {
  //   //     console.log(`Deleted image: ${url}`);
  //   //     return true;
  //   //   } else {
  //   //     console.error(`Failed to delete image: ${url}`);
  //   //     return false;
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error deleting image:", error);
  //   //   return false;
  //   // }
  // };

  // const handleSubmitImages = async (data) => {
  //   setLoading(true);

  //   // Step 1: Check and delete old images if needed
  //   // const deletePromises = allImagesFiles.map(deleteImageFromCloudinary);
  //   // await Promise.all(deletePromises);

  //   // Step 2: Validate new images
  //   if (imagesFile.length < 2 || imagesFile.length > 6) {
  //     toast.error("Please upload between 2 to 6 images.");
  //     setLoading(false);
  //     return;
  //   }

  //   // Step 3: Upload new images
  //   const uploadPromises = imagesFile.map((image) =>
  //     uploadImageToCloudinary(image).catch(console.error)
  //   );
  //   const uploadedFiles = await Promise.all(uploadPromises);
  //   const imageUrls = uploadedFiles
  //     .filter(Boolean)
  //     .map((file) => file.secure_url);

  //   if (!imageUrls.length) {
  //     toast.error("Image upload failed");
  //     setLoading(false);
  //     return;
  //   }

  //   // Step 4: Submit form with new image URLs
  //   // const filteredFormData = { ...data, images: imageUrls };
  //   try {
  //     const result = await patchData(
  //       `bookacrib-api-routes/v1/properties/update-property-features-images-by-action?id=${uuid}`,
  //       { action: "images", images: imageUrls }
  //       // filteredFormData
  //     );
  //     if (result.status >= 200 && result.status <= 300) {
  //       toast.success(result.message);
  //       navigate("/admin/property/all-property");
  //     }
  //   } catch (error) {
  //     // Error handling code as before
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  console.log("imagesFile", imagesFile);
  const handleSubmit = async (data) => {
    setLoading(true);

    // ===== Step 1: Validate Image Uploads =====
    // if (imagesFile.length < 2) {
    //   toast.error("A minimum of 2 images must be uploaded.");
    //   setLoading(false);
    //   return;
    // }

    if (imagesFile.length > 6) {
      toast.error("Image upload must not be more than 6");
      setLoading(false);
      return;
    }

    // ===== Step 2: Upload Images to Cloudinary =====
    try {
      const uploadPromises = imagesFile.map((image) =>
        uploadImageToCloudinary(image).catch((error) => {
          console.error("Image upload error:", error);
          return null;
        })
      );

      const uploadedFiles = await Promise.all(uploadPromises);
      const successfulUploads = uploadedFiles.filter(Boolean);

      // if (successfulUploads.length === 0) {
      //   toast.error("All image uploads failed.");
      //   setLoading(false);
      //   return;
      // }

      if (uploadedFiles.includes(null)) {
        toast.error("Some images failed to upload. Please try again.");
        setLoading(false);
        return;
      }

      // const imageUrls = successfulUploads.map((file) => file.secure_url);
      // console.log("Uploaded Image URLs:", imageUrls);

      const imageUrls = successfulUploads.map((file) => file.secure_url);

      const combinedImageUrls = [...allImagesFiles, ...imageUrls];
      console.log("combinedImageUrls", combinedImageUrls);
      // Set state (for UI, future use)
      setAllImagesFiles(combinedImageUrls);

      // ===== Step 3: Validate UUID =====
      if (!uuid) {
        toast.error("Property ID (UUID) is missing.");
        setLoading(false);
        return;
      }

      // ===== Step 4: Prepare Form Data =====
      const filteredFormData = {
        name: data.name,
        address: data.address,
        price: data?.price,
        description: data.description,
        room_type_id: selectedRoomType?.uuid || property?.data?.roomType?.uuid,
        // images: allImagesFiles,
        country_id: selectedCountry?.uuid || property?.data?.country?.uuid,
        state_id: selectedState?.uuid || property?.data?.state?.uuid,
        city_id: selectedCities?.uuid || property?.data?.city?.uuid,
        category_id: selectedCategory?.uuid || property?.data?.category?.uuid,
        caution_fee: cautionFee,
        adult_count: adultCount,
        minor_count: minorCount,
        discount: discount,
      };

      // console.log("Submitting form data:", filteredFormData);

      const featureImageResult = await patchData(
        `/bookacrib-api-routes/v1/properties/update-property-features-images?id=${uuid}`,
        {
          features: storeMainFeature,
          images: combinedImageUrls,
        }
      );

      console.log("Images & Features response:", featureImageResult);
      // ===== Step 5: Submit Data to API =====
      const result = await putData(
        `/bookacrib-api-routes/v1/properties/update-property?id=${uuid}`,
        filteredFormData
      );

      const status = result?.status || result?.status_code;

      if (status >= 200 && status < 300) {
        toast.success(result?.message || "Property updated successfully!");
        // navigate("/crib-owner/property/all-property");
        setImagesFile([]);
        handleViewPropery();
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Submission error:", error);

      const errorData = error?.response?.data;

      if (
        (errorData?.status >= 400 &&
          errorData?.status <= 499 &&
          errorData?.errors) ||
        (errorData?.status_code >= 400 &&
          errorData?.status_code <= 499 &&
          errorData?.errors)
      ) {
        const errorMessages = Object.values(errorData.errors).flat().join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(errorData?.message || "Something went wrong", {
          duration: 6000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // IMAGE MODAL SLIDER PREVIEW

  const getSingleImage = (index) => {
    setCurrentImageIndex(index);
    setshowImageModal(true);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImagesFiles.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImagesFiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  // const goToPreviousImage = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex > 0 ? prevIndex - 1 : prevIndex
  //   );
  // };

  // const goToNextImage = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex < allImagesFiles.length - 1 ? prevIndex + 1 : prevIndex
  //   );
  // };

  // const getSingleImage = (index) => {
  //   const currentImage = allImagesFiles?.find(
  //     (_, indexImage) => indexImage === index
  //   );
  //   setImagePreview(currentImage);

  //   setshowImageModal(true);
  // };

  return (
    <div>
      <>
        <div className="hidden lg:flex">
          <DashboardHeading
            fixed
            title="Update Property"
            description=" Update properties details on this platform"
          />
        </div>

        <div className=" space-y-6">
          <div className="lg:hidden flex">
            <DashboardHeading
              title="Update Property"
              description=" Update properties details on this platform"
            />
          </div>
          <div className="p-3 border border-gray-300 rounded-md">
            <div className=" flex items-center justify-between gap-4 flex-wrap ">
              <div className=" lg:w-[65%]"></div>
              <div className="flex items-center gap-4">
                <Link to={"/crib-owner/property/create-property"}>
                  <Button>Add New Property</Button>
                </Link>
                <Link to={"/crib-owner/property/all-property"}>
                  <Button color="primaryAlt">Back to Property</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="px-4 py-2.5 text-xl font-semibold text-dark-100 bg-gray-100 ">
            <p>Update Property</p>
          </div>
          {loadingProperty ? (
            <div className=" flex items-center justify-center p-10">
              <SmallSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="">
                <div className=" pb-6">
                  <EditPropertyFeatures
                    storeMainFeature={storeMainFeature}
                    setStoreMainFeature={setStoreMainFeature}
                    defaultFeatures={defaultFeatures}
                    setdefaultFeatures={setdefaultFeatures}
                  />
                </div>
                <ImageUpload
                  images={imagesFile}
                  setImages={setImagesFile}
                  updateImages={
                    allImagesFiles && (
                      <>
                        {allImagesFiles?.map((image, imageIndex) => (
                          <div
                            key={imageIndex}
                            className="group relative rounded border p-2 flex"
                          >
                            <img
                              className="rounded min-h-[140px] max-h-[140px] max-w-full"
                              src={`${image}`}
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
                                onClick={() => deleteProductImage(image)}
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
                      </>
                    )
                  }
                />

                {/* <Button onClick={() => UploadImagesToCloud(imagesFile)}>
                Upload Image
              </Button> */}
              </div>

              <div className="">
                <HookForm
                  defaultValues={defaultFormValue}
                  onSubmit={handleSubmit}
                  schema={PropertySchema}
                >
                  <div className=" space-y-6">
                    <div className=" flex items-start w-full gap-6">
                      <div className="relative bg-white rounded-2xl shadow  w-full">
                        {/* <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
                      <div>
                        <h1 className="text-lg font-semibold text-gray-900 ">
                          Basic Details
                        </h1>
                        <p className="text-gray-600 text-sm font-light">
                          Manage the product’s basic information
                        </p>
                      </div>
                    </div> */}
                        {/* contents below */}
                        <div className=" h-full ">
                          {/* <ScrollArea className="h-full"> */}
                          <div className="p-5">
                            <Input
                              name="name"
                              label="Property Name"
                              placeholder="Enter the name given to this room"
                            />
                            <Input
                              name="address"
                              label="Address"
                              placeholder="Enter property location or address"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="pb-4">
                                <CustomSelect
                                  label="Category"
                                  selected={selectedCategory}
                                  setSelected={setSelectedCategory}
                                  data={categories?.data}
                                  withImage={false}
                                  placeholder={
                                    property?.data?.category?.name ||
                                    "Select Category"
                                  }
                                />
                              </div>
                              <div className="pb-4">
                                <CustomSelect
                                  label="Room Type"
                                  selected={selectedRoomType}
                                  setSelected={setSelectedRoomType}
                                  data={roomtypes?.data}
                                  withImage={false}
                                  placeholder={
                                    property?.data?.roomType?.name ||
                                    "Select Room Type"
                                  }
                                />
                              </div>
                            </div>
                            <Input
                              name="price"
                              //   label="Model #"
                              placeholder="Enter price"
                              type="number"
                            />
                            {/* <Input
                              name="caution_fee"
                              label="Caution Fee"
                              placeholder="Enter caution fee price"
                              type="number"
                            /> */}

                            <div className="w-full max-w-lg relative mb-6">
                              <label
                                htmlFor="discount-range"
                                className="block mb-8 text-sm font-medium text-gray-600 dark:text-white"
                              >
                                Caution Fee :{" "}
                                <span className="font-bold">{cautionFee}%</span>
                              </label>
                              {/* Tooltip */}
                              <div
                                className="absolute left-0 transform -translate-x-[35%] -translate-y-6 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded"
                                style={{ left: `${cautionFee}%` }}
                              >
                                {cautionFee}%
                              </div>
                              <input
                                id="cautionFee-range"
                                type="range"
                                min="0"
                                max="100"
                                value={cautionFee}
                                // onChange={(e) => setCautionFee(e.target.value)}
                                onChange={handleCautionFeeSliderChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700
                                                            [&::-webkit-slider-thumb]:appearance-none
                                                           [&::-webkit-slider-thumb]:h-4
                                                           [&::-webkit-slider-thumb]:w-4
                                                           [&::-webkit-slider-thumb]:rounded-full
                                                           [&::-webkit-slider-thumb]:bg-primary-600
                                                      
                                                          
                                                           [&::-webkit-slider-runnable-track]:h-4
                                                           transition-all duration-300 "
                              />
                            </div>
                            <div className="flex flex-col items-center space-y-6 lg:p-8 my-6">
                              {/* Adult Counter */}
                              <div className="flex items-center space-x-4 ">
                                {/* <h2 className="text-lg font-semibold">Adults</h2> */}
                                <div className="hidden lg:flex">
                                  <Label text={"Number of Adults"} />
                                </div>
                                <div className="lg:hidden flex">
                                  <Label text={"Adults"} />
                                </div>
                                <Button
                                  onClick={decreaseAdult}
                                  disabled={adultCount === 1}
                                  type="button"
                                >
                                  <MinusIcon />
                                </Button>
                                <span className="text-lg font-bold">
                                  {adultCount}
                                </span>

                                <Button onClick={increaseAdult} type="button">
                                  <PlusIcon />
                                </Button>
                              </div>

                              {/* Minor Counter */}
                              <div className="flex items-center space-x-4">
                                <div className="hidden lg:flex">
                                  <Label text={"Number of Minors"} />
                                </div>
                                <div className="lg:hidden flex">
                                  <Label text={"Minors"} />
                                </div>
                                <Button
                                  onClick={decreaseMinor}
                                  disabled={minorCount === 0}
                                  type="button"
                                >
                                  <MinusIcon />
                                </Button>
                                <span className="text-lg font-bold">
                                  {minorCount}
                                </span>

                                <Button
                                  onClick={increaseMinor}
                                  // disabled={adultCount === 1}
                                  type="button"
                                >
                                  <PlusIcon />
                                </Button>
                              </div>
                            </div>
                            <div className="w-full max-w-lg relative mb-6">
                              <label
                                htmlFor="discount-range"
                                className="block mb-8 text-sm font-medium text-gray-600 dark:text-white"
                              >
                                Property Discount :{" "}
                                <span className="font-bold">{discount}%</span>
                              </label>
                              {/* Tooltip */}
                              <div
                                className="absolute left-0 transform -translate-x-[35%] -translate-y-6 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded"
                                style={{ left: `${discount}%` }}
                              >
                                {discount}%
                              </div>
                              <input
                                id="discount-range"
                                type="range"
                                min="0"
                                max="100"
                                value={discount}
                                // onChange={(e) => setDiscount(e.target.value)}
                                onChange={handleDiscountSliderChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700
                                                            [&::-webkit-slider-thumb]:appearance-none
                                                           [&::-webkit-slider-thumb]:h-4
                                                           [&::-webkit-slider-thumb]:w-4
                                                           [&::-webkit-slider-thumb]:rounded-full
                                                           [&::-webkit-slider-thumb]:bg-primary-600
                                                      
                                                          
                                                           [&::-webkit-slider-runnable-track]:h-4
                                                           transition-all duration-300 "
                              />
                            </div>
                            {/* <div className="pb-6">
                              <AsyncReactSelect
                                selectedValue={selectedValue}
                                setSelectedValue={setSelectedValue}
                                fetchData={fetchAllFeature}
                                placeholder="Select a property feature"
                                label="Features"
                                isMulti
                              />
                            </div> */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="pb-4">
                                <CustomSelect
                                  label="Country"
                                  selected={selectedCountry}
                                  setSelected={setSelectedCountry}
                                  data={getNigeria}
                                  withImage={false}
                                  placeholder={
                                    property?.data?.country?.name ||
                                    "Select Country"
                                  }
                                />
                              </div>

                              <div className="pb-4">
                                <CustomSelect
                                  label="State"
                                  selected={selectedState}
                                  setSelected={setSelectedState}
                                  data={states}
                                  withImage={false}
                                  placeholder={
                                    property?.data?.state?.name ||
                                    "Select your state"
                                  }
                                />
                              </div>
                              <div className="pb-4">
                                <CustomSelect
                                  label="City"
                                  selected={selectedCities}
                                  setSelected={setSelectedCities}
                                  data={cities}
                                  withImage={false}
                                  placeholder={
                                    property?.data?.city?.name ||
                                    "Select your city.."
                                  }
                                />
                              </div>
                            </div>
                            <div className="">
                              {/*pb-6 <AsyncReactSelect
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                            fetchData={fetchProductTags}
                            placeholder="Select a product tags"
                            label="Product Tags"
                          /> */}
                            </div>

                            <TextArea
                              name="description"
                              label=" Description"
                              placholder="Add more descriptions to your property..."
                            />
                          </div>
                          {/* </ScrollArea> */}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t">
                      <div className="flex items-center gap-3 justify-end">
                        {/* <Button
                          size="xs"
                          //   onClick={() => setOpenModal(false)}
                          outline
                          color="error"
                        >
                          Cancel
                        </Button>{" "}
                        <Button type="submit" size="xs">
                          Continue
                        </Button> */}
                        <Button
                          type="submit"
                          disabled={loading}
                          className=" justify-center"
                          size="md"
                        >
                          {loading ? (
                            <div className="inline-flex items-center gap-3">
                              <SmallSpinner />
                              <span>Creating...</span>
                            </div>
                          ) : (
                            "Update Property"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </HookForm>
              </div>
            </div>
          )}
        </div>
      </>
      {loading && <AnimateLoader />}

      {showImageModal && (
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
                  Image Preview
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
              <div className="p-4 md:p-5 relative max-h-[350px] lg:max-h-[650px] overflow-hidden">
                {/* <img
                  className="rounded  max-w-full max-h-[350px] lg:max-h-[650px]"
                  // src={`${imagePreview}`}
                  src={allImagesFiles[currentImageIndex]}
                  alt="image-preview"
                /> */}
                <img
                  className="w-full h-full object-cover rounded  lg:min-h-[450px]"
                  src={allImagesFiles[currentImageIndex]}
                  alt="image-preview"
                />
                <>
                  <button
                    type="button"
                    className="absolute top-0 start-3 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={goToPreviousImage}
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                      <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                      <span className="sr-only">Previous</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="absolute top-0 end-3 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={goToNextImage}
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                      <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span className="sr-only">Next</span>
                    </span>
                  </button>
                </>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <>
          <Notification
            message="Are you sure you want to delete this property image?"
            type="warning"
            onCancel={() => setShowDeletePopup(false)}
            onApprove={() => {
              handleImageDelete();
              // setShowDeletePopup(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default EditProperty;
