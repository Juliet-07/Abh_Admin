import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/newVendor.png";
import axios from "axios";

const Customers = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = () => {
      axios
        .get(`${apiURL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setCustomers(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getCustomers();
  }, []);

  const handleViewMore = (customer) => {
    console.log("handleViewDetails called with:", customer);
    navigate("/customerDetails", { state: { customer } });
  };

  const getStatusStyles = (status) => {
    // switch (status.toLowerCase()) {
    switch (status) {
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
      default:
        return {
          bgColor: "bg-gray-200",
          textColor: "text-gray-800",
        };
    }
  };

  return (
    <>
      {customers.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">Customers ({customers.length})</p>
            <div></div>
          </div>
          <div className="my-10 w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                  <tr>
                    <th className="text-center p-3">Customer Name</th>
                    <th className="text-center p-3">Email</th>
                    <th className="text-center p-3">Phone Number</th>
                    <th className="text-center p-3">Shipping Address</th>
                    {/* <th className="text-center p-3">Status</th> */}
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => {
                    // const { bgColor, textColor, dotColor } = getStatusStyles(
                    //   customer.status
                    // );
                    return (
                      <tr
                        key={index}
                        className="border text-xs font-primaryMedium mb-4"
                      >
                        <td className="p-4 text-center">
                          {customer.firstName + " " + customer.lastName}
                        </td>
                        <td className="p-4 text-center">{customer.email}</td>
                        <td className="p-4 text-center">
                          {customer.phoneNumber}
                        </td>
                        <td className="p-4 text-center">
                          {customer.shippingAddress}
                        </td>
                        {/* <td className="p-4 text-center">
                          <div
                            className={`w-full h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                          >
                            <div
                              className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                            />
                            <p className={`${textColor} text-xs`}>
                              {customer.status}
                            </p>
                          </div>
                        </td> */}
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleViewMore(customer)}
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
            No Registered Customers
          </div>
          <div className="my-10 md:p-10">
            <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
