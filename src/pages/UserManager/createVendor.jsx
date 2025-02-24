import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DropdownComponent from "../../components/StateSelection";

const CreateVendor = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const { handleSubmit } = useForm();
  const [docx, setDocx] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [townId, setTownId] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    store: "",
    address: "",
    country: "",
    city: "",
    state: "",
    email: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    businessType: "",
    nationalIdentificationNumber: "",
    taxIdentificationNumber: "",
    cacRegistrationNumber: "",
  };

  const [createVendorDetails, setCreateVendorDetails] = useState(initialValues);

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    store,
    country,
    // state,
    // city,
    address,
    alternatePhoneNumber,
    businessType,
    nationalIdentificationNumber,
    taxIdentificationNumber,
    cacRegistrationNumber,
  } = createVendorDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateVendorDetails({ ...createVendorDetails, [name]: value });
  };

  const handleFileUpload = (e) => {
    console.log(e.target.files);
    const docx = e.target.files[0];
    setDocx(docx);
  };

  const handleStateInfo = useCallback((data) => {
    console.log({ data });
    setState(data.state);
    setCity(data.cityName);
    setTown(data.town);
    setTownId(data.townId);
    console.log(city, "checking state");
  }, []);

  const handleCreateVendor = () => {
    setLoading(true);
    const url = `${apiURL}/vendors`;
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("store", store);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("town", town);
    formData.append("townId", townId);
    formData.append("address", address);
    formData.append("alternatePhoneNumber", alternatePhoneNumber);
    formData.append("businessType", businessType);
    formData.append(
      "nationalIdentificationNumber",
      nationalIdentificationNumber
    );
    formData.append("taxIdentificationNumber", taxIdentificationNumber);
    formData.append("cacRegistrationNumber", cacRegistrationNumber);
    formData.append("cacCertificate", docx);
    formData.append("accountName", "");
    formData.append("accountNumber", "");
    formData.append("bankName", "");

    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage("Vendor created successfully!");
          setCreateVendorDetails(initialValues);
          setDocx({});
          setState("");
          setCity("");
          setTown("");
        }
        console.log(response, "response from creating data");
      })
      .catch((error) => {
        console.error("There was an error creating the vendor!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="w-full p-5 border bg-white overflow-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="my-4 font-primarySemibold text-xl md:text-2xl">
            Create a new Vendor
          </div>
          {successMessage && (
            <div className="w-full md:w-[70%] mb-4 p-4 text-green-700 bg-green-100 border border-green-200 rounded font-primaryRegular">
              {successMessage}
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleCreateVendor)}
            className="w-full md:w-[70%] font-primaryRegular text-[#0C1415]"
          >
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label className="tracking-wide font-medium mb-2">
                  First Name
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="tracking-wide font-medium mb-2">
                  Last Name
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="tracking-wide font-medium mb-2">
                Shop Name
              </label>
              <input
                type="text"
                name="store"
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                placeholder="CAC registered name"
                value={store}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="tracking-wide font-medium mb-2">
                Shop Address
              </label>
              <input
                type="text"
                name="address"
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                placeholder="Enter location here"
                value={address}
                onChange={handleChange}
              />
            </div>
            {/* <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                <label
                  className="tracking-wide font-medium mb-2"
                  htmlFor="grid-city"
                >
                  City
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  id="grid-city"
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={city}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-4 md:mb-2">
                <label
                  className="tracking-wide font-medium mb-2"
                  htmlFor="grid-state"
                >
                  State
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  id="grid-state"
                  type="text"
                  placeholder="Enter State"
                  name="state"
                  value={state}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="tracking-wide font-medium mb-2"
                  htmlFor="grid-country"
                >
                  Country
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  id="grid-country"
                  type="text"
                  placeholder="Enter Country"
                  name="country"
                  value={country}
                  onChange={handleChange}
                />
              </div>
            </div> */}
            <DropdownComponent onForm={handleStateInfo} />
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label
                  className="tracking-wide font-medium mb-2"
                  htmlFor="grid-phone"
                >
                  Business Phone Number
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  id="grid-phone"
                  type="text"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="tracking-wide font-medium mb-2"
                  htmlFor="grid-alt"
                >
                  Alternate Phone Number
                </label>
                <input
                  className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                  id="grid-alt"
                  type="text"
                  name="alternatePhoneNumber"
                  value={alternatePhoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="tracking-wide font-medium mb-2">
                Business Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                placeholder="Input business email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="tracking-wide font-medium mb-2">
                Business Type
              </label>
              <input
                type="text"
                name="businessType"
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                placeholder="Ex: Fashion"
                value={businessType}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="tracking-wide font-medium mb-2">
                National Identification Number
              </label>
              <input
                type="text"
                name="nationalIdentificationNumber"
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                placeholder="Input NIN"
                value={nationalIdentificationNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="tracking-wide font-medium mb-2">
                Tax Identification Number
              </label>
              <input
                type="number"
                name="taxIdentificationNumber"
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                placeholder="Input TIN"
                value={taxIdentificationNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="tracking-wide font-medium mb-2">
                CAC Registration Number
              </label>
              <input
                type="number"
                name="cacRegistrationNumber"
                className="w-full bg-white border border-[#C1C6C5] p-4 leading-tight focus:outline-none placeholder:text-[#C1C6C5]"
                placeholder="Input CAC Number"
                value={cacRegistrationNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="tracking-wide font-medium mb-2">
                CAC Document
              </label>
              <input
                type="file"
                name="docx"
                onChange={handleFileUpload}
                multiple
                className="px-3"
              />
            </div>
            <div className="w-full flex items-center justify-center my-6">
              <button
                type="submit"
                className="w-[395px] h-[50px] bg-[#4CBD6B] rounded-xl text-white font-semibold flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateVendor;
