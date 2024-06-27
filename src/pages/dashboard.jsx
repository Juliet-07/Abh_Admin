import React from "react";
import PaginatedTable from "../components/paginatedTables";
import BarchartComp from "../components/BarchartComp";
import DashSlider from "../components/DashSlider";
import LowStockPaginatedTable from "../components/LowstockTable";

const Dashboard = () => {
  const [recentOrderInput, setROI] = React.useState("");
  const [LowStockInput, setLSI] = React.useState("");

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
          <div
            style={{ borderBottomColor: "rgb(0, 148, 255)" }}
            className=" flex flex-[18] min-w-[220px] h-[120px] border rounded-lg border-b-4 border-b-[teal] p-2 flex items-center justify-between bg-slate-50"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-39.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Pending Order</p>
              <b className="text-2xl">100</b>
            </div>
          </div>
          <div
            style={{ borderBottomColor: "rgb(40, 183, 255)" }}
            className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-indigo-500 p-2 flex items-center justify-between bg-slate-50"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-41.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Processing Order</p>
              <b className="text-2xl">0</b>
            </div>
          </div>
          <div
            style={{ borderBottomColor: "rgb(255, 141, 41)" }}
            className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-pink-500 p-2 flex items-center justify-between bg-slate-50"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-42.svg" alt="" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm"> Completed Order</p>
              <b className="text-2xl">0</b>
            </div>
          </div>
          <div
            style={{ borderBottomColor: "rgb(255, 141, 41);" }}
            className=" flex flex-[18] min-w-[220px] h-[120px] border border-[#CFCBCB] rounded-lg border-b-4 border-b-purple-500 p-2 flex items-center justify-between bg-slate-50"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-md">
              <img src="/svgs/svgexport-37.svg" alt="" className="w-8 h-8" />
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
          <div className="flex flex-row items-center justify-between w-full">
            <p className="font-bold text-lg">Recent Orders</p>

            <div className="flex flex-1 max-w-[250px] h-[40px] rounded-[4px] gap-2 border-[1px] border-[gainsboro] p-3 items-center justify-center">
              <div className="min-w-[25px] h-[25px] bg-[url(/svgs/svgexport-1.svg)] bg-no-repeat bg-center bg-contain" />
              <input
                type="text"
                placeholder="Search by name"
                onInput={(e) => setROI(e.target.value)}
                className="flex flex-1 outline-none border-none text-[16px]"
              />
            </div>
          </div>
        </div>
        <PaginatedTable
          tableHead={[
            "Tracking Number",
            "Customer",
            "Products",
            "Order Date",
            "Total",
            "Status",
            "Actions",
          ]}
          tableData={[
            { customer_name: "john doe", status: "shipped" },
            { customer_name: "micheal abel", status: "shipped" },
            { customer_name: "newton", status: "pending" },
            { customer_name: "john doe", status: "pending" },
            { customer_name: "john doe", status: "shipped" },
            { customer_name: "mary", status: "shipped" },
          ]}
          maxItems={4}
          searchText={recentOrderInput}
        />
      </div>
      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="font-bold text-lg">Sale History</p>

            
          </div>
        </div>
        <BarchartComp />
        </div>

        <div className="w-[full] flex xl:flex-row xl:justify-between flex-col gap-4 ">
        <div className="bg-white rounded-[0.5rem] p-4 flex flex-col flex-[45] min-h-[500px] items-center">
        <div className="flex flex-row items-center gap-[10px] w-full">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="font-bold text-lg">Top 10 Most Rated Products</p>
          </div>
        </div>

        <DashSlider />
        </div>

        <div className="bg-white rounded-[0.5rem] p-4 flex flex-col flex-[45] min-h-[500px]">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="font-bold text-lg">Popular Products</p>

            
          </div>
        </div>
        
        <div className="w-full flex flex-1 mt-4 overflow-y-scroll max-h-[500px]  flex-col gap-[20px] slick-scrollbar">
        {
          ["", "", "", "", "", "", "", "", "", ""]
          .map((product, index) => {
            return (
          <div className="w-full h-[50px] flex flex-row justify-between">
            <div className="flex flex-row gap-4">
            <div className="w-[50px] h-[50px]
            bg-[url(/BrusselsSprouts.webp)]
            bg-no-repeat bg-center bg-contain
             border-[0.8px] border-[gainsboro] rounded-[10px]" />
            <div>
              <b>BrusselsSprouts</b>
              <p>Grocery</p>
            </div>
            </div>

            <b>$3.00</b>
          </div>
            )
          })
        }
        </div>
        </div>

        </div>

      <div className="bg-white rounded-[0.5rem] p-4 flex flex-col ">
        <div className="flex flex-row items-center gap-[10px]">
          <div className="w-[3.5px] h-[30px] bg-[teal] ml-[-12px] rounded-r-[8px]"></div>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="font-bold text-lg">Low stock products</p>

            <div className="flex flex-1 max-w-[250px] h-[40px] rounded-[4px] gap-2 border-[1px] border-[gainsboro] p-3 items-center justify-center">
              <div className="min-w-[25px] h-[25px] bg-[url(/svgs/svgexport-1.svg)] bg-no-repeat bg-center bg-contain" />
              <input
                type="text"
                placeholder="Search by name"
                onInput={(e) => setLSI(e.target.value)}
                className="flex flex-1 outline-none border-none text-[16px]"
              />
            </div>
          </div>
        </div>
        <LowStockPaginatedTable
          tableHead={[
            "ID",
            "Product",
            "SKU",
            "Group",
            "Shop",
            "Price/Unit",
            "Stock Status",
            "Quantity",
          ]}
          tableData={[
            { product_name: "Samusung SoundPal S8 Mini B", status: "shipped" },
            { product_name: "JuBL Charge 5", status: "shipped" },
            { product_name: "carrot", status: "pending" },
            { product_name: "carbage", status: "pending" },
            { product_name: "beer", status: "shipped" },
            { product_name: "rice", status: "shipped" },
          ]}
          maxItems={4}
          searchText={LowStockInput}
        />
      </div>

      <div>Low Stock</div>
    </div>
  );
};

export default Dashboard;
