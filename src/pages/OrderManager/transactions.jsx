import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/newVendor.png";
import axios from "axios";
import { format } from "date-fns";
import { LuAlertOctagon } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";

const Transactions = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const [activeTab, setActiveTab] = useState("All");
  // const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [updatePreview, setUpdatePreview] = useState(false);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const transactions = [
    {
      totalPrice: "$5,000",
      productPrice: "$500",
      deliveryFee: "$100",
      tax: "$50",
      gateway: "Boundless pay",
      paymentStatus: "Successful",
      status: "Pending",
    },
    {
      totalPrice: "$5,000",
      productPrice: "$500",
      deliveryFee: "$100",
      tax: "$50",
      gateway: "Boundless pay",
      paymentStatus: "Pending",
      status: "Completed",
    },
    {
      totalPrice: "$5,000",
      productPrice: "$500",
      deliveryFee: "$100",
      tax: "$50",
      gateway: "Boundless pay",
      paymentStatus: "Pending",
      status: "Pending",
    },
    {
      totalPrice: "$5,000",
      productPrice: "$500",
      deliveryFee: "$100",
      tax: "$50",
      gateway: "Boundless pay",
      paymentStatus: "Successful",
      status: "Pending",
    },
    {
      totalPrice: "$5,000",
      productPrice: "$500",
      deliveryFee: "$100",
      tax: "$50",
      gateway: "Boundless pay",
      paymentStatus: "Successful",
      status: "Completed",
    },
    {
      totalPrice: "$5,000",
      productPrice: "$500",
      deliveryFee: "$100",
      tax: "$50",
      gateway: "Boundless pay",
      paymentStatus: "Pending",
      status: "Pending",
    },
    {
      totalPrice: "$5,000",
      productPrice: "$500",
      deliveryFee: "$100",
      tax: "$50",
      gateway: "Boundless pay",
      paymentStatus: "Successful",
      status: "Pending",
    },
    {
      totalPrice: "$5,000",
      productPrice: "$500",
      deliveryFee: "$100",
      tax: "$50",
      gateway: "Boundless pay",
      paymentStatus: "Successful",
      status: "Pending",
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

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "All") return true;
    return transaction.status === activeTab;
  });

  const getVendorStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          dotsColor: "bg-[#E3140F]",
        };
      case "completed":
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
      case "successful":
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
  const tabs = ["All", "Pending", "Completed"];

  const handlePreview = (order) => {
    setSelectedTransaction(order);
    setPreview(true);
  };

  const handleUpdatePreview = (order) => {
    setSelectedTransaction(order);
    setPreview(true);
  };

  return (
    <>
      {showPreview &&
        selectedTransaction &&
        (() => {
          return (
            <div className="w-full h-[100vh] overflow-y-scroll bg-[#000000a8] fixed z-50 top-0 left-0 flex flex-col items-center p-4 font-primaryRegular">
              <div className="w-full md:w-[498px] relative bg-white rounded-xl p-5 md:p-10 my-[5vh] flex flex-col items-center justify-center gap-10">
                <div>
                  <LuAlertOctagon size={40} color="#E3140F" />
                </div>
                <div className="text-center">
                  Confirm that payment has been made to vendor account for this
                  order{" "}
                </div>
                <div className="flex gap-4">
                  <button
                    className="w-[127px] md:w-[186px] h-10 md:h-[46px] text-white bg-[#E3140F] font-semibold rounded-lg"
                    onClick={() => {
                      setPreview(false), setUpdatePreview(true);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="w-[127px] md:w-[186px] h-10 md:h-[46px] text-black bg-white border border-[#CFCBCB] font-semibold rounded-lg"
                    onClick={() => setPreview(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {updatePreview && (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#000000a8] fixed z-50 top-0 left-0 flex flex-col items-center p-4 font-primaryRegular">
          <div className="w-full md:w-[498px] relative bg-white rounded-xl p-5 md:p-10 my-[5vh] flex flex-col items-center justify-center gap-10">
            <div>
              <FaRegCircleCheck size={40} color="#08932E" />
            </div>
            <div className="text-center">Payment Successfully Updated</div>

            <button
              className="w-[186px] h-[46px] text-white bg-[#08932E] font-semibold rounded-lg"
              onClick={() => setUpdatePreview(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col">
        <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
          <p className="">Transactions</p>
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

        {filteredTransactions.length > 0 ? (
          <div className="w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                  <tr>
                    <th className="text-center p-3">Order ID</th>
                    <th className="text-center p-3">Date</th>
                    <th className="text-center p-3">Total Proce</th>
                    <th className="text-center p-3">Product Price</th>
                    <th className="text-center p-3">Delivery Fee</th>
                    <th className="text-center p-3">Taxable Amount</th>
                    <th className="text-center p-3">Payment Gateway</th>
                    <th className="text-center p-3">Payment Status</th>
                    <th className="text-center p-3">Vendor Payment Status</th>
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((order, index) => {
                    const { dotsColor } = getVendorStatusStyles(order.status);
                    const { bgColor, textColor, dotColor } =
                      getPaymentStatusStyles(order.paymentStatus);
                    return (
                      <tr
                        key={index}
                        className="border text-xs font-primaryMedium mb-4"
                      >
                        <td className="p-4 text-center">120381</td>
                        <td className="p-4 text-center">Jun 26, 2024</td>
                        <td className="p-4 text-center">{order.totalPrice}</td>
                        <td className="p-4 text-center">
                          {order.productPrice}
                        </td>
                        <td className="p-4 text-center">{order.deliveryFee}</td>
                        <td className="p-4 text-center">{order.tax}</td>
                        <td className="p-4 text-center">{order.gateway}</td>
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
                            <p className="text-xs">{order.status}</p>
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <button
                            onClick={() => handlePreview(order)}
                            // className="w-[67px] h-[35px] bg-[#359E52] text-white"
                            className={`w-[67px] h-[35px] ${
                              order.status === "Completed"
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-[#359E52] text-white"
                            }`}
                            disabled={order.status === "Completed"}
                          >
                            Update
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

export default Transactions;
