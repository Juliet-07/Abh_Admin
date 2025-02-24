import React, { useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Rate from "../../assets/rate.svg";
import Sales from "../../assets/sales.svg";
import Truck from "../../assets/truck.svg";
import Customer from "../../assets/customer.svg";
import Apples from "../../assets/apples.png";
import Mint from "../../assets/mint.png";
import Aquash from "../../assets/aquash.png";
import Pineapple from "../../assets/pineapple.png";
import { UserIcon, XIcon } from "@heroicons/react/outline";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import DropdownComponent from "../../components/StateSelection";

const VendorDetails = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const location = useLocation();
  const vendorDetails = location.state && location.state.vendor;
  console.log("Details", vendorDetails);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [status, setStatus] = useState(vendorDetails.status);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [townId, setTownId] = useState("");

  if (!vendorDetails) {
    return <div>No details available</div>;
  }

  const initialBusinessDetails = {
    address: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    email: "",
    businessType: "",
  };

  const [businessDetails, setBusinessDetails] = useState(
    initialBusinessDetails
  );

  const { address, phoneNumber, alternatePhoneNumber, email, businessType } =
    useState(businessDetails);

  const handleBusinessInfoChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails({ ...businessDetails, [name]: value });
  };

  const handleStateInfo = useCallback((data) => {
    console.log({ data });
    setState(data.state);
    setCity(data.cityName);
    setTown(data.town);
    setTownId(data.townId);
    // console.log(city, "checking state");
  }, []);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM DD, YYYY");
  };

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          bgColor: "bg-[#088D2D]/[12%]",
          textColor: "text-[#088D2D]",
          dotColor: "bg-[#088D2D]",
        };
      case "blocked":
        return {
          bgColor: "bg-[#FB1010]/[12%]",
          textColor: "text-[#FB1010]",
          dotColor: "bg-[#FB1010]",
        };
      case "pending":
        return {
          bgColor: "bg-[#FB1010]/[12%]",
          textColor: "text-[#FB1010]",
          dotColor: "bg-[#FB1010]",
        };
      case "inactive":
        return {
          bgColor: "bg-[#8A8D08]/[12%]",
          textColor: "text-[#8A8D08]",
          dotColor: "bg-[#8A8D08]",
        };
      case "deactivated":
        return {
          bgColor: "bg-[#F58634]/[12%]",
          textColor: "text-[#F58634]",
          dotColor: "bg-[#F58634]",
        };
      case "declined":
        return {
          bgColor: "bg-[#F58634]/[12%]",
          textColor: "text-[#F58634]",
          dotColor: "bg-[#F58634]",
        };
      default:
        return {
          bgColor: "bg-gray-200",
          textColor: "text-gray-800",
        };
    }
  };

  const { bgColor, textColor, dotColor } = getStatusStyles(
    vendorDetails.status
  );

  const manageVendorStatus = (vendorId) => {
    const url = `${apiURL}/vendors/block-status/${vendorId}`;
    setLoading(true);
    axios
      .patch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        console.log("Vendor status updated:", response.data);
        setShowModal(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating vendor status:", error);
        setLoading(false);
      });
  };

  const editBusinessInfo = async () => {
    setLoading(true);
    const url = `${apiURL}/vendors/update-profile`;
    const payload = {
      address: address,
      phoneNumber: phoneNumber,
      alternatePhoneNumber: alternatePhoneNumber,
      email: email,
      businessType: businessType,
      state: state,
      city: city,
      town: town,
      townId: townId.toString(),
    };
    try {
      const response = await axios.patch(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(response, "response");
      if (response.status === 200) {
        toast.success(response.data.data);
        setPreview(false);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center font-primaryRegular p-4">
          <div className="bg-white w-[186px] md:w-[500px] h-[46px] md:h-[120px] rounded-md text-center">
            <p className="md:text-lg font-semibold my-4">
              Vendor status updated successfully!
            </p>
            <button
              className="my-2 bg-[#4CBD6B] text-white py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showPreview && (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#000000a8] fixed z-[100] top-0 left-0 flex flex-col items-center font-primaryRegular">
          <div className="w-[90%] max-w-[679px] relative bg-white rounded-[10px] p-5 my-[5vh]">
            <b className="text-[16px] w-full text-center flex justify-center">
              Edit Business Info
            </b>
            <XIcon
              width={20}
              height={20}
              className="absolute right-[20px] top-[20px] cursor-pointer active:opacity-5"
              color="red"
              onClick={() => setPreview(false)}
            />
            <div className="w-full flex flex-row flex-wrap min-h-1 gap-2 mt-4"></div>

            {/* <p className="text-[16px] w-full">Shop Residing Country</p>
            <div className="w-full h-10 border mt-2 p-2 bg-white border-[#CFCBCB] flex flex-row justify-between">
              <input
                type="text"
                name=""
                id=""
                style={{ outline: "none" }}
                className="flex w-full border-none"
              />
            </div> */}
            <br />
            <p className="text-[16px] w-full">Shop Address</p>
            <div className="w-full h-10 border mt-2 p-2 bg-white border-[#CFCBCB] flex flex-row justify-between">
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleBusinessInfoChange}
                id=""
                style={{ outline: "none" }}
                className="flex w-full border-none"
              />
            </div>
            <br />
            {/* <div className="md:flex md:flex-row w-full gap-4">
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">City</p>
                <div className="w-full h-10 border mt-2 p-2 bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full border-none"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">State</p>
                <div className="w-full h-10 border mt-2 p-2 bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name=""
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full border-none"
                  />
                </div>
              </div>
            </div> */}
            <DropdownComponent onForm={handleStateInfo} />
            <br />
            <div className="md:flex flex-row w-full gap-4">
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">Business Phone Number</p>
                <div className="w-full h-10 border mt-2 p-2 bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleBusinessInfoChange}
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full border-none"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">Alternate Phone Number</p>
                <div className="w-full h-10 border mt-2 p-2 bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name="alternatePhoneNumber"
                    value={alternatePhoneNumber}
                    onChange={handleBusinessInfoChange}
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full border-none"
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="md:flex flex-row w-full gap-4">
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">Business Email</p>
                <div className="w-full h-10 border mt-2 p-2 bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleBusinessInfoChange}
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full border-none"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col w-full">
                <p className="text-[16px] w-full">Business Type</p>
                <div className="w-full h-10 border mt-2 p-2 bg-white border-[#CFCBCB] flex flex-row justify-between">
                  <input
                    type="text"
                    name="businessType"
                    value={businessType}
                    onChange={handleBusinessInfoChange}
                    id=""
                    style={{ outline: "none" }}
                    className="flex w-full border-none"
                  />
                </div>
              </div>
            </div>
            <br />

            <div className="w-full flex items-center justify-between my-6">
              <div>
                <button
                  onClick={editBusinessInfo}
                  className="md:w-[186px] w-[99px]  h-[46px] bg-[#4CBD6B] text-white rounded-[6px]"
                >
                  Edit
                </button>
              </div>

              <button
                onClick={() => {
                  setPreview(false);
                }}
                className="md:w-[186px] w-[99px]  h-[46px] bg-white text-[grey] border-[1px] rounded-[6px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-12 md:h-14 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
        Vendor Details
        {/* <button onClick={() => setPreview(true)} className="text-white bg-[#359E52] text-sm p-2 rounded-xl">
          Edit Vendor Details
        </button> */}
      </div>
      <div className="w-full my-4">
        <div className="w-full bg-white rounded-xl p-4 gap-6 flex flex-col md:flex-row md:items-stretch justify-between">
          {/* 1st Half */}
          <div className="p-4 font-primaryRegular border border-[#CFCBCB]">
            {/* Header info */}
            <div className="w-full md:w-[400px] h-[120px] rounded-2xl p-2 bg-[#8BCB90]/[12%] flex items-center justify-between gap-2">
              <div className="bg-[#455A64] w-10 md:w-14 h-10 md:h-14 text-white rounded-full md:text-2xl font-primarySemibold flex items-center justify-center">
                {vendorDetails.firstName[0].toUpperCase() +
                  vendorDetails.lastName[0].toUpperCase()}
              </div>
              <div className="grid gap-2 text-sm md:text-lg">
                <p className="font-primarySemibold">
                  {vendorDetails.firstName + " " + vendorDetails.lastName}
                </p>
                <p>{vendorDetails.email}</p>
                <p>{vendorDetails.phoneNumber}</p>
              </div>
            </div>
            {/* Other Info */}
            <div className="grid gap-5 my-4">
              <div>
                <div className="py-2 border-b border-b-[#CFCBCB] mb-2">
                  Shop Name
                </div>
                <p>{vendorDetails.store}</p>
              </div>
              <div>
                <div className="py-2 border-b border-b-[#CFCBCB] mb-2">
                  Status
                </div>
                <div
                  className={`h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                >
                  <div
                    className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                  />
                  <p className={`${textColor} text-xs`}>
                    {vendorDetails.status}
                  </p>
                </div>
              </div>
              <div>
                <div className="py-2 border-b border-b-[#CFCBCB] mb-2">
                  Data & Time Registered
                </div>
                <p>{formatDate(vendorDetails.created_at)}</p>
              </div>
              <div>
                <div className="py-2 border-b border-b-[#CFCBCB] mb-2">
                  Bank Account Details
                </div>
              </div>
              <div className="grid gap-4 text-sm md:text-lg">
                <div>
                  <b>Account Number:</b> {vendorDetails?.accountNumber}
                </div>
                <div>
                  <b>Account Name:</b> {vendorDetails?.accountName}
                </div>
                <div>
                  <b>Bank Name:</b> {vendorDetails?.bankName}
                </div>
              </div>
            </div>
          </div>

          {/* 2nd Half */}
          <div className="w-full md:w-[70%] flex flex-col gap-5 border border-[#CFCBCB] p-4 font-primaryRegular">
            {/* 1 */}
            {/* 4 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>Alternate Phone Number</p>
              <p>{vendorDetails.alternatePhoneNumber}</p>
            </div>
            {/* 2 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>Shop Residing Country</p>
              <p>{vendorDetails.country}</p>
            </div>
            {/* 3 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>Shop Address</p>
              <p>{vendorDetails.address}</p>
            </div>
            <div className="flex flex-col md:flex-row w-full md:gap-4">
              <div className="flex flex-col w-full">
                <p>State</p>
                <div className="border-b border-[#CFCBCB] py-2">
                  {vendorDetails?.state}
                </div>
              </div>
              <br />
              <div className="flex flex-col w-full">
                <p>City</p>
                <div className="border-b border-[#CFCBCB] py-2">
                  {vendorDetails?.city}
                </div>
              </div>
              <br />
              <div className="flex flex-col w-full">
                <p>Town</p>
                <div className="border-b border-[#CFCBCB] py-2">
                  {vendorDetails?.town}
                </div>
              </div>
            </div>
            {/* 4 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>Business Type</p>
              <p>{vendorDetails.businessType}</p>
            </div>
            {/* 5 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>National Identification Number</p>
              <p>{vendorDetails.nationalIdentificationNumber}</p>
            </div>
            {/* 6 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>Tax Identification Number</p>
              <p>{vendorDetails.taxIdentificationNumber}</p>
            </div>
            {/* 7 */}
            <div className="grid gap-2 border-b border-b-[#CFCBCB] py-2">
              <p>CAC Registration Number</p>
              <p>{vendorDetails.cacRegistrationNumber}</p>
            </div>
          </div>
        </div>
        {/* Product Information */}
        {/* <div className="w-full bg-white border border-[#CFCBCB] p-4 rounded-xl flex flex-col gap-4 font-primaryRegular">
          <p className="font-bold">Product Information</p>
          <div className="flex items-center gap-10">
            <div>
              <p>Product Categories</p>
              <p>{vendorDetails.businesstype}</p>
            </div>
            <div>
              <p>Total Product Listed</p>
              <p>12</p>
            </div>
          </div>
          <div>
            <p>Top Selling Products</p>
            <div className="flex flex-col items-center justify-center md:grid md:grid-cols-4 gap-4 my-4">
              <div className="w-full md:min-w-[232px] h-[100px] border border-[#CFCBCB] rounded-lg flex items-center justify-center gap-4 px-2">
                <img src={Apples} />
                <div className="text-sm">
                  <p>Apples</p>
                  <p>Grocery</p>
                </div>
                <div className="text-sm">
                  <p>30 units</p>
                  <p className="font-primaryThin">Sold</p>
                </div>
              </div>
              <div className="w-full md:min-w-[232px] h-[100px] border border-[#CFCBCB] rounded-lg flex items-center justify-center gap-4 px-2">
                <img src={Mint} />
                <div className="text-sm">
                  <p>Mint</p>
                  <p>Grocery</p>
                </div>
                <div className="text-sm">
                  <p>30 units</p>
                  <p className="font-primaryThin">Sold</p>
                </div>
              </div>
              <div className="w-full md:min-w-[232px] h-[100px] border border-[#CFCBCB] rounded-lg flex items-center justify-center gap-4 px-2">
                <img src={Aquash} />
                <div className="text-sm">
                  <p>Aquash</p>
                  <p>Grocery</p>
                </div>
                <div className="text-sm">
                  <p>30 units</p>
                  <p className="font-primaryThin">Sold</p>
                </div>
              </div>
              <div className="w-full md:min-w-[232px] h-[100px] border border-[#CFCBCB] rounded-lg flex items-center justify-center gap-4 px-2">
                <img src={Pineapple} />
                <div className="text-sm">
                  <p>Pineapples</p>
                  <p>Grocery</p>
                </div>
                <div className="text-sm">
                  <p>30 units</p>
                  <p className="font-primaryThin">Sold</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Performance Metrics */}
        {/* <div className="bg-white border border-[#CFCBCB] p-4 rounded-xl flex flex-col gap-10 font-primaryRegular">
          <p className="font-bold">Performance Metrics</p>
          <div className="flex flex-col items-center justify-center md:grid md:grid-cols-4 gap-5 md:gap-10">
            <div className="w-full md:min-w-[216px] h-[104px] border border-[#CFCBCB] rounded-lg p-4">
              <div className="w-full flex items-center justify-between">
                <p className="font-bold">4.5/5</p>
                <img src={Rate} />
              </div>
              <p>Average ratings</p>
            </div>
            <div className="w-full md:min-w-[216px] h-[104px] border border-[#CFCBCB] rounded-lg p-4">
              <div className="w-full flex items-center justify-between">
                <p className="font-bold">$2300</p>
                <img src={Sales} />
              </div>
              <p>Total Sales</p>
            </div>
            <div className="w-full md:min-w-[216px] h-[104px] border border-[#CFCBCB] rounded-lg p-4">
              <div className="w-full flex items-center justify-between">
                <p className="font-bold">2%</p>
                <img src={Truck} />
              </div>
              <p>Return Rate</p>
            </div>
            <div className="w-full md:min-w-[216px] h-[104px] border border-[#CFCBCB] rounded-lg p-4">
              <div className="w-full flex items-center justify-between">
                <p className="font-bold">0%</p>
                <img src={Customer} />
              </div>
              <p>Customer Compliance</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="my-2 w-full flex items-center justify-between">
        <Link
          to="/allVendors"
          className="w-[99px] md:w-[137px] h-10 md:h-[44px] border border-[#CFCBCB] font-primarySemibold rounded-lg flex items-center justify-center text-sm md:text-base"
        >
          Back
        </Link>
        <div className="flex gap-4">
          {/* <button className="w-[100px] md:w-[180px] h-10 md:h-[46px] bg-[#F58634] text-white font-primarySemibold rounded-lg text-sm md:text-base">
            Deactivate
          </button> */}

          {loading ? (
            <button className="w-[100px] md:w-[180px] h-10 md:h-[46px] rounded-lg border bg-blue-400">
              <svg
                className="animate-spin h-6 w-6 text-black"
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
            </button>
          ) : (
            <button
              className={`${
                status === "INACTIVE" ? "bg-[#359E52]" : "bg-[#F58634]"
              } w-[100px] md:w-[180px] h-10 md:h-[46px] text-white font-primarySemibold rounded-lg text-sm md:text-base`}
              onClick={() => manageVendorStatus(vendorDetails._id)}
            >
              {status === "INACTIVE" ? "Activate" : "Deactivate"}
            </button>
          )}

          {/* <button
            button
            className="w-[100px] md:w-[180px] h-10 md:h-[46px] bg-[#E3140F] text-white font-primarySemibold rounded-lg text-sm md:text-base"
          >
            Block
          </button> */}
        </div>
      </div>
    </>
  );
};

export default VendorDetails;
