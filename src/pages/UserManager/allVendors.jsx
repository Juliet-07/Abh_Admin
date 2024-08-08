import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/newVendor.png";
import axios from "axios";
import moment from "moment/moment";

const AllVendors = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [vendors, setVendors] = useState([]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM DD, YYYY");
  };

  useEffect(() => {
    const getAllVendors = () => {
      axios
        .get(`${apiURL}/vendors`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.items);
          setVendors(response.data.data.items);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllVendors();
  }, []);

  const handleViewMore = (vendor) => {
    console.log("handleViewDetails called with:", vendor);
    navigate("/vendorDetails", { state: { vendor } });
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
      case "declined":
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
      default:
        return {
          bgColor: "bg-gray-200",
          textColor: "text-gray-800",
        };
    }
  };

  return (
    <>
      {vendors.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">All Vendors</p>
            <Link
              to="/createVendors"
              className="text-white bg-[#359E52] text-sm p-2 rounded-xl"
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
                    <th className="text-center p-3">Status</th>
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor, index) => {
                    const { bgColor, textColor, dotColor } = getStatusStyles(
                      vendor.status
                    );
                    return (
                      <tr
                        key={index}
                        className="border text-xs font-primaryMedium mb-4"
                      >
                        <td className="p-4 text-center">
                          {formatDate(vendor.createdAt)}
                        </td>
                        <td className="p-4 text-center">
                          {vendor.firstName + " " + vendor.lastName}
                        </td>
                        <td className="p-4 text-center">{vendor.store}</td>
                        <td className="p-4 text-center">
                          {vendor.businessType}
                        </td>
                        <td className="p-4 text-center">{vendor.email}</td>
                        <td className="p-4 text-center">
                          <div
                            className={`w-full h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                          >
                            <div
                              className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                            />
                            <p className={`${textColor} text-xs`}>
                              {vendor.status}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleViewMore(vendor)}
                            className="text-[#359E52] hover:underline"
                          >
                            View more
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
          <div className="text-xl font-primaryRegular">
            No Available Vendors
          </div>
          <div className="my-10 md:p-10">
            <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default AllVendors;
