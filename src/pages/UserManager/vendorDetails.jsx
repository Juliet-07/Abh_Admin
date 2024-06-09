import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const VendorDetails = () => {
  const location = useLocation();
  const vendorDetails = location.state && location.state.vendor;
  console.log("Details", vendorDetails);
  const navigate = useNavigate();

  if (!vendorDetails) {
    return <div>No details available</div>;
  }
  return (
    <>
      <div className="w-full h-[57px] md:h-20 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
        Vendor Details
      </div>
      <div className="my-10 w-full grid gap-10">
        <div>1</div>
        <div>Product Information</div>
        <div className="bg-white border border-[#CFCBCB] p-4 rounded-xl flex flex-col gap-10">
          <p>Performance Metrics</p>
          <div className="grid md:grid-cols-4 gap-5 md:gap-10">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
      </div>
      <div className="my-10 w-full flex items-center justify-between">
        <div>Bank button</div>
        <div className="flex gap-4">
          <p>deactivate</p>
          <p>block</p>
        </div>
      </div>
    </>
  );
};

export default VendorDetails;
