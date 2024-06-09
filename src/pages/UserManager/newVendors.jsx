import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../assets/newVendor.png";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { FcCancel } from "react-icons/fc";

const NewVendors = () => {
  const [hasNewRequests, setHasNewRequests] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [showApproval, setApproval] = useState(false);
  const [showDecline, setDecline] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const vendors = [
    {
      date: "Aug 2 2024",
      fullname: "Michael Farasin",
      shopname: "Crest Store",
      businesstype: "Grocery",
      businessEmail: "mykefabson@gmail.com",
      businessPhone: "0812210011",
      shopAddress: "7, Kingsway, Otawa, NY",
    },
    {
      date: "Aug 1 2024",
      fullname: "Adeyemi Farasin",
      shopname: "Cyphercresent Stores",
      businesstype: "Electronics",
      businessEmail: "adeyemi@gmail.com",
      businessPhone: "0812210011",
      shopAddress: " Ontario, Canada",
    },
    {
      date: "Aug 2 2024",
      fullname: "Michael Farasin",
      shopname: "Crest Store",
      businesstype: "Grocery",
      businessEmail: "mykefabson@gmail.com",
      businessPhone: "0812210011",
      shopAddress: "7, Kingsway, Otawa, NY",
    },
    {
      date: "Aug 1 2024",
      fullname: "Adeyemi Farasin",
      shopname: "Cyphercresent Stores",
      businesstype: "Electronics",
      businessEmail: "adeyemi@gmail.com",
      businessPhone: "0812210011",
      shopAddress: " Ontario, Canada",
    },
    {
      date: "Aug 2 2024",
      fullname: "Michael Farasin",
      shopname: "Crest Store",
      businesstype: "Grocery",
      businessEmail: "mykefabson@gmail.com",
      businessPhone: "0812210011",
      shopAddress: "7, Kingsway, Otawa, NY",
    },
    {
      date: "Aug 1 2024",
      fullname: "Adeyemi Farasin",
      shopname: "Cyphercresent Stores",
      businesstype: "Electronics",
      businessEmail: "adeyemi@gmail.com",
      businessPhone: "0812210011",
      shopAddress: " Ontario, Canada",
    },
    {
      date: "Aug 2 2024",
      fullname: "Michael Farasin",
      shopname: "Crest Store",
      businesstype: "Grocery",
      businessEmail: "mykefabson@gmail.com",
      businessPhone: "0812210011",
      shopAddress: "7, Kingsway, Otawa, NY",
    },
    {
      date: "Aug 1 2024",
      fullname: "Adeyemi Farasin",
      shopname: "Cyphercresent Stores",
      businesstype: "Electronics",
      businessEmail: "adeyemi@gmail.com",
      businessPhone: "0812210011",
      shopAddress: " Ontario, Canada",
    },
  ];

  useEffect(() => {
    const checkForNewRequests = () => {
      setTimeout(() => {
        const newRequestsExist = true;
        setHasNewRequests(newRequestsExist);
      }, 1000);
    };

    checkForNewRequests();
  }, []);

  const handleViewMore = (vendor) => {
    setSelectedVendor(vendor);
    setPreview(true);
  };

  const handleApprove = () => {
    console.log("Vendor approved:", selectedVendor);
    setPreview(false);
    setApproval(true);
  };

  const handleDecline = () => {
    console.log("Vendor declined:", selectedVendor);
    setPreview(false);
    setDecline(true);
  };

  return (
    <>
      {showPreview && selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="w-[90%] max-w-[800px] h-screen bg-white p-4 rounded-xl flex flex-col items-center justify-center overflow-y-auto">
            <div className="w-full md:px-10 font-primaryRegular">
              <div className="text-xl font-bold mb-4 text-center">
                Vendor Details
              </div>
              <div className="grid gap-6">
                <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                  <p>Date & Time Registered</p>
                  <p>{selectedVendor.date}</p>
                </div>
                {/* 2 */}
                <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                  <p>Full Name</p>
                  <p>{selectedVendor.fullname}</p>
                </div>
                {/* 3 */}
                <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                  <p>Shop Name</p>
                  <p>{selectedVendor.shopname}</p>
                </div>
                {/* 4 */}
                <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                  <p>Business Email</p>
                  <p>{selectedVendor.businessEmail}</p>
                </div>
                {/* 5 */}
                <div className="flex justify-between">
                  <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                    <p>Business Phone Number</p>
                    <p>{selectedVendor.businessPhone}</p>
                  </div>
                  <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                    <p>Alternate Phone Number</p>
                    <p>{selectedVendor.businessPhone}</p>
                  </div>
                </div>
                {/* 6 */}
                <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                  <p>Shop Address</p>
                  <p>{selectedVendor.shopAddress}</p>
                </div>
                {/* 7 */}
                <div className="flex justify-between">
                  <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                    <p>Shop Residing Country</p>
                    <p>{selectedVendor.shopAddress}</p>
                  </div>
                  <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                    <p>City</p>
                    <p>{selectedVendor.shopAddress}</p>
                  </div>
                  <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                    <p>State</p>
                    <p>{selectedVendor.shopAddress}</p>
                  </div>
                </div>
                {/* 8 */}
                <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                  <p>Business Type</p>
                  <p>{selectedVendor.businesstype}</p>
                </div>
                {/* 9 */}
                <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                  <p>National Identification Number</p>
                  <p>{selectedVendor.date}</p>
                </div>
                {/* 10 */}
                <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                  <p>Tax Identification Number</p>
                  <p>{selectedVendor.date}</p>
                </div>
                {/* 11 */}
                <div className="grid gap-4 border-b border-b-[#C1C6C5] py-2">
                  <p>CAC Registration Number</p>
                  <p>{selectedVendor.date}</p>
                </div>
              </div>

              <div className="flex gap-4 my-10">
                <button
                  onClick={handleApprove}
                  className="w-[99px] md:w-[186px] h-10 md:h-[46px] flex items-center justify-center text-white bg-[#4CBD6B] rounded-lg font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={handleDecline}
                  className="w-[99px] md:w-[186px] h-10 md:h-[46px] flex items-center justify-center text-white bg-[#E3140F] rounded-lg font-semibold"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showApproval && (
        <div
          // onClick={()=> setPreview(false)}
          className="w-full h-screen  bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular"
        >
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white rounded-xl flex flex-col items-center  justify-center gap-6">
            <div className="w-[50px] h-[50px] rounded-[100px] border-[#08932E] border-2 flex flex-col items-center  justify-center">
              <CheckIcon width={30} height={30} color="#08932E" />
            </div>
            <p className="text-center">
              Vendor approved <br />
              successfully!
            </p>
            <button
              onClick={() => setApproval(false)}
              className="w-[186px] h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showDecline && (
        <div
          // onClick={()=> setPreview(false)}
          className="w-full h-screen  bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular"
        >
          <div className="w-[90%] max-w-[498px] h-[344px] bg-white rounded-xl flex flex-col items-center  justify-center gap-6">
            <FcCancel size={60} />
            <p className="text-center">
              Vendor application <br />
              rejected!
            </p>
            <button
              onClick={() => setDecline(false)}
              className="w-[186px] h-[46px] rounded-[6px] bg-[#4CBD6B] text-white"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {hasNewRequests ? (
        <div className="w-full flex flex-col">
          <div className="w-full h-20 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">New Vendors</p>
            <Link
              to="/createVendors"
              className="text-white bg-[#359E52] text-base p-3 rounded-xl"
            >
              Create Vendor
            </Link>
          </div>
          <div className="my-10 w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                  <tr>
                    <th className="text-center p-3">Date</th>
                    <th className="text-center p-3">Full Name</th>
                    <th className="text-center p-3">Shop Name</th>
                    <th className="text-center p-3">Business Type</th>
                    <th className="text-center p-3">Business Email</th>
                    <th className="text-center p-3">Business Phone</th>
                    <th className="text-center p-3">Shop Address</th>
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor, index) => (
                    <tr
                      key={index}
                      className="border text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-center">{vendor.date}</td>
                      <td className="p-4 text-center">{vendor.fullname}</td>
                      <td className="p-4 text-center">{vendor.shopname}</td>
                      <td className="p-4 text-center">{vendor.businesstype}</td>
                      <td className="p-4 text-center">
                        {vendor.businessEmail}
                      </td>
                      <td className="p-4 text-center">
                        {vendor.businessPhone}
                      </td>
                      <td className="p-4 text-center">{vendor.shopAddress}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleViewMore(vendor)}
                          className="text-[#359E52] hover:underline"
                        >
                          View more
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
          <div className="text-xl font-primaryRegular">
            No new registered vendor
          </div>
          <div className="my-10 md:p-10">
            <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default NewVendors;
