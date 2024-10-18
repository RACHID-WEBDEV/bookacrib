/* eslint-disable react/prop-types */
import { useState } from "react";
// import { Button } from "../../../components/forms/Button";
import HookForm from "../../components/forms/Form";
import { Input } from "../../components/forms/Input";
// import { TextArea } from "../../components/forms/TextArea";
import SmallSpinner from "../../components/Loading/SmallSpinner";
// import ImageUpload from "../../components/forms/Upload/ImageUpload";
import { Button } from "../../components/forms/Button";

import DashboardHeading from "../../layout/DashboardHeading";
import Uploader from "../../components/forms/Upload/uploader";
import { CreateCompanySchema } from "../../schema/authSchema";
import { FetchLocations } from "../../Hooks/useFetchLocation";
import CustomSelect from "../../components/forms/Select/CustomSelect";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { postData } from "../../utils/api";

const CreateCompany = ({ loading }) => {
  // const [imagesFile, setImagesFile] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const navigate = useNavigate();
  console.log("image file", imageFile);
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

  // console.log("countries:", countries);
  // console.log("first country", getNigeria);
  const defaultFormValue = {
    name: "",
    // brand_id: "",
    // min_selling_price: "",
    // model: "",
    // warranty: "",
    // sku: "",
    // listing_price: "",
    // short_description: "",
    // long_description: "",
    // whats_in_the_box: "",
    // status: "",
  };

  const onSubmit = async (data) => {
    console.log("Form data", data);

    const filteredFormData = {
      name: data.name,
      phone_number: data.phone_number,
      email: data?.email,
      address: data.address,
      next_of_kin_name: data?.next_of_kin_name,
      url: data?.url,
      country: selectedCountry?.uuid,
      state: selectedState?.uuid,

      logo: imageFile,
    };

    console.log("filtered data", filteredFormData);
    try {
      // const result = await dispatch(addNewProduct(filteredFormData)).unwrap();
      // console.log("Product result: ", result);
      const response = await postData(
        "/v1/users/company/create-company?with[]=country&with[]=state&with[]=timezone",
        filteredFormData
      );
      if (response.status >= 200 && response.status <= 300) {
        toast.success("Company created successfully");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Create Error:", error);
      navigate("/admin/dashboard");
      if (
        error?.response?.data?.status >= 400 &&
        error?.response?.data?.status <= 499 &&
        error?.response?.data?.errors
      ) {
        const errorMessages = Object.values(error?.response?.data?.errors)
          .flat()
          .join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(error?.response?.data?.message, { duration: 6000 });
      }
    }
  };
  return (
    <>
      <div className="hidden lg:flex">
        <DashboardHeading
          fixed
          title="Create a Company"
          description=" Create a digital footprint for your property!"
        />
      </div>

      <div className=" space-y-6 p-4">
        <div className="lg:hidden flex">
          <DashboardHeading
            title="Add Property"
            description=" Overview of the properties bookings etc"
          />
        </div>
        <div className="p-3  rounded-md">
          <div className=" flex items-center justify-between gap-4 flex-wrap ">
            <div className=" lg:w-[45%]">
              <DashboardHeading
                title="Create Company"
                description="Take your property online! Showcase your listings, amenities, and expertise through a professional profile that connects you with interested buyers or renters. "
              />
            </div>
            <div className="flex items-center gap-4">
              {/* <Button>Create Company</Button> */}

              <Button color="primaryAlt">Back to Home</Button>
            </div>
          </div>
        </div>
        {/* <div className="px-4 py-2.5 text-xl font-semibold text-dark-100 bg-gray-100 ">
          <p>Add New Property</p>
        </div> */}

        <div className="grid grid-cols-1 gap-6 ">
          <div className="">
            <HookForm
              defaultValues={defaultFormValue}
              onSubmit={onSubmit}
              schema={CreateCompanySchema}
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
                        <div className="pt-6">
                          <Input
                            name="name"
                            label="Company Name"
                            placeholder="Enter a name here"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Input
                              name="email"
                              label="Email Address"
                              placeholder="Enter email address"
                              type="email"
                            />
                          </div>
                          <div className="">
                            <Input
                              name="phone_number"
                              label="Phone Number"
                              placeholder="Enter phone number"
                            />
                          </div>
                        </div>
                        <Input
                          name="address"
                          label="Address"
                          placeholder="Enter company/property location or address"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Input
                              name="next_of_kin_name"
                              label="Next of Kin Name"
                              placeholder="Enter next of kin name"
                            />
                          </div>
                          <div className="">
                            <Input
                              name="url"
                              label="Website URL"
                              placeholder="Enter website URL"
                            />
                          </div>
                        </div>
                        {/* <Input
                          name="name"
                          label="Property Name"
                          placeholder="Enter the name given to this room"
                        /> */}

                        <div className="">
                          {/*pb-6 <AsyncReactSelect
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                            fetchData={fetchProductTags}
                            placeholder="Select a product tags"
                            label="Product Tags"
                          /> */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>

                        {/* <TextArea
                          name="description"
                          label=" Description"
                          placholder="Add more descriptions to your property..."
                        /> */}
                        <div className="">
                          {/* <div className="">
                            <ImageUpload
                              images={imagesFile}
                              setImages={setImagesFile}
                            />
                          </div> */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Uploader
                              label="Logo"
                              files={imageFile}
                              setFiles={setImageFile}
                              className="max-w-[150px]"
                            />
                          </div>
                        </div>
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
                        "Create Company"
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
  );
};

export default CreateCompany;
