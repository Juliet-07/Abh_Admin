import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdCalendarMonth } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import BarchartComp from "../components/BarchartComp";
import LinechartComp from "../components/LineChartComp";

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
      <div className="w-full flex flex-col gap-[10px] font-primaryRegular">
        <div className="w-full md:h-20 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4">
          <p className="font-primaryBold md:text-xl">Analytics</p>
          <div className="flex items-center gap-4 text-gray-600">
            <p className="font-primaryRegular text-sm">{getCurrentDate()}</p>
            <MdCalendarMonth />
          </div>
        </div>
        <div className="w-full bg-white border border-[#CFCBCB] rounded-xl flex flex-row flex-wrap  gap-1 p-2">
          <div className="flex flex-1 min-w-[200px] h-[146px] rounded-2xl border border-l-2 border-l-[#08932E] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
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
          <div className="flex flex-1 min-w-[200px] h-[146px] rounded-2xl flex-wrap  border border-l-2 border-l-[#E74C3C] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
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
          <div className="flex flex-1 min-w-[200px] h-[146px] rounded-2xl flex-wrap  border border-l-2 border-l-[#155793] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
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
          <div className="flex flex-1 min-w-[200px] h-[146px] rounded-2xl flex-wrap  border border-l-2 border-l-[#F58634] bg-white flex flex-col items-center justify-center gap-6 md:gap-4">
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
     
        <div className="bg-white rounded-[0.5rem] p-4 flex flex-col border-[1px] border-[gainsboro]">
          <div className="flex flex-row items-center gap-[10px]">
            <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-lg">User Engagements</p>
            </div>
          </div>
          <LinechartComp />
        </div>
        <div className="bg-white rounded-[0.5rem] p-4 flex flex-col border-[1px] border-[gainsboro]">
          <div className="flex flex-row items-center gap-[10px]">
            <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
            <div className="flex flex-row items-center justify-between w-full">
              <p className="font-bold text-lg">Commission Earned</p>
            </div>
          </div>
          <LinechartComp />
        </div>
        
        <div>ROI</div>
      </div>
    </>
  );
};

export default Analytics;
