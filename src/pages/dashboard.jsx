import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full grid gap-10 font-primaryRegular">
      <div className="bg-white rounded p-4 flex flex-col">
        <p className="font-bold text-lg">Summary</p>
        <div className="grid md:grid-cols-4 gap-10 mt-6 mb-2">
          <div className="md:w-[250px] 2xl:w-[300px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-green-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              icon
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm"> Revenue</p>
              <b>$1,800</b>
            </div>
          </div>
          <div className="md:w-[250px] 2xl:w-[300px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-indigo-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              icon
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm"> Orders</p>
              <b>200</b>
            </div>
          </div>
          <div className="md:w-[250px] 2xl:w-[300px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-purple-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              icon
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm"> Vendors</p>
              <b>52</b>
            </div>
          </div>
          <div className="md:w-[250px] 2xl:w-[300px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-pink-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              icon
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm"> Customers</p>
              <b>104</b>
            </div>
          </div>
        </div>
      </div>
      <div>Order Status</div>
      <div>Recent Orders</div>
      <div>Low Stock</div>
    </div>
  );
};

export default Dashboard;
