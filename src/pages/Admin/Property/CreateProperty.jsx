import { useEffect, useState } from "react";
import { Button } from "../../../components/forms/Button";
import HookForm from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { TextArea } from "../../../components/forms/TextArea";
import SmallSpinner from "../../../components/Loading/SmallSpinner";
import ImageUpload from "../../../components/forms/Upload/ImageUpload";

import DashboardHeading from "../../../layout/DashboardHeading";
import { FetchLocations } from "../../../Hooks/useFetchLocation";
import CustomSelect from "../../../components/forms/Select/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriess } from "../../../Redux/categories/categoriesThunk";
import { fetchRoomTypes } from "../../../Redux/roomtypes/roomtypesThunk";
// import AsyncReactSelect from "../../../components/forms/Select/AsyncReactSelect";
import { postData } from "../../../utils/api";
import { PropertySchema } from "../../../schema/propertySchema";
import toast from "react-hot-toast";
import AnimateLoader from "../../../components/Loading/AnimateLoader";
import { Link, useNavigate } from "react-router-dom";
import { MinusIcon, PlusIcon } from "../../../assets/SvgIcons";
import { Label } from "../../../components/forms/Label";
import PropertyFeatures from "./PropertyFeatures";
// import AnimateLoader from "../../../components/Loading/AnimateLoader";

