import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-10 font-primaryRegular">

      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">

        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
        <p className="font-bold text-lg">Summary</p>
        </div>

        <div className="flex md:flex-row flex-wrap xl:justify-between justify-start gap-6 flex-col mt-6 mb-2">
          <div className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-[teal] p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-37.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Revenue</p>
              <b className="text-2xl">$1,800</b>
            </div>
          </div>
          <div className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-indigo-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
            <img src="/svgs/svgexport-38.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Orders</p>
              <b className="text-2xl">200</b>
            </div>
          </div>
          <div className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-purple-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
            <img src="/svgs/svgexport-39.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Vendors</p>
              <b className="text-2xl">52</b>
            </div>
          </div>
          <div className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-pink-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
            <img src="/svgs/svgexport-40.svg" alt="" className="w-8 h-8" />

            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Customers</p>
              <b className="text-2xl">104</b>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">

        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
        <p className="font-bold text-lg">Order status</p>
        </div>

        <div className="flex sm:flex-row flex-wrap xl:justify-between justify-start gap-6 flex-col mt-6 mb-2">
          <div style={{borderBottomColor: "rgb(0, 148, 255)"}}
           className=" flex flex-[18] min-w-[220px] h-[120px] border rounded-lg border-b-4 border-b-[teal] p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-37.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Pending Order</p>
              <b className="text-2xl">100</b>
            </div>
          </div>
          <div 
             style={{borderBottomColor: "rgb(40, 183, 255)"}}
             className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-indigo-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
            <img src="/svgs/svgexport-38.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Processing Order</p>
              <b className="text-2xl">0</b>
            </div>
          </div>
          <div 
            style={{borderBottomColor: "rgb(255, 141, 41)"}}
          className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-pink-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
            <img src="/svgs/svgexport-40.svg" alt="" className="w-8 h-8" />

            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Completed Order</p>
              <b className="text-2xl">0</b>
            </div>
          </div>
          <div 
            style={{borderBottomColor: "rgb(255, 141, 41);"}}
            className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-purple-500 p-2 flex items-center justify-between bg-slate-50">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
            <img src="/svgs/svgexport-39.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Cancelled Order</p>
              <b className="text-2xl">0</b>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">

        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
        <p className="font-bold text-lg">Recent Orders</p>
        </div>

<div class="overflow-x-auto mt-[20px] mb-4">
    <table class="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
            <tr class="bg-gray-50">
                <th class="px-4 py-2 text-[14px]">Tracking Number</th>
                <th class="px-4 py-2 text-[14px]">Customer</th>
                <th class="px-4 py-2 text-[14px]">Products</th>
                <th class="px-4 py-2 text-[14px]">Order Date</th>
                <th class="px-4 py-2 text-[14px]">Total</th>
                <th class="px-4 py-2 text-[14px]">Status</th>
                <th class="px-4 py-2 text-[14px]">Actions</th>
            </tr>
        </thead>
        <tbody>
          {
            ["", "", ""].map((data, index)=>{
              return (
            <tr class="border-b border-[0 solid #e5e7eb] border-dotted ">
                <td class="px-4 py-2 min-w-[100px]"><div className="flex flex-row justify-center">123456 </div></td>
                <td class="px-4 py-2 min-w-[100px]"><div className="flex flex-row justify-center">John Doe </div></td>
                <td class="px-4 py-2 min-w-[100px]"><div className="flex flex-row justify-center">Product {index}  </div></td>
                <td class="px-4 py-2 min-w-[100px]"><div className="flex flex-row justify-center">2024-06-26 </div></td>
                <td class="px-4 py-2 min-w-[100px]"><div className="flex flex-row justify-center">$100.00 </div></td>
                <td class="px-4 py-2 min-w-[100px]"><div className="flex flex-row justify-center">Shipped </div></td>
                <td class="px-4 py-2 min-w-[100px]"> <div className="flex flex-row justify-center">
                                 <img src="/svgs/svgexport-44.svg" alt="" className="w-4 h-4 active:opacity-[0.5] cursor-pointer" />

                </div>

                </td>
            </tr>

              )
            })
          }
           
        </tbody>
    </table>
</div>
      
      
      <div>Low Stock</div>
    </div>
    </div>
  );
};

export default Dashboard;
