import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon, DownloadIcon } from "@heroicons/react/outline";
import { IoIosPerson } from "react-icons/io";
import { TbTruckDelivery, TbPackage } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import { XIcon } from "@heroicons/react/solid";

const OrderDetails = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state && location.state.order;
  console.log("detailing", orderDetails);
  const [changeStatusPreview, setChangeStatusPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!orderDetails) {
    return <div>No details available</div>;
  }

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getOrderStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-[#E3140F]"; // Red
      case "processing":
        return "bg-[#0000FF]"; // Blue
      case "ready to ship":
        return "bg-[#008000]"; // Green
      default:
        return "bg-[#C1C6C5]"; // Default grey color
    }
  };

  const getPaymentStatusStyles = (status) => {
    if (typeof status === "string") {
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
            dotColor: "bg-gray-800",
          };
      }
    } else {
      return { bgColor: "bg-gray-200", textColor: "text-gray-800" };
    }
  };

  const extractFiveDigits = (id) => {
    return id.substring(0, 5); // Extract the first 5 characters
  };

  const manageOrderStatus = (orderId, status) => {
    setLoading(true);
    const url = `${apiURL}/vendors-dashboard/accept-orders/${orderId}`;
    axios
      .put(
        url,
        { deliveryStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((response) => {
        console.log("Order status updated:", response.data);
        if (response.data.success === true) {
          toast.success("Order successfully accepted");
        }
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        toast.error("Error updating order status");
      })
      .finally(() => setLoading(false));
  };

  const handleDelivered = () => {
    manageOrderStatus(orderDetails._id, "DELIVERED");
    setChangeStatusPreview(false);
  };

  const handleReturned = () => {
    manageOrderStatus(orderDetails._id, "RETURNED");
    setChangeStatusPreview(false);
  };

  return (
    <>
      <ToastContainer />
      {changeStatusPreview && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 font-primaryRegular">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md ">
            <div className="flex justify-between items-center">
              <div></div>{" "}
              <XIcon
                width={20}
                height={20}
                color="red"
                onClick={() => setChangeStatusPreview(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-center items-center font-primarySemibold text-lg">
              Change Status
            </div>
            <div className="grid grid-cols-2 gap-6 my-6">
              <button
                onClick={handleDelivered}
                className="p-2 border rounded flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Delivered
              </button>
              <button
                onClick={handleReturned}
                className="p-2 border rounded flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                Returned
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="w-full h-[70px] bg-white flex flex-row items-center justify-between p-4 font-primaryRegular">
        <div className="flex flex-row gap-6 cursor-pointer">
          <ArrowLeftIcon
            width={20}
            height={20}
            onClick={() => navigate("/allOrders")}
          />
          <p>Order Details</p>
        </div>

        <div className="flex flex-row gap-6">
          {/* button pops up when action has been taken on order (Accept or Cancel) */}
          {/* <button
            onClick={() => setChangeStatusPreview(true)}
            className="hidden md:block h-[40px] w-[150px] rounded-[6px] bg-none text-[#373435] border-[1px] border-[#373435]"
          >
            Change status
          </button> */}
          {/* <div className="bg-[#8BCB901F] md:w-[197px] w-[40px] h-[40px] p-[10px] gap-[11px] flex flex-row items-center justify-center rounded-[6px] ">
            <DownloadIcon width={14} height={14} color="#359E52" />
            <p className="text-[16px] text-[#359E52] hidden md:flex">
              Download invoice
            </p>
          </div> */}
        </div>
      </header>
      <div className="w-full my-4 md:my-6 flex flex-col">
        <div className="w-full flex flex-col ">
          <div className="w-full mb-4">
            {/* {acceptOrder && ( */}
            <button className="h-[40px] w-[150px] rounded-[6px] bg-none text-[#373435] border border-[#373435] md:hidden block font-primaryRegular">
              Change status
            </button>
            {/* )} */}
          </div>
          {/* Details */}
          <div className="w-full bg-white flex flex-col font-primaryRegular">
            {/* order info price section */}
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-[#CFCBCB] p-4">
              <div className="flex flex-col items-center justify-center text-xs md:text-base flex-grow">
                <p className="font-primarySemibold">
                  Order ID{" "}
                  <span className="font-primaryRegular text-sm">
                    {extractFiveDigits(orderDetails._id)}
                  </span>
                </p>
                <p>{orderDetails.date}</p>
              </div>
              <div className="flex flex-col items-center justify-center text-xs md:text-base flex-grow">
                <p>Total price</p>
                <p className="font-primarySemibold">
                  ₦{orderDetails.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center flex-grow">
                <p className="text-sm md:text-base">Order status</p>
                <div className="flex gap-4 items-center justify-center">
                  <div
                    className={`w-2 h-2 rounded-[100px] ${getOrderStatusColor(
                      orderDetails.deliveryStatus
                    )}`}
                  />
                  <p className="text-sm md:text-base font-primarySemibold">
                    {orderDetails.deliveryStatus}
                  </p>
                </div>
              </div>
              {/* <div className="flex flex-col items-center justify-center flex-grow">
                <p className="text-sm md:text-base">Vendor</p>
                <div className="flex gap-4 items-center justify-center">
                  <p className="text-[#359E52]">Michael Farasin</p>
                  <p className="text-xs text-[#E7711A] ">See details</p>
                </div>
              </div> */}
            </div>

            {/*  order info delivery section*/}
            <div className="w-full flex gap-10 border-b border-[#CFCBCB] flex-wrap">
              {/* Customer */}
              <div className="flex flex-col items-start p-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-[#373435] rounded-[100px] text-white flex items-center justify-center">
                    <IoIosPerson size={20} />
                  </div>
                  <b>Customers</b>
                </div>
                <div className="grid gap-4">
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">Full Name:</p>
                    <p>
                      {orderDetails?.personalInfo?.firstName +
                        " " +
                        orderDetails?.personalInfo?.lastName}
                    </p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">Email:</p>
                    <p>{orderDetails?.personalInfo?.email}</p>
                  </div>
                  <div className="flex flex-row gap-[10px] w-full">
                    <p className="text-sm font-semibold">Phone:</p>
                    <p className="text-sm">
                      {orderDetails?.personalInfo?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
              {/* Order Info */}
              <div className="flex flex-col items-start p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#373435] rounded-[100px] text-white flex items-center justify-center">
                    <TbPackage size={20} />
                  </div>
                  <b>Order Details</b>
                </div>
                <div className="grid gap-4">
                  <div className="flex gap-3 items-center">
                    <p className="text-sm font-primarySemibold">Payment:</p>
                    {orderDetails.status && (
                      <div
                        className={`min-w-[66px] h-[35px] p-3 flex items-center justify-center gap-3 ${
                          getPaymentStatusStyles(orderDetails.status).bgColor
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-[100px] ${
                            getPaymentStatusStyles(orderDetails.status).dotColor
                          }`}
                        />
                        <p
                          className={`${
                            getPaymentStatusStyles(orderDetails.status)
                              .textColor
                          } text-xs`}
                        >
                          {orderDetails.status}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">Delivery:</p>
                    <p>Deliver before tuesday 05/12/2023</p>
                  </div> */}
                </div>
              </div>
              {/* Delivery Info */}
              <div className="flex flex-col items-start p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#373435] rounded-[100px] text-white flex items-center justify-center">
                    <TbTruckDelivery size={20} />
                  </div>
                  <b>Delivery</b>
                </div>
                <div className="grid gap-4">
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">City:</p>
                    <p>{orderDetails?.shippingAddress?.city}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">State:</p>
                    <p>{orderDetails?.shippingAddress?.state}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">Address:</p>
                    <p>{orderDetails?.shippingAddress?.street}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <p className="font-primarySemibold">Shipping Fee:</p>
                    <p>
                      ₦
                      {formatNumber(
                        orderDetails?.shippingFee + orderDetails?.vat
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Info */}
            {/* <div className="w-full flex items-center flex-wrap p-4 gap-4">
              <div className="w-[175px] border border-[#CFCBCB] h-[120px] rounded-lg"></div>
              <div className="flex items-center  gap-10">
                <div className="flex flex-col items-center">
                  <b className="text-sm">Apples</b>
                  <p className="text-xs">Grocery</p>
                </div>
                <div className="flex flex-col items-center">
                  <b className="text-sm">QTY</b>
                  <p className="text-xs">10</p>
                </div>
                <div className="flex flex-col items-center">
                  <b className="text-sm">Total Price</b>
                  <p className="text-xs">$230</p>
                </div>
              </div>
            </div> */}

            <div className="w-full grid p-4 gap-10">
              {orderDetails?.products.map((product) => (
                <div className="flex flex-wrap gap-4">
                  <div className="w-[175px] border border-[#CFCBCB] h-[120px] rounded-lg">
                    <img
                      src={product.productId.featured_image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="flex flex-col items-center">
                      <b className="text-sm">{product.productId.name}</b>
                      <p className="text-xs"></p>
                    </div>
                    <div className="flex flex-col items-center">
                      <b className="text-sm">QTY</b>
                      <p className="text-xs">{product.quantity}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <b className="text-sm">Total Price of Products</b>
                      <p className="text-xs">
                        {product.productId.currency +
                          " " +
                          (
                            product.productId.price * product.quantity
                          ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
