import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/newVendor.png";
import axios from "axios";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa";

const AllOrders = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [activeTab, setActiveTab] = useState("All");
  // const [orders, setOrders] = useState([]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const orders = [
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Paid",
      orderStatus: "Pending",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Paid",
      orderStatus: "Processing",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Pending",
      orderStatus: "Pending",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Paid",
      orderStatus: "Pending",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Paid",
      orderStatus: "Processing",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Paid",
      orderStatus: "Pending",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Paid",
      orderStatus: "Pending",
      items: "10",
    },
    {
      name: "Michael Ade",
      address: "7, Kingsway, Otawa, NY",
      paymentStatus: "Paid",
      orderStatus: "Pending",
      items: "10",
    },
  ];

  // useEffect(() => {
  //   const getOrders = () => {
  //     axios
  //       .get(`${apiURL}/vendors`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-type": "application/json; charset=UTF-8",
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response.data.data.data);
  //         setVendors(response.data.data.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching vendors:", error);
  //       });
  //   };

  //   getOrders();
  // }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "All") return true;
    return order.orderStatus === activeTab;
  });

  const handleViewMore = (order) => {
    console.log("handleViewDetails called with:", order);
    navigate("/orderDetails", { state: { order } });
  };

  const getOrderStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          dotsColor: "bg-[#E3140F]",
        };
      case "shipped":
        return {
          dotsColor: "bg-[#08932E]",
        };
      case "ready to ship":
        return {
          dotsColor: "bg-[#FFA500]",
        };
      case "processing":
        return {
          dotsColor: "bg-[#081E93]",
        };
      default:
        return {
          dotsColor: "bg-gray-200",
        };
    }
  };

  const getPaymentStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return {
          bgColor: "bg-[#08932E]/[12%]",
          textColor: "text-[#08932E]",
          dotColor: "bg-[#08932E]",
        };
      case "pending":
        return {
          bgColor: "bg-[#E3140F]/[12%]",
          textColor: "text-[#E3140F]",
          dotColor: "bg-[#E3140F]",
        };
      default:
        return {
          bgColor: "bg-gray-200",
          textColor: "text-gray-800",
        };
    }
  };

  const tabs = [
    "All",
    "Pending",
    "Processing",
    "Ready to Ship",
    "Shipped",
    "Delivered",
    "Returned",
  ];

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full md:h-20 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
          <p className="">All Orders</p>
          <div></div>
        </div>
        <div className="my-4 w-full p-3 overflow-x-auto font-primaryRegular">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? "bg-[#359E52] text-white"
                    : "bg-gray-200 text-sm"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                  <tr>
                    <th className="text-center p-3">Order ID</th>
                    <th className="text-center p-3">Date</th>
                    <th className="text-center p-3">Customer Name</th>
                    <th className="text-center p-3">Address</th>
                    <th className="text-center p-3">Payment Status</th>
                    <th className="text-center p-3">Order Status</th>
                    <th className="text-center p-3">Items</th>
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const { dotsColor } = getOrderStatusStyles(
                      order.orderStatus
                    );
                    const { bgColor, textColor, dotColor } =
                      getPaymentStatusStyles(order.paymentStatus);
                    return (
                      <tr
                        key={index}
                        className="border text-xs font-primaryMedium mb-4"
                      >
                        <td className="p-4 text-center">120381</td>
                        <td className="p-4 text-center">Jun 16, 2024</td>
                        <td className="p-4 text-center">{order.name}</td>
                        <td className="p-4 text-center">{order.address}</td>
                        <td className="p-4 text-center">
                          <div
                            className={`w-full h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                          >
                            <div
                              className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                            />
                            <p className={`${textColor} text-xs`}>
                              {order.paymentStatus}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div
                            className={`w-full h-10 p-3 flex items-center justify-center gap-[10px]`}
                          >
                            <div
                              className={`w-[8px] h-[8px] ${dotsColor} rounded-[100px]`}
                            />
                            <p className="text-xs">{order.orderStatus}</p>
                          </div>
                        </td>
                        <td className="p-4 text-center">{order.items}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleViewMore(order)}
                            className="text-[#359E52]"
                          >
                            <FaEye size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <div className="text-xl font-primaryRegular">
              No Orders To Display Yet
            </div>
            <div className="my-10 md:p-10">
              <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllOrders;