const CreateProperty = () => {
  const [imagesFile, setImagesFile] = useState([]);
  // const [loadingImages, setLoadingImages] = useState(false);
  const [allImagesFiles, setAllImgesFiles] = useState([]);
  // console.log("imagesFile: ", imagesFile);
  console.log("All Upload ImagesFile: ", allImagesFiles);
  // console.log("loadingImages: ", loadingImages);

  const {
    countries,
    states,
    cities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCities,
    setSelectedCities,
    // loading,
    // error,
  } = FetchLocations();

  // console.log("selectedState:", selectedState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // const [selectedValue, setSelectedValue] = useState(null);

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
    name: "",
    address: "",
    price: "",
    description: "",
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

  const [storeMainFeature, setStoreMainFeature] = useState([]);
  console.log("FEATU:", storeMainFeature);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const handleSubmitFeature = (e) => {
    e.preventDefault();
    if (!name || !price) return; // simple validation

    const newFeature = {
      name: name.trim(),
      price: parseInt(price),
    };

    setFeatures([...features, newFeature]);
    setName("");
    setPrice("");
  };

  const [adultCount, setAdultCount] = useState(1);
  const [minorCount, setMinorCount] = useState(0);
  const [discount, setDiscount] = useState(0); // default at 50
  const [cautionFee, setCautionFee] = useState(0); // default at 50

  const increaseAdult = () => setAdultCount(adultCount + 1);
  const decreaseAdult = () => {
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
    }
  };

  const increaseMinor = () => setMinorCount(minorCount + 1);
  const decreaseMinor = () => {
    if (minorCount > 0) {
      setMinorCount(minorCount - 1);
    }
  };

  const [loading, setLoading] = useState(false); // Controls button loading state

  const handleSubmit = async (data) => {
    setLoading(true);

    // Step 1: Upload Images to Cloudinary

    if (imagesFile.length < 2) {
      toast.error("A minimum of 2 images must be uploaded.");
      setLoading(false);
      return;
    }
    if (imagesFile.length > 6) {
      toast.error("Image upload must not be more than 6");
      setLoading(false);
      return;
    }

    if (allImagesFiles?.length === 0) {
      const uploadPromises = imagesFile.map((image) =>
        uploadImageToCloudinary(image).catch((error) => {
          console.error("Error uploading image:", error);
          return null;
        })
      );

      const uploadedFiles = await Promise.all(uploadPromises);

      const successfulUploads = uploadedFiles.filter(Boolean);

      if (successfulUploads.length === 0) {
        toast.error("Image upload failed");
        setLoading(false);
        const imageUrls = successfulUploads.map((file) => file.secure_url);
        setAllImgesFiles(imageUrls);
        return;
      }
    }

    // Step 2: Submit Form Data
    const filteredFormData = {
      name: data.name,
      address: data.address,
      price: data?.price,
      description: data.description,
      features: storeMainFeature,
      room_type_id: selectedRoomType?.uuid,
      images: allImagesFiles,
      country_id: selectedCountry?.uuid,
      state_id: selectedState?.uuid,
      category_id: selectedCategory?.uuid,
      city_id: selectedCities?.uuid,
      caution_fee: cautionFee,
      adult_count: adultCount, // No. of adult it can accomodate
      minor_count: minorCount, // No. of minor/children it can accomodate
      discount: discount, // This is inform of percentage => 2%
    };

    try {
      const result = await postData(
        `/bookacrib-api-routes/v1/properties/create-property`,
        filteredFormData
      );

      if (result.status >= 200 && result.status <= 300) {
        toast.success(result?.message);
        navigate("/user/property/all-property");
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
      setLoading(false);
    }
  };

  // const UploadImagesToCloud = async (acceptedFiles) => {
  //   if (acceptedFiles.length > 6) {
  //     toast.error("Image upload must not be more than 6");
  //     return;
  //   }
  //   setLoadingImages(true);

  //   const uploadPromises = acceptedFiles.map((image) =>
  //     uploadImageToCloudinary(image).catch((error) => {
  //       console.error("Error uploading image:", error);
  //       return null;
  //     })
  //   );

  //   const uploadedFiles = await Promise.all(uploadPromises);
  //   const successfulUploads = uploadedFiles.filter(Boolean);

  //   console.log("Uploaded images:", successfulUploads);

  //   const imageUrls = successfulUploads.map((file) => file.secure_url);
  //   setAllImgesFiles(imageUrls);
  //   setLoadingImages(false);
  // };

  // const onSubmit = async (data) => {
  //   // console.log("Form data", data);
  //   if (allImagesFiles.length == 0) {
  //     return;
  //   }

  //   const filteredFormData = {
  //     name: data.name,
  //     address: data.address,
  //     price: data?.price,
  //     description: data.description,

  //     features: featureFilter,
  //     room_type_id: selectedRoomType?.uuid,
  //     images: allImagesFiles,
  //     country_id: selectedCountry?.uuid,
  //     state_id: selectedState?.uuid,
  //     category_id: selectedCategory?.uuid,
  //   };

  //   console.log("filtered data", filteredFormData);
  //   // "";
  //   try {
  //     const result = await postData(
  //       `/bookacrib-api-routes/v1/properties/create-property`,
  //       filteredFormData
  //     );

  //     console.log("property result: ", result);

  //     if (result.status >= 200 && result.status <= 300) {
  //       toast.success(result?.message);
  //       // navigate("/admin/product/inventory/");
  //     }
  //   } catch (error) {
  //     console.error("Create Error:", error);
  //     // navigate("/admin/product/inventory/");
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
  //   }
  // };
  return (
    <div>
      <>
        <div className="hidden lg:flex">
          <DashboardHeading
            fixed
            title="Add Property"
            description=" Overview of the properties bookings etc"
          />
        </div>

        <div className=" space-y-6">
          <div className="lg:hidden flex">
            <DashboardHeading
              title="Add Property"
              description=" Overview of the properties bookings etc"
            />
          </div>
          <div className="p-3 border border-gray-300 rounded-md">
            <div className=" flex items-center justify-between gap-4 flex-wrap ">
              <div className=" lg:w-[65%]"></div>
              <div className="flex items-center gap-4">
                {/* <Button>Add Property</Button> */}
                <Link to="/crib-owner/property">
                  <Button color="primaryAlt">Back to Property</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="px-4 py-2.5 text-xl font-semibold text-dark-100 bg-gray-100 ">
            <p>Add New Property</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="">
              <PropertyFeatures
                storeMainFeature={storeMainFeature}
                setStoreMainFeature={setStoreMainFeature}
              />
              {/* <div className="max-w-md mx-auto p-6">
                <form onSubmit={handleSubmitFeature} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Feature Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                      placeholder="Enter feature name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Feature Price
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                      placeholder="Enter feature price"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Add Feature
                  </button>
                </form>

             
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-4">Features:</h2>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(features, null, 2)}
                  </pre>
                </div>
              </div> */}
              <div className="pt-6">
                <ImageUpload images={imagesFile} setImages={setImagesFile} />
              </div>

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
                                placeholder="Select Category"
                              />
                            </div>
                            <div className="pb-4">
                              <CustomSelect
                                label="Room Type"
                                selected={selectedRoomType}
                                setSelected={setSelectedRoomType}
                                data={roomtypes?.data}
                                withImage={false}
                                placeholder="Select Room Type"
                              />
                            </div>
                          </div>
                          <Input
                            name="price"
                            // label="Propery Price"
                            type="number"
                            placeholder="Enter price"
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
                              onChange={(e) => setCautionFee(e.target.value)}
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
                              onChange={(e) => setDiscount(e.target.value)}
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
                          </div>
                          <p>{JSON.stringify(featureFilter)}</p> */}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="pb-4">
                              <CustomSelect
                                label="Country"
                                selected={selectedCountry}
                                setSelected={setSelectedCountry}
                                data={[countries]}
                                withImage={false}
                                placeholder="Select Country"
                              />
                            </div>

                            <div className="pb-4">
                              <CustomSelect
                                label="State"
                                selected={selectedState}
                                setSelected={setSelectedState}
                                data={states?.data?.states}
                                withImage={false}
                                placeholder="Select your state"
                              />
                            </div>
                            <div className="pb-4">
                              <CustomSelect
                                label="City"
                                selected={selectedCities}
                                setSelected={setSelectedCities}
                                data={cities?.data?.cities}
                                withImage={false}
                                placeholder="Select your city.."
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

export default CreateProperty;
