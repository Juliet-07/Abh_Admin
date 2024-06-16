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

  const handleViewMore = (order) => {
    console.log("handleViewDetails called with:", order);
    navigate("/orderDetails", { state: { order } });
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
      {orders.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="w-full md:h-20 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">All Orders</p>
            <div></div>
          </div>
          <div className="my-10 w-full bg-white p-3">
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
                  {orders.map((order, index) => {
                    const { bgColor, textColor, dotColor } = getStatusStyles(
                      order.orderStatus
                    );
                    return (
                      <tr
                        key={index}
                        className="border text-xs font-primaryMedium mb-4"
                      >
                        <td className="p-4 text-center">120381</td>
                        <td className="p-4 text-center">Jun 16, 2024</td>
                        {/* <td className="p-4 text-center">
                          {formatDate(order.createdAt)}
                        </td> */}
                        <td className="p-4 text-center">
                          {/* {order.firstName + " " + order.lastName} */}
                          {order.name}
                        </td>
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
                            className={`w-full h-10 ${bgColor} p-3 flex items-center justify-center gap-[10px]`}
                          >
                            <div
                              className={`w-[8px] h-[8px] ${dotColor} rounded-[100px]`}
                            />
                            <p className={`${textColor} text-xs`}>
                              {order.orderStatus}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center">{order.items}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleViewMore(order)}
                            className="text-[#359E52]"
                          >
                            <FaEye size={20} />
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
            No Orders To Display Yet
          </div>
          <div className="my-10 md:p-10">
            <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrders;
