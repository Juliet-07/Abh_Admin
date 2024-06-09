import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateVendor = () => {
  const navigate = useNavigate;
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  //   console.log(token,"token")
  const { handleSubmit } = useForm();

  const initialValues = {
    firstName: "",
    lastName: "",
    store: "",
    country: "",
    city: "",
    state: "",
    // dob: "2024-06-08T14:15:58.631Z",
    email: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    businessType: "",
    nationalIdentificationNumber: "",
    taxIdentificationNumber: "",
    cacRegistrationNumber: "",
  };

  const [createVendorDetails, setCreateVendorDetails] = useState(initialValues);

  //   const { email, password } = loginDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateVendorDetails({ ...createVendorDetails, [name]: value });
  };

  const [loading, setLoading] = useState(false);
  const handleCreateVendor = async () => {
    setLoading(true);
    const url = `${apiURL}/vendors`;
    try {
      const response = await axios.post(url, createVendorDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(response, "response");
      // navigate("/dashboard"); // Navigate to dashboard on successful login
    } catch (error) {
      console.error("Error in API call:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full p-5 border bg-white overflow-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="my-4 font-primarySemibold text-xl md:text-2xl">
          Create a new Vendor
        </div>
        <form className="w-full md:w-[70%] font-primaryRegular text-[#0C1415]">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="tracking-wide font-medium mb-2"
                for="grid-first-name"
              >
                First Name
              </label>
              <input
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                id="grid-first-name"
                type="text"
                placeholder="Enter First Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="tracking-wide font-medium mb-2"
                for="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                id="grid-last-name"
                type="text"
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="tracking-wide font-medium mb-2">Shop Name</label>
            <input
              type="text"
              name=""
              className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
              placeholder="CAC registered name"
            />
          </div>
          <div className="mb-4">
            <label className="tracking-wide font-medium mb-2">
              Shop Address
            </label>
            <input
              type="text"
              name=""
              className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
              placeholder="Enter location here"
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
              <label className="tracking-wide font-medium mb-2" for="grid-city">
                City
              </label>
              <input
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                id="grid-city"
                type="text"
                placeholder="Enter City"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
              <label
                className="tracking-wide font-medium mb-2"
                for="grid-state"
              >
                State
              </label>
              <input
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                id="grid-state"
                type="text"
                placeholder="Enter State"
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label
                className="tracking-wide font-medium mb-2"
                for="grid-country"
              >
                Country
              </label>
              <input
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                id="grid-country"
                type="text"
                placeholder="Enter State"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="tracking-wide font-medium mb-2"
                for="grid-phone"
              >
                Business Phone Number
              </label>
              <input
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                id="grid-phone"
                type="text"
                // placeholder="Enter First Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="tracking-wide font-medium mb-2" for="grid-alt">
                Alternate Phone Number
              </label>
              <input
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                id="grid-alt"
                type="text"
                // placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="tracking-wide font-medium mb-2">
              Business Email
            </label>
            <input
              type="text"
              name=""
              className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
              placeholder="Input business email"
            />
          </div>
          <div className="mb-4">
            <label className="tracking-wide font-medium mb-2">
              Business Type
            </label>
            <input
              type="text"
              name=""
              className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
              placeholder="Ex: Fashion"
            />
          </div>
          <div className="mb-4">
            <label className="tracking-wide font-medium mb-2">
              National Identification Number
            </label>
            <input
              type="text"
              name=""
              className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
              placeholder="Input NIN"
            />
          </div>
          <div className="mb-4">
            <label className="tracking-wide font-medium mb-2">
              Tax Identification Number
            </label>
            <input
              type="number"
              name=""
              className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
              placeholder="Input TIN"
            />
          </div>
          <div className="w-full flex items-center justify-center my-6">
            <button className="w-[395px] h-[50px] bg-[#4CBD6B] rounded-xl text-white font-semibold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVendor;
