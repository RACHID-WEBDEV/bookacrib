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
import { getData, patchData, postData } from "../../../utils/api";
import { PropertySchema } from "../../../schema/propertySchema";
import toast from "react-hot-toast";
import AnimateLoader from "../../../components/Loading/AnimateLoader";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProperty } from "../../../Redux/property/propertyThunk";
// import AnimateLoader from "../../../components/Loading/AnimateLoader";
import CryptoJS from "crypto-js";

const EditProperty = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  console.log("status: ", status);

  const navigate = useNavigate();
  const [imagesFile, setImagesFile] = useState([]);
  // const [loadingImages, setLoadingImages] = useState(false);
  const [allImagesFiles, setAllImagesFiles] = useState([]);
  console.log("imagesFile: ", imagesFile);
  console.log("All Upload ImagesFile: ", allImagesFiles);
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

  useEffect(() => {
    dispatch(fetchProperty(uuid));
  }, [uuid, dispatch]);
  const {
    propertys,
    property,
    loading: loadingProperty,
    error,
  } = useSelector((state) => state.properties);

  // console.log("property: ", property?.data?.images);

  useEffect(() => {
    // Set allImagesFiles once property data is loaded
    if (property?.data?.images) {
      setAllImagesFiles(property.data.images);
    }
  }, [property]);

  const {
    countries,
    states,
    // cities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    // selectedCities,
    // setSelectedCities,
    // loading,
    // error,
  } = FetchLocations();

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

  // const getState = defaultState?.data?.find(
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

  const [selectedValue, setSelectedValue] = useState(property?.data?.features);

  const featureFilter = selectedValue?.map((feature) => ({
    name: feature.name,
    price: feature.price,
  }));
  // console.log("setSelectedValue", selectedValue);

  // console.log("getPermissionsId", featureFilter);

  const FEATURE_URL =
    "/bookacrib-api-routes/v1/features/list-features?limit=100";

  const fetchAllFeature = async () => {
    try {
      const response = await getData(FEATURE_URL);
      return response?.data;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      // return rejectWithValue(errorMessage?.response?.data);
    }
  };
  const defaultFormValue = {
    name: property?.data?.name,
    address: property?.data?.address,
    price: property?.data?.price,
    description: property?.data?.description,
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
    // const parts = url.split("/");
    // const publicIdWithExtension = parts[parts.length - 1];
    // return publicIdWithExtension.split(".")[0];
  };

  const deleteImageFromCloudinary = async (url) => {
    const publicId = extractPublicId(url);

    try {
      // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
      // Replace YOUR_API_KEY and YOUR_API_SECRET with your Cloudinary credentials
      const cloudName = "dwpe6s8vr"; // dwpe6s8vr "YOUR_CLOUD_NAME";
      const apiKey = "115111542838195"; // 115111542838195 "YOUR_API_KEY";
      const apiSecret = "QXmfLjMnkM_22RoR2OMYs94Hnug"; // QXmfLjMnkM_22RoR2OMYs94Hnug "YOUR_API_SECRET";

      // Cloudinary API URL for deleting images
      const url = ` https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

      // Base64 encode the API key and secret for Basic Auth
      const authHeader = "Basic " + btoa(`${apiKey}:${apiSecret}`);

      // Send the delete request
      const response = await axios.post(
        url,
        { public_id: publicId }, // Request body
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      if (response.data.result === "ok") {
        setStatus("Image deleted successfully");
      } else {
        setStatus("Failed to delete image");
      }
    } catch (error) {
      setStatus(`Error:${error.message}`);
    }

    // try {
    //   const res = await fetch(
    //     `https://api.cloudinary.com/v1_1/dwpe6s8vr/image/destroy`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ public_id: publicId }),
    //     }
    //   );
    //   const result = await res.json();
    //   if (result.result === "ok") {
    //     console.log(`Deleted image: ${url}`);
    //     return true;
    //   } else {
    //     console.error(`Failed to delete image: ${url}`);
    //     return false;
    //   }
    // } catch (error) {
    //   console.error("Error deleting image:", error);
    //   return false;
    // }
  };

  // const deleteImageFromCloudinary = async (imageUrl) => {
  //   const publicId = extractPublicId(imageUrl);
  //   const timestamp = Math.floor(Date.now() / 1000);
  //   // const signature = crypto
  //   //   .createHash("sha1")
  //   //   .update(
  //   //     `public_id=${publicId}&timestamp=${timestamp}${cloudinaryConfig.apiSecret}`
  //   //   )
  //   //   .digest("hex");
  //   const signature = CryptoJS.SHA1(
  //     `public_id=${publicId}&timestamp=${timestamp}${cloudinaryConfig.apiSecret}`
  //   ).toString();

  //   try {
  //     const response = await axios.post(
  //       cloudinaryConfig.apiEndpoint,
  //       {
  //         public_id: publicId,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Api-Key": cloudinaryConfig.apiKey,
  //           "X-Api-Timestamp": timestamp,
  //           "X-Api-Signature": signature,
  //         },
  //       }
  //     );

  //     if (response.data.result === "ok") {
  //       console.log(`Deleted image: ${imageUrl}`);
  //       return true;
  //     } else {
  //       console.error(`Failed to delete image: ${imageUrl}`, response.data);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Error deleting image:", error);
  //     return false;
  //   }
  // };
  const handleSubmit = async (data) => {
    setLoading(true);

    // Step 1: Check and delete old images if needed
    const deletePromises = allImagesFiles.map(deleteImageFromCloudinary);
    await Promise.all(deletePromises);

    // Step 2: Validate new images
    if (imagesFile.length < 2 || imagesFile.length > 6) {
      toast.error("Please upload between 2 to 6 images.");
      setLoading(false);
      return;
    }

    // Step 3: Upload new images
    const uploadPromises = imagesFile.map((image) =>
      uploadImageToCloudinary(image).catch(console.error)
    );
    const uploadedFiles = await Promise.all(uploadPromises);
    const imageUrls = uploadedFiles
      .filter(Boolean)
      .map((file) => file.secure_url);

    if (!imageUrls.length) {
      toast.error("Image upload failed");
      setLoading(false);
      return;
    }

    // Step 4: Submit form with new image URLs
    // const filteredFormData = { ...data, images: imageUrls };
    try {
      const result = await patchData(
        `bookacrib-api-routes/v1/properties/update-property-features-images-by-action?id=${uuid}`,
        { action: "images", images: imageUrls }
        // filteredFormData
      );
      if (result.status >= 200 && result.status <= 300) {
        toast.success(result.message);
        navigate("/admin/property/all-property");
      }
    } catch (error) {
      // Error handling code as before
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (data) => {
  //   setLoading(true);

  //   // Step 1: Upload Images to Cloudinary

  //   if (imagesFile.length < 2) {
  //     toast.error("A minimum of 2 images must be uploaded.");
  //     setLoading(false);
  //     return;
  //   }
  //   if (imagesFile.length > 6) {
  //     toast.error("Image upload must not be more than 6");
  //     setLoading(false);
  //     return;
  //   }

  //   const uploadPromises = imagesFile.map((image) =>
  //     uploadImageToCloudinary(image).catch((error) => {
  //       console.error("Error uploading image:", error);
  //       return null;
  //     })
  //   );

  //   const uploadedFiles = await Promise.all(uploadPromises);
  //   const successfulUploads = uploadedFiles.filter(Boolean);

  //   if (successfulUploads.length === 0) {
  //     toast.error("Image upload failed");
  //     setLoading(false);
  //     return;
  //   }

  //   const imageUrls = successfulUploads.map((file) => file.secure_url);
  //   setAllImagesFiles(imageUrls);

  //   // Step 2: Submit Form Data
  //   const filteredFormData = {
  //     name: data.name,
  //     address: data.address,
  //     price: data?.price,
  //     description: data.description,
  //     features: featureFilter,
  //     room_type_id: selectedRoomType?.uuid
  //       ? selectedRoomType?.uuid
  //       : property?.data?.roomType?.uuid,
  //     images: imageUrls,
  //     country_id: selectedCountry?.uuid
  //       ? selectedCountry?.uuid
  //       : property?.data?.country?.uuid,
  //     state_id: selectedState?.uuid
  //       ? selectedState?.uuid
  //       : property?.data?.state?.uuid,
  //     category_id: selectedCategory?.uuid
  //       ? selectedCategory?.uuid
  //       : property?.data?.category?.uuid,
  //   };

  //   try {
  //     const result = await postData(
  //       `/bookacrib-api-routes/v1/properties/create-property`,
  //       filteredFormData
  //     );

  //     if (result.status >= 200 && result.status <= 300) {
  //       toast.success(result?.message);
  //       navigate("/admin/property/all-property");
  //     }
  //   } catch (error) {
  //     console.error("Create Error:", error);
  //     if (
  //       (error?.response?.data?.status >= 400 &&
  //         error?.response?.data?.status <= 499 &&
  //         error?.response?.data?.errors) ||
  //       (error?.response?.data?.status_code >= 400 &&
  //         error?.response?.data?.status_code <= 499 &&
  //         error?.response?.data?.errors)
  //     ) {
  //       const errorMessages = Object.values(error?.response?.data?.errors)
  //         .flat()
  //         .join(", ");
  //       toast.error(errorMessages, { duration: 6000 });
  //     } else {
  //       toast.error(error?.response?.data?.message, { duration: 6000 });
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
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
                <Button>Add Property</Button>

                <Button color="primaryAlt">Back to Property</Button>
              </div>
            </div>
          </div>
          <div className="px-4 py-2.5 text-xl font-semibold text-dark-100 bg-gray-100 ">
            <p>Add New Property</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="">
              <ImageUpload images={imagesFile} setImages={setImagesFile} />

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
                          />

                          <div className="pb-6">
                            <AsyncReactSelect
                              selectedValue={selectedValue}
                              setSelectedValue={setSelectedValue}
                              fetchData={fetchAllFeature}
                              placeholder="Select a property feature"
                              label="Features"
                              isMulti
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="pb-4">
                              <CustomSelect
                                label="Country"
                                selected={selectedCountry}
                                setSelected={setSelectedCountry}
                                data={[countries]}
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
                                data={states?.data?.states}
                                withImage={false}
                                placeholder={
                                  property?.data?.state?.name ||
                                  "Select your state"
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
                          "Upload for  Approve"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </HookForm>
            </div>
          </div>
        </div>
      </>
      {loading && <AnimateLoader />}
    </div>
  );
};

export default EditProperty;
