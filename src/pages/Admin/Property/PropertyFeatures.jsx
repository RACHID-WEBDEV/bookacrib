/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
import {
  DeleteIcon,
  EditIcon2,
  PlusIcon,
  // UploadIconImage,
} from "../../../assets/SvgIcons";

import { Tooltip } from "flowbite-react";
import { getData } from "../../../utils/api";
import AsyncReactSelect from "../../../components/forms/Select/AsyncReactSelect";
import { Button } from "../../../components/forms/Button";
import toast from "react-hot-toast";
import { Label } from "../../../components/forms/Label";

// import { ImageModal } from "../../../components/forms/Upload/ImageUpload";

function PropertyFeatures({
  // attributes,
  // setAttributes,
  storeMainFeature,
  setStoreMainFeature,
  updateDefaultAttribute,
}) {
  const [attributes, setAttributes] = useState([]);
  const [storeAllFeature, setStoreAllFeature] = useState([]);

  // const [storeMainFeature, setStoreMainFeature] = useState([]);
  // console.log("feature attr:", attributes);

  const [featurePrice, setFeaturePrice] = useState("");
  const [featureName, setFeatureName] = useState("");

  // const [selectedValue, setSelectedValue] = useState(null);

  const featureFilter = attributes?.map((feature) => ({
    // uuid: feature.uuid,
    name: feature.name,
    price: feature.price,
  }));

  // console.log("featureFilter", featureFilter);

  // useEffect(() => {
  //   setStoreMainFeature([...featureFilter, ...storeAllFeature]);
  // }, [featureFilter, storeAllFeature]);

  const FEATURE_URL =
    "/bookacrib-api-routes/v1/features/list-features?limit=100";

  const fetchAllFeature = async () => {
    try {
      const response = await getData(FEATURE_URL);
      // setStoreAttribute(response?.data);
      return response?.data;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      // return rejectWithValue(errorMessage?.response?.data);
    }
  };
  // console.log("ALL attributes: ", attributes);
  const [featureNameError, setFeatureNameError] = useState("");
  const [featurePriceError, setFeaturePriceError] = useState("");
  const normalizeFeatureName = (name) => name.toLowerCase().trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!featureName.trim()) {
      setFeatureNameError("Feature name is required");
      hasError = true;
    } else {
      setFeatureNameError("");
    }

    if (!featurePrice.trim() || isNaN(parseInt(featurePrice))) {
      setFeaturePriceError("Valid price is required");
      hasError = true;
    } else {
      setFeaturePriceError("");
    }

    if (hasError) return;

    const existingFeature = [...featureFilter, ...storeAllFeature].find(
      (feature) =>
        normalizeFeatureName(feature.name) === normalizeFeatureName(featureName)
    );
    if (existingFeature) {
      // Handle the case when the feature already exists
      console.log("Feature already exists");
      toast.error("Feature already exists");

      return;
    }
    const newAttribute = {
      // uuid: uuidv4(),
      name: featureName,
      price: parseInt(featurePrice),
    };
    setStoreAllFeature((prevFeatures) => {
      const filteredFeatures = prevFeatures.filter(
        (feature) => feature.name !== featureName
      );
      return [...filteredFeatures, newAttribute];
    });

    setFeaturePrice("");
    setFeatureName("");
  };

  // console.log("All Feature Store MAIN:", storeMainFeature);

  const prevFeatureFilter = useRef([]);
  const prevStoreAllFeature = useRef([]);

  useEffect(() => {
    if (
      JSON.stringify(featureFilter) !==
        JSON.stringify(prevFeatureFilter.current) ||
      JSON.stringify(storeAllFeature) !==
        JSON.stringify(prevStoreAllFeature.current)
    ) {
      if (featureFilter.length > 0 || storeAllFeature.length > 0) {
        const featureNames = [...featureFilter, ...storeAllFeature].map(
          (feature) => normalizeFeatureName(feature.name)
        );
        const hasDuplicates =
          featureNames.length !== new Set(featureNames).size;
        if (hasDuplicates) {
          console.log("Duplicate features exist");
          toast.error("Duplicate features exist remove feature");
        } else {
          setStoreMainFeature([...featureFilter, ...storeAllFeature]);
        }
      } else {
        setStoreMainFeature([]);
      }
      prevFeatureFilter.current = featureFilter;
      prevStoreAllFeature.current = storeAllFeature;
    }
  }, [featureFilter, storeAllFeature, setStoreMainFeature]);

  // useEffect(() => {
  //   if (
  //     JSON.stringify(featureFilter) !==
  //       JSON.stringify(prevFeatureFilter.current) ||
  //     JSON.stringify(storeAllFeature) !==
  //       JSON.stringify(prevStoreAllFeature.current)
  //   ) {
  //     if (featureFilter.length > 0 || storeAllFeature.length > 0) {
  //       setStoreMainFeature([...featureFilter, ...storeAllFeature]);
  //     }
  //     prevFeatureFilter.current = featureFilter;
  //     prevStoreAllFeature.current = storeAllFeature;
  //   }
  // }, [featureFilter, storeAllFeature]);

  // const handleDelete = (index) => {
  //   const updatedAttributes = storeMainFeature.filter(
  //     (attribute, i) => i !== index
  //   );
  //   setAttributes(updatedAttributes);
  //   // setStoreMainFeature(updatedAttributes);
  // };

  // EDIT PRICE INPUT

  const [editingIndex, setEditingIndex] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  const handleEdit = (index, price) => {
    setEditingIndex(index);
    setNewPrice(price);
  };

  const handleSave = (index) => {
    const updatedFeatures = storeMainFeature.map((feature, i) => {
      if (i === index) {
        return { ...feature, price: parseInt(newPrice) };
      }
      return feature;
    });
    setStoreMainFeature(updatedFeatures);
    setEditingIndex(null);
  };

  // EDIT PRICE INPUT END HERE

  const handleDelete = (name) => {
    const updatedFeatureFilter = featureFilter.filter(
      (feature) => feature.name !== name
    );
    const updatedStoreAllFeature = storeAllFeature.filter(
      (feature) => feature.name !== name
    );

    setAttributes(updatedFeatureFilter);
    setStoreAllFeature(updatedStoreAllFeature);
    setStoreMainFeature([...updatedFeatureFilter, ...updatedStoreAllFeature]);
  };

  return (
    <>
      <div className=" flex items-start w-full gap-6">
        <div className="relative bg-white rounded-2xl shadow  lg:w-full">
          <div className="flex items-center justify-between p-4 md:px-5 border-b rounded-t ">
            <div>
              <h1 className="text-base lg:text-lg font-semibold text-gray-900 ">
                Add Property Features
              </h1>
              <p className="text-gray-600 text-sm font-light">
                Customize the property features by editing the name and price
                based on your property.
              </p>
            </div>
          </div>

          <div className="text-gray-600 text-sm px-4 py-3 mt-2 mb-4 bg-gray-100 border-b flex items-center">
            <p className="w-[50%]">Feature Name</p>
            <p className="w-[50%]"> Price</p>
            {/* <p className="w-[10%]">Action</p> */}
          </div>
          <div className=" px-2 lg:px-4 xl:px-5">
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="pb-6">
                  <AsyncReactSelect
                    selectedValue={attributes}
                    setSelectedValue={setAttributes}
                    fetchData={fetchAllFeature}
                    placeholder="Select from admin property feature"
                    label="Default Features"
                    isMulti
                  />
                </div>
                {/* <p>{JSON.stringify(featureFilter)}</p> */}
                <Label
                  text={" Create your own feature Multiple features is allowed"}
                />
                <div className=" flex items-center  flex-wrap lg:flex-nowrap justify-between w-full gap-4  mt-6">
                  {/* <div className=" w-[45%]">
                  <div className="pb-6">
                    <AsyncReactSelect
                      selectedValue={selectedAtrribute}
                      setSelectedValue={setSelectedAtrribute}
                      fetchData={fetchProductAttrinutes}
                      placeholder="Select an attribute"
                      label="Product Attributes"
                    />
                  </div>
                </div> */}
                  <div className=" w-full">
                    <div className="lg:pb-4 w-full ">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Feature Name
                      </label>
                      <input
                        id="featureName"
                        type="text"
                        value={featureName}
                        onChange={(e) => setFeatureName(e.target.value)}
                        className={`mt-1 block w-full rounded-md border shadow-sm p-3 py-4 outline-none sm:text-sm ${
                          featureNameError
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {featureNameError && (
                        <p className="text-red-500 text-sm mt-1">
                          {featureNameError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="lg:pb-4 w-full ">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter Price
                      </label>
                      <input
                        id="featurePrice"
                        type="text"
                        value={featurePrice}
                        onChange={(e) => setFeaturePrice(e.target.value)}
                        className={`mt-1 block w-full rounded-md border shadow-sm p-3 py-4 outline-none sm:text-sm ${
                          featurePriceError
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {featurePriceError && (
                        <p className="text-red-500 text-sm mt-1">
                          {featurePriceError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-[10%] hidden lg:flex  pt-2">
                    <Button size="sm" type="submit" outline color="gray">
                      <PlusIcon className="w-7 h-7" />
                    </Button>
                  </div>
                </div>
                <div className="w-full lg:hidden flex  items-center justify-end py-4">
                  <Button
                    leftIcon={<PlusIcon className="w-5 h-5" />}
                    size="sm"
                    type="submit"
                    outline
                    color="gray"
                  >
                    Add Feature
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="max-h-[500px]  overflow-y-auto  px-2 lg:px-4 xl:px-5">
            {storeMainFeature?.map((attribute, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between gap-2 lg:gap-4 items-center mb-2"
                >
                  <div className="pb-4 w-full ">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Feature Name
                    </label>
                    <input
                      id="value"
                      type="text"
                      disabled
                      placeholder={attribute?.name}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 py-4 outline-none sm:text-sm"
                    />
                  </div>
                  <div className="pb-4 w-full ">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      id="value"
                      type="text"
                      value={
                        editingIndex === index ? newPrice : attribute?.price
                      }
                      onChange={(e) => setNewPrice(e.target.value)}
                      disabled={editingIndex !== index}
                      className={`mt-1 block w-full rounded-md border shadow-sm p-3 py-4 outline-none sm:text-sm ${
                        editingIndex === index
                          ? "border-gray-300"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    />
                  </div>
                  <div className="flex gap-3">
                    {editingIndex === index ? (
                      // <button
                      //   className="text-green-500 hover:text-green-700 cursor-pointer"
                      //   onClick={() => handleSave(index, attribute?.name)}
                      // >
                      //   Save
                      // </button>
                      <Button
                        onClick={() => handleSave(index, attribute?.name)}
                        size="xs"
                        color="success"
                      >
                        Save
                      </Button>
                    ) : (
                      <Tooltip content="Edit Price">
                        <button
                          className="text-blue-800 hover:text-blue-700 cursor-pointer"
                          onClick={() => handleEdit(index, attribute?.price)}
                        >
                          {/* Edit */}
                          <EditIcon2 />
                        </button>
                      </Tooltip>
                    )}
                    <Tooltip content="Remove ">
                      <div
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => handleDelete(attribute?.name)}
                      >
                        <DeleteIcon className="text-red-600 w-6 h-6" />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>{updateDefaultAttribute}</div>

      {/* {showImageModal && (
        <ImageModal
          // getImage={getImage}
          getImagePreview={getImagePreview}
          setshowImageModal={setshowImageModal}
        />
      )} */}
    </>
  );
}

export default PropertyFeatures;
