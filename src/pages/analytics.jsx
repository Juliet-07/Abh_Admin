import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdCalendarMonth } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Analytics = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

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
    const getAllVendors = () => {
      axios
        .get(`${apiURL}/vendors`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.data);
          setVendors(response.data.data.data);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getAllVendors();
    getCustomers();
  }, []);
  return (
    <>
      <div className="w-full grid gap-10 font-primaryRegular">
        <div className="w-full md:h-20 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4">
          <p className="font-primaryBold md:text-xl">Analytics</p>
          <div className="flex items-center gap-4 text-gray-600">
            <p className="font-primaryRegular text-sm">{getCurrentDate()}</p>
            <MdCalendarMonth />
          </div>
        </div>
        <div className="w-full bg-white border border-[#CFCBCB] rounded-xl grid md:grid-cols-4 gap-4 p-4">
          <div className="w-full md:w-[228px] h-[146px] rounded-2xl border border-l-2 border-l-[#08932E] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
            <p>Active Users</p>
            <div className="flex items-center gap-3">
              <p className="font-bold">{customers.length + vendors.length}</p>
              <p className="text-xs text-[#08932E]">+21.1%</p>
            </div>
            <div className="flex items-center gap-3 text-[#08932E]">
              <p>See Activity</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="w-full md:w-[228px] h-[146px] rounded-2xl border border-l-2 border-l-[#E74C3C] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
            <p>Inactive Users</p>
            <div className="flex items-center gap-3">
              <p className="font-bold">377</p>
              <p className="text-xs text-[#E74C3C]">-33.1%</p>
            </div>
            <div className="flex items-center gap-3 text-[#E74C3C]">
              <p>See Activity</p>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="w-full md:w-[228px] h-[146px] rounded-2xl border border-l-2 border-l-[#155793] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
            <p>Total Customers</p>
            <div className="flex items-center gap-3">
              <p className="font-bold">{customers.length}</p>
              <p className="text-xs text-[#155793]">+12.1%</p>
            </div>
            <Link
              to="/customers"
              className="flex items-center gap-3 text-[#155793]"
            >
              <p>See All</p>
              <IoIosArrowForward />
            </Link>
          </div>
          <div className="w-full md:w-[228px] h-[146px] rounded-2xl border border-l-2 border-l-[#F58634] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
            <p>Total Vendors</p>
            <div className="flex items-center gap-3">
              <p className="font-bold">{vendors.length}</p>
              <p className="text-xs text-[#F58634]">+14.1%</p>
            </div>
            <Link
              to="/allVendors"
              className="flex items-center gap-3 text-[#F58634]"
            >
              <p>See All</p>
              <IoIosArrowForward />
            </Link>
          </div>
        </div>
        <div>User Engagements</div>
        <div>Commissions earned</div>
        <div>ROI</div>
      </div>
    </>
  );
};

export default Analytics;
