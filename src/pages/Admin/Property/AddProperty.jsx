/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "../../../components/forms/Button";
import HookForm from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { TextArea } from "../../../components/forms/TextArea";
import SmallSpinner from "../../../components/Loading/SmallSpinner";
import ImageUpload from "../../../components/forms/Upload/ImageUpload";

import DashboardHeading from "../../../layout/DashboardHeading";

const AddProperty = ({ loading }) => {
  const [imagesFile, setImagesFile] = useState([]);
  const schema = () => {};
  const defaultFormValue = {
    name: "",
    brand_id: "",
    min_selling_price: "",
    model: "",
    warranty: "",
    sku: "",
    listing_price: "",
    short_description: "",
    long_description: "",
    whats_in_the_box: "",
    status: "",
  };

  const onSubmit = async (data) => {
    console.log("Form data", data);

    // const filteredFormData = {
    //   name: data.name,
    //   brand_id: data.brand_id,
    //   category_id: selectedCategory?.id,
    //   listing_price: data?.listing_price,
    //   min_selling_price: data.min_selling_price,
    //   model: data.model,
    //   warranty: selectedWarranty?.warranty,
    //   sku: data.sku,
    //   short_description: data.short_description,
    //   long_description: data.long_description,
    //   whats_in_the_box: data?.whats_in_the_box,
    //   imgs: imagesFile,
    //   attributes: [],
    //   tags: selectedTags,
    //   stock_item: data?.stock_item ? 1 : 0,
    //   status: data?.status ? 1 : 0,
    // };

    // console.log("filtered data", filteredFormData);
    // try {
    //   const result = await dispatch(
    //     addNewProduct(filteredFormData)
    //   ).unwrap();
    //   // console.log("Product result: ", result);

    //   if (result.status >= 200 && result.status <= 300) {
    //     toast.success("Product created successfully");
    //     navigate("/admin/product/inventory/");
    //   }
    // } catch (error) {
    //   console.error("Create Error:", error);
    //   navigate("/admin/product/inventory/");
    //   if (error?.errors) {
    //     const errorMessages = Object.values(error?.errors)
    //       .flat()
    //       .join(", ");
    //     toast.error(errorMessages, { duration: 6000 });
    //   }
    // }
  };
  return (
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
            <div className="">
              <ImageUpload images={imagesFile} setImages={setImagesFile} />
            </div>
          </div>
          <div className="">
            <HookForm
              defaultValues={defaultFormValue}
              onSubmit={onSubmit}
              schema={schema}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Input
                              name="listing_price"
                              label="Category"
                              placeholder="Select room type"
                              //   type="number"
                            />
                          </div>
                          <div className="pt-6">
                            <Input
                              name="model"
                              //   label="Model #"
                              placeholder="Enter price"
                            />
                          </div>
                        </div>
                        <Input
                          name="name"
                          //   label="Product Name"
                          placeholder="Enter property location or address"
                        />
                        <Input
                          name="name"
                          label="Property Name"
                          placeholder="Enter the name given to this room"
                        />

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
  );
};

export default AddProperty;
